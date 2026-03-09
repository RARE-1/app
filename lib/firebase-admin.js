import 'server-only'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const asTrimmedString = (value) => (typeof value === 'string' ? value.trim() : '')

const normalizePrivateKey = (value) => {
  const raw = asTrimmedString(value)
  if (!raw) {
    return ''
  }

  const hasDoubleQuotes = raw.startsWith('"') && raw.endsWith('"')
  const hasSingleQuotes = raw.startsWith("'") && raw.endsWith("'")
  const unwrapped = hasDoubleQuotes || hasSingleQuotes ? raw.slice(1, -1) : raw

  return unwrapped.replace(/\\n/g, '\n')
}

const getFirebaseAdminConfig = () => {
  const projectId = asTrimmedString(
    process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  )
  const clientEmail = asTrimmedString(process.env.FIREBASE_ADMIN_CLIENT_EMAIL)
  const privateKey = normalizePrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY)

  if (!projectId || !clientEmail || !privateKey) {
    return null
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  }
}

export const isFirebaseAdminConfigured = () => Boolean(getFirebaseAdminConfig())

export const getFirestoreAdmin = () => {
  const config = getFirebaseAdminConfig()
  if (!config) {
    return null
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert(config),
    })
  }

  return getFirestore()
}
