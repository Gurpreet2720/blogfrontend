/* eslint-disable import/no-cycle */
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  const [currentUser, setUser] = useState(JSON.parse(localStorage.getItem('user') || null));
  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs);
    setUser(res.data);
  };
  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
  };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);
  const v = useMemo(() => ({ currentUser, login, logout }), [currentUser]);
  return (
    <AuthContext.Provider value={v}>{children}</AuthContext.Provider>
  );
}
