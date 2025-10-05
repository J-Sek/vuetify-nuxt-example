export function truncate(text?: string, limit?: number) {
  const line = (text ?? '').replace(/\n/g, ' ');
  return line.length < (limit ?? 9999)
    ? line
    : line.substring(0, limit) + '...'
}
