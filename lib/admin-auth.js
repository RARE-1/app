import 'server-only'
import { createHash } from 'crypto'

export const ADMIN_COOKIE_NAME = 'bti_admin_session'

export const getAdminSecret = () => process.env.ADMIN_SECRET || ''

const hash = (value) => createHash('sha256').update(value).digest('hex')

export const getSessionToken = () => {
  const secret = getAdminSecret()
  if (!secret) {
    return ''
  }
  return hash(secret)
}

export const isAdminRequest = (request) => {
  const sessionToken = getSessionToken()
  if (!sessionToken) {
    return false
  }
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === sessionToken
}
