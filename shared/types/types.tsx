import { User as FirebaseUser } from 'firebase/auth';

export interface UserInfo {
  firebaseUser: FirebaseUser | null;
  isAdmin: boolean;
  isApproved: boolean;
}

export interface AppUser {
  id: string;
  displayname: string;
  email: string;
  isAdmin: boolean;
  isApproved: boolean;
}

export interface HandleUserClaimsResponse {
  code?: string;
  message: string;
}

export interface FunctionsError {
  code?: string;
  message: string;
}

export interface ProfileUpdateObject {
  displayName: string;
  photoURL: string;
}
