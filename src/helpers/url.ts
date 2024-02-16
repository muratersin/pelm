export const isSecureUrl = (str: string = '') => {
  let url

  try {
    url = new URL(str)
  } catch (_) {
    return false
  }

  return url.protocol === 'https:'
}
