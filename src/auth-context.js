import React, { createContext, useContext, useState } from 'react';

// This creates an authentication context using the useContext() hook.  This allows us to maintain
// the user's authorization across the app without having to pass it around as props everywhere

// The backend app requires a username and valid JWT token for all its endpoints.

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// We are initially setting the token and user name to null values
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userName: null,
  });

  // This is the login function that will set the token and user name to whatever gets passed to this function by the login form
  const login = (token, userName) => {
    setAuthState({ token, userName });
  };

  // This is the logout function.  If the user logs out, this function will be called to set the token and user name back to null
  const logout = () => {
    setAuthState({ token: null, userName: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};