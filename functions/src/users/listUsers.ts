import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AppUser } from '../../../shared/types/types';

export const listusers = functions
  .region('europe-west1')
  .https.onCall(async (data, context): Promise<AppUser[]> => {
    try {
      // Check if the user making the request is an admin
      if (!context.auth || !context.auth.token.admin) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Admin access required.'
        );
      }

      // Fetch all users from Firebase Auth
      const listUsersResult = await admin.auth().listUsers();
      const users = listUsersResult.users.map((userRecord) => {
        const customClaims = userRecord.customClaims || {};
        return {
          id: userRecord.uid,
          displayname: userRecord.displayName,
          email: userRecord.email,
          isAdmin: customClaims.admin || false,
          isApproved: customClaims.approved || false,
          // Add other properties as needed
        } as AppUser;
      });

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new functions.https.HttpsError('internal', 'Error fetching users');
    }
  });
