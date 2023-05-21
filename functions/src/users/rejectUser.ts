import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const rejectUser = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
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
        await admin.auth().deleteUser(user.uid);
        return { message: 'User was deleted successfully' };
      } else {
        throw new functions.https.HttpsError(
          'permission-denied',
          'User is not an admin'
        );
      }
    } catch (error) {
      console.error(error);
      const recError = error as functions.https.HttpsError;
      if (
        recError.code === 'permission-denied' ||
        recError.code === 'not-found'
      ) {
        return recError;
      } else {
        throw new functions.https.HttpsError(
          'internal',
          'Something went wrong'
        );
      }
    }
  });
