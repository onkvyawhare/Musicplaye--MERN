import  { createContext, useState, useContext } from 'react';
import axios from 'axios';
const REACT_APP_API_URL = 'https://musicplayer-mern.onrender.com';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signupUser = async (name, email, password,confirmPassword) => {
    setLoading(true);
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/signup`, {
        name,
        email,
        password,
        confirmPassword
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signupUser, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;