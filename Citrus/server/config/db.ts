import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ServiceAccount } from './service-account';

initializeApp({
  credential: cert(ServiceAccount),
});

export const db = getFirestore();
