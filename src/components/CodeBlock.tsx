import { useState } from "react";
import type { CodeBlock as CodeBlockType } from "@/content/types";

export function CodeBlock({ block }: { block: CodeBlockType }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore clipboard failure */
    }
  }

  return (
    <div className="code-block">
      <div className="code-header">
        {block.lang && <span className="code-lang">{block.lang.toUpperCase()}</span>}
        {block.title && <span className="code-title">{block.title}</span>}
        <button type="button" className={`code-copy${copied ? " copied" : ""}`} onClick={copy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="code-content">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}
