import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase-config";

export const login = async (
  loginEmail: string,
  loginPassword: string
): Promise<UserCredential | undefined> => {
  return await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
};

export const logout = async () => {
  await signOut(auth);
};

export const registerAccount = async () => {};

export const loginAsGuest = async () => {};
