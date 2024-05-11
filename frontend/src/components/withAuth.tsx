'use client'
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths'; 


interface AuthState {
  isAuthenticated: boolean;
}

interface WithAuthProps {
}

const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const isAuthenticated = useAppSelector((state: { auth: AuthState }) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
      router.push(paths.auth.signIn); 
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

