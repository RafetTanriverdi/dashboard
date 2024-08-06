import { AuthProvider } from "./AuthContext/AuthContext";
import { UserProvider } from "./UserContext/UserContext";

const ContextApiProvider = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};

export default ContextApiProvider;
