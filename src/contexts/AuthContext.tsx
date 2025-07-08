import React, { createContext, useContext, useState, useEffect } from 'react';
import { countries } from '../utils/countries';

interface User {
  id: string;
  email: string;
  name: string;
  country: string;
  currency: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Try to detect country from browser locale
    const browserLocale = navigator.language || 'en-US';
    const countryCode = browserLocale.split('-')[1] || 'US';
    const country = countries.find(c => c.code === countryCode) || countries.find(c => c.code === 'US')!;
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      country: country.code,
      currency: country.currency,
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Try to detect country from browser locale
    const browserLocale = navigator.language || 'en-US';
    const countryCode = browserLocale.split('-')[1] || 'US';
    const country = countries.find(c => c.code === countryCode) || countries.find(c => c.code === 'US')!;
    
    const mockUser: User = {
      id: '1',
      email,
      name,
      country: country.code,
      currency: country.currency,
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};