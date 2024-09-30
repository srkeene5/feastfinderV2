// useRequireAuth.ts
import { useEffect } from 'react';
import { useAuth } from './Authorizer.tsx'; 
import { useNavigate, useLocation } from 'react-router-dom';

const useRequireAuth = () => {

  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user && location.pathname !== '/account/signup') { //don't redirect signup
        navigate('/account/login'); // Redirect to login if user is not logged in
      }
    }
  }, [user, loading, navigate]); // Dependencies
};

export default useRequireAuth;
