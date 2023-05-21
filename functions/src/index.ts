/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as admin from 'firebase-admin';
admin.initializeApp();

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
export * from './users/onCreateUserCustomClaims';
export * from './users/listUsers';
export * from './users/approveUser';
export * from './users/rejectUser';
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
