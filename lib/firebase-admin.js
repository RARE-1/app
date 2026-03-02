import 'server-only'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const getFirebaseAdminConfig = () => {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKeyRaw = process.env.FIREBASE_ADMIN_PRIVATE_KEY

  if (!projectId || !clientEmail || !privateKeyRaw) {
    return null
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKeyRaw.replace(/\\n/g, '\n'),
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
