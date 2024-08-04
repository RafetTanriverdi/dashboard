import { UserProvider } from "./UserContext/UserContext";

const ContextApiProvider = ({ children }) => {
  return (
      <UserProvider>{children}</UserProvider>
  );
};

export default ContextApiProvider;
