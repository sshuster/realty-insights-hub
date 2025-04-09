
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

// Mock users for frontend testing
const MOCK_USERS = [
  { id: 1, username: 'muser', password: 'muser', role: 'user' },
  { id: 2, username: 'mvc', password: 'mvc', role: 'admin' }
];

// User interface
export interface User {
  id: number;
  username: string;
  role: string;
}

// Authentication context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string, confirmPassword: string) => Promise<void>;
  isAdmin: boolean;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  isAdmin: false
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = user?.role === 'admin';

  // Initialize auth state
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // First try with mock users for testing
      const mockUser = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (mockUser) {
        const userObj = {
          id: mockUser.id,
          username: mockUser.username,
          role: mockUser.role,
        };
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        toast.success(`Welcome back, ${userObj.username}!`);
        return;
      }

      // If not a mock user, try with backend API
      // This is where we would add the actual API call
      // For now we'll throw an error
      throw new Error('Invalid credentials');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Successfully logged out');
  };

  // Register function
  const register = async (username: string, password: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);

    try {
      // Validation
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists in mock data
      if (MOCK_USERS.some((u) => u.username === username)) {
        throw new Error('Username already exists');
      }

      // In a real app, this would be an API call to register the user
      // For now, we'll just simulate a successful registration
      toast.success('Registration successful! Please log in.');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
