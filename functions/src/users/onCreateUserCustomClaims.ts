import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/*
Sets customClaims for users on creation.
Workaround to set first user as Admin:
Set both of these to true before you create your first user and
after creating the admin user, redeploy the function like this again.
*/
export const setCustomClaims = functions
  .region('europe-west1')
  .auth.user()
  .onCreate((user) => {
    return admin
      .auth()
      .setCustomUserClaims(user.uid, { admin: false, approved: false });
  });
