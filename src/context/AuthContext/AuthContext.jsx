import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    idToken: "",
    accessToken: "",
    refreshToken: "",
  });

  const fetchToken = async () => {
    const { tokens } =
      await fetchAuthSession();
    const { idToken, accessToken, refreshToken } = tokens;
    setTokens({ idToken, accessToken, refreshToken });
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ tokens }}>{children}</AuthContext.Provider>
  );
};
