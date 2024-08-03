import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
useEffect(() => {
  const fetchUserData = async () => {
    try {
     const attributes=await fetchUserAttributes();
     console.log("attributes",attributes);
     setUserData(attributes);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };
  fetchUserData();

},[])

  return (
    <UserContext.Provider value={{ setUserData, userData }}>
      {children}
    </UserContext.Provider>
  );
};
