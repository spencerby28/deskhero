'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

type UserContextType = {
  user: User | null;
  loading: boolean;
  revalidate: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({ 
  user: null, 
  loading: true,
  revalidate: async () => {} 
});

export function UserProvider({ 
  children,
  initialUser 
}: { 
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  const setupAuthListener = useCallback(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', { event, user: session?.user });
      setUser(session?.user ?? null);
    });
    subscriptionRef.current = subscription;
    return subscription;
  }, []);

  const revalidate = useCallback(async () => {
    console.log('Revalidating user data...');
    // Temporarily remove auth listener
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      const { data: { user: freshUser } } = await supabase.auth.getUser();
      console.log('Fresh user data:', freshUser);
      setUser(freshUser);
    } catch (error) {
      console.error('Failed to revalidate user:', error);
    } finally {
      // Reinitialize auth listener
      setupAuthListener();
      setLoading(false);
    }
  }, [setupAuthListener]);

  useEffect(() => {
    const subscription = setupAuthListener();
    return () => {
      subscription.unsubscribe();
    }
  }, [setupAuthListener]);

  return (
    <UserContext.Provider value={{ user, loading, revalidate }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    console.error('useUser hook used outside of UserProvider');
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}