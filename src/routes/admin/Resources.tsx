import { useEffect, useState, type FormEvent } from "react";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/auth/AuthProvider";
import { storage } from "@/lib/firebase";
import { createResource, deleteResource, fetchResources, type Resource } from "@/data/admin";
import { manifest } from "@/content/loader";

function fmtBytes(b?: number) {
  if (!b) return "—";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${Math.round(b / 1024)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

function fmtDate(ms: number | null) {
  if (!ms) return "—";
  return new Date(ms).toLocaleDateString();
}

export function AdminResources() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<Resource["type"]>("pdf");
  const [linkUrl, setLinkUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [moduleId, setModuleId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const r = await fetchResources();
      setResources(r);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load resources");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setTitle("");
    setDescription("");
    setLinkUrl("");
    setFile(null);
    setModuleId("");
    setUploadPct(null);
    setFormError(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!user) return setFormError("Sign in first.");
    if (!title.trim()) return setFormError("Title is required.");
    if (type === "link") {
      if (!linkUrl.trim() || !/^https?:\/\//.test(linkUrl)) return setFormError("Provide a valid http(s) URL.");
    } else {
      if (!file) return setFormError(`Select a ${type} file.`);
    }
    setSubmitting(true);
    try {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      let finalUrl = linkUrl.trim();
      let storagePath: string | undefined;
      let sizeBytes: number | undefined;
      if (type !== "link" && file) {
        storagePath = `resources/${id}/${file.name}`;
        const task = uploadBytesResumable(storageRef(storage, storagePath), file);
        finalUrl = await new Promise<string>((resolve, reject) => {
          task.on(
            "state_changed",
            (s) => setUploadPct(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
            (err) => reject(err),
            async () => resolve(await getDownloadURL(task.snapshot.ref)),
          );
        });
        sizeBytes = file.size;
      }
      await createResource(user.uid, {
        title: title.trim(),
        description: description.trim(),
        type,
        url: finalUrl,
        storagePath,
        sizeBytes,
        moduleId: moduleId ? Number(moduleId) : undefined,
      });
      reset();
      await refresh();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(r: Resource) {
    if (!window.confirm(`Delete "${r.title}"? This can't be undone.`)) return;
    try {
      await deleteResource(r.id);
      await refresh();
    } catch (e) {
      window.alert(`Couldn't delete: ${e instanceof Error ? e.message : "unknown error"}`);
    }
  }

  return (
    <AdminShell title="Resources" subtitle="Files and links available to learners.">
      <form className="resource-form" onSubmit={onSubmit}>
        <div className="row">
          <label htmlFor="r-title">Title</label>
          <input id="r-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="row">
          <label htmlFor="r-desc">Description (optional)</label>
          <textarea id="r-desc" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="row">
            <label htmlFor="r-type">Type</label>
            <select id="r-type" value={type} onChange={(e) => setType(e.target.value as Resource["type"])}>
              <option value="pdf">PDF</option>
              <option value="slides">Slide deck (.pptx)</option>
              <option value="video">Video file</option>
              <option value="link">External link / URL</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="r-mod">Module (optional)</label>
            <select id="r-mod" value={moduleId} onChange={(e) => setModuleId(e.target.value)}>
              <option value="">— all learners —</option>
              {manifest.map((m) => (
                <option key={m.id} value={m.id}>
                  Module {m.id}: {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {type === "link" ? (
          <div className="row">
            <label htmlFor="r-url">URL</label>
            <input
              id="r-url"
              type="url"
              placeholder="https://…"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>
        ) : (
          <div className="row">
            <label htmlFor="r-file">File</label>
            <input
              id="r-file"
              type="file"
              accept={
                type === "pdf"
                  ? "application/pdf"
                  : type === "slides"
                    ? ".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    : "video/*"
              }
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <small style={{ color: "var(--text-faint)" }}>Max 200 MB per file.</small>
          </div>
        )}
        {formError && (
          <div role="alert" style={{ color: "var(--error)", fontSize: 13 }}>
            {formError}
          </div>
        )}
        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting
              ? uploadPct !== null
                ? `Uploading… ${uploadPct}%`
                : "Saving…"
              : "Add resource"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={reset} disabled={submitting}>
            Reset
          </button>
        </div>
      </form>

      <h2 style={{ fontSize: 16, marginBottom: 10 }}>
        {resources.length} resource{resources.length === 1 ? "" : "s"}
      </h2>

      {loading && <div className="empty-state">Loading…</div>}
      {error && (
        <div role="alert" className="empty-state" style={{ color: "var(--error)" }}>
          {error}
        </div>
      )}
      {!loading && !error && resources.length === 0 && (
        <div className="empty-state">No resources yet. Add your first using the form above.</div>
      )}
      <ul className="resource-list">
        {resources.map((r) => (
          <li key={r.id} className="resource-item">
            <div className="meta">
              <h4>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.title}
                </a>
              </h4>
              {r.description && (
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "2px 0" }}>{r.description}</p>
              )}
              <div className="meta-row">
                <span style={{ textTransform: "uppercase", fontWeight: 700 }}>{r.type}</span>
                {r.moduleId && <span>Module {r.moduleId}</span>}
                {r.sizeBytes && <span>{fmtBytes(r.sizeBytes)}</span>}
                <span>Added {fmtDate(r.uploadedAt)}</span>
              </div>
            </div>
            <div className="actions">
              <button type="button" className="btn-danger" onClick={() => onDelete(r)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
