export function isPreservedKey(key: string): boolean {
  const len = key.length;
  if (len < 4) return false;
  if (key.slice(0, 2) === '__' && key.slice(len, len - 2) === '__') return true;
  return false;
}
