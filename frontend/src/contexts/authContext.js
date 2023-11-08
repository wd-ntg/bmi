import { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import {
  makeUnauthenticatedGETRequestToken,
  makeUnauthenticatedPOSTRequestToken,
} from "../utils/serverHelpers";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const response = await makeUnauthenticatedGETRequestToken(
            "/auth/info",
          );
          setCurrentUser(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      };
      getUser()
    } else {
      const getCurrentUser = async () => {
        try {
          const response = await makeUnauthenticatedGETRequestToken(
            "/auth/info"
          );
          setCurrentUser(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      };
      getCurrentUser();
    }
  }, [user || currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
