import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { HandleUserClaimsResponse } from '../../../shared/types/types';
import { logger } from 'firebase-functions';

export const setApprovedClaim = functions
  .region('europe-west1')
  .https.onCall(async (data, context): Promise<HandleUserClaimsResponse> => {
    const { email } = data;

    try {
      // Verify the request is authenticated and the user is an admin
      if (!context.auth || !context.auth.token.admin) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'User is not an admin'
        );
      }

      // Fetch the user by email
      const user = await admin.auth().getUserByEmail(email);

      // Check if the user exists
      if (user) {
        // Set the approved claim for the user
        await admin.auth().setCustomUserClaims(user.uid, { approved: true });
        return { message: 'Approved claim set successfully' };
      } else {
        throw new functions.https.HttpsError('not-found', 'User was not found');
      }
    } catch (error) {
      logger.error(error);
      const recError = error as functions.https.HttpsError;
      if (
        recError.code === 'permission-denied' ||
        recError.code === 'not-found'
      ) {
        throw recError;
      } else {
        throw new functions.https.HttpsError(
          'internal',
          'Something went wrong'
        );
      }
    }
  });
