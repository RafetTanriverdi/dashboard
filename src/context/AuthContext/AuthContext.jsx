import { createContext, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(); // Başlangıç değeri null

  useEffect(() => {
    async function currentSession() {
      await fetchAuthSession()
        .then((session) => {
          const accessToken = session.tokens?.accessToken?.toString() || null;
          setIsAuthenticated(!!accessToken);
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
          setIsAuthenticated(false);
        });
    }
    currentSession();
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children} {/* Oturum durumu kontrol ediliyor */}
    </AuthContext.Provider>
  );
};
