import { useState, useContext, createContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();


// Provide Auth Context to components
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
        }
    }, []);

    const signup = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        setIsLoggedIn(true);
    }

    const login = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
          {children}
        </AuthContext.Provider>
      );
}

// Hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
  }