import { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const logout = (navigate) => {
    setUser(null);
    // Navigate to login page
    if (navigate) {
      navigate("/Connection");
    }
  };

  const contextValue = useMemo(() => {
    return { user, updateUser, logout };
  }, [user, updateUser]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
