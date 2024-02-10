export const formatDate = (ts: number): string => {
  const date = new Date(ts)

  return date.toLocaleDateString()
}
