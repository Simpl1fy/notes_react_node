import { useState, useContext, createContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();


// Provide Auth Context to components
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [localToken, setLocalToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
            setLocalToken(token);
        }
    }, []);

    const signup = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        setIsLoggedIn(true);
        setLocalToken(jwtToken);
    }

    const login = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        setIsLoggedIn(true);
        setLocalToken(jwtToken);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, signup, localToken }}>
          {children}
        </AuthContext.Provider>
      );
}

// Hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
  }