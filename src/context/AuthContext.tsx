import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../common-styles/interface';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const USER_STORAGE_KEY = '@gamorite_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
           setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
      } finally {
        setLoading(false);
      }
    };
    loadStoredUser();
  }, []);

  const signIn = async (username: string) => {
    try {
      const newUser: User = {
        uid: Date.now().toString(),
        displayName: username,
        email: '',
        photoURL: null,
      };
      setUser(newUser);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch (error) {
      console.error('Sign in failed', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
