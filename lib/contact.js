export const normalizePhoneNumber = (value) => {
  if (!value) {
    return ''
  }

  return String(value).replace(/\D/g, '')
}
