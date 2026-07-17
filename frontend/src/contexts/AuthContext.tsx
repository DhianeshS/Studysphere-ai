import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    // Automatically log in the user with a mock user object
    const mockUser = {
      id: 'mock-user-123',
      email: 'student@example.com',
      user_metadata: { full_name: 'Test Student' }
    };
    
    const mockSession = {
      access_token: 'mock-token',
      user: mockUser
    };
    
    const mockProfile = {
      id: 'mock-user-123',
      full_name: 'Test Student',
      role: 'student',
      avatar_url: null
    };

    setTimeout(() => {
      setSession(mockSession);
      setUser(mockUser);
      setUserProfile(mockProfile);
      setLoading(false);
    }, 500); // Small delay to simulate loading
  }, []);

  const signOut = async () => {
    // In this mock setup, we don't really sign out, or we could just set user to null
    setUser(null);
    setSession(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
