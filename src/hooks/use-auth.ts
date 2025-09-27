
"use client";

import { useContext, createContext } from "react";
import type { User } from "firebase/auth";

/**
 * Defines the shape of the authentication context.
 * @typedef {object} AuthContextType
 * @property {User | null} user - The current authenticated Firebase user object, or null if not authenticated.
 * @property {boolean} loading - A flag indicating if the authentication state is currently being loaded.
 * @property {boolean} authReady - A flag that becomes true once the initial authentication check is complete.
 * @property {boolean} isAdmin - A flag indicating if the current user has administrative privileges.
 */
type AuthContextType = {
  user: User | null;
  loading: boolean;
  authReady: boolean; // Add this flag
  isAdmin: boolean;
};

/**
 * The React context for providing authentication state to the application.
 * Components can consume this context to access user information and auth status.
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authReady: false,
  isAdmin: false,
});

/**
 * A custom hook for consuming the authentication context.
 * It provides a convenient way to access the user, loading state, and admin status.
 *
 * @returns {AuthContextType} The current authentication context value.
 * @example
 * const { user, loading, isAdmin } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);
