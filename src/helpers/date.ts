export const formatDate = (ts: number, page?: string): string => {
  const date = new Date(ts)

  if (page === 'detail') {
    const splittedDate = date.toUTCString().split(' ')
    return `${splittedDate[2]} ${splittedDate[3]}`
  }

  return date.toLocaleDateString()
}
