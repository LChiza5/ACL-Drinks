import { prisma } from "./prisma";

// Returns DB value if set, else the fallback (env var or hardcoded default)
export async function getSetting(key: string, fallback: string): Promise<string> {
  try {
    const s = await prisma.setting.findUnique({ where: { key } });
    return s?.value ?? fallback;
  } catch {
    return fallback;
  }
}

// Batch fetch — returns a map of key -> value (with fallbacks applied)
export async function getSettings(defaults: Record<string, string>): Promise<Record<string, string>> {
  try {
    const rows = await prisma.setting.findMany({ where: { key: { in: Object.keys(defaults) } } });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return Object.fromEntries(Object.entries(defaults).map(([k, v]) => [k, map[k] ?? v]));
  } catch {
    return defaults;
  }
}
