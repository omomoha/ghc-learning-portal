import type { ManifestEntry, Module } from "./types";
import manifestJson from "./manifest.json";

export const manifest = manifestJson as ManifestEntry[];

const cache = new Map<number, Module>();

/** Lazy-load one module's JSON. Cached in memory after first load. */
export async function loadModule(id: number): Promise<Module | null> {
  const cached = cache.get(id);
  if (cached) return cached;
  try {
    const data = (await import(`./modules/${id}.json`)) as { default: Module };
    cache.set(id, data.default);
    return data.default;
  } catch {
    return null;
  }
}
