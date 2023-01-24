export function stringHash(str: string): number {
  let hash = 5381
  ;[...str].forEach((c) => (hash = (hash * 33) ^ c.charCodeAt(0)))
  return hash >>> 0
}
