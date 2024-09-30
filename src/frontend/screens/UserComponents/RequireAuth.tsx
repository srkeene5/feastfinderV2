// useRequireAuth.ts
import { useEffect } from 'react';
import { useAuth } from './Authorizer.tsx'; 
import { useNavigate, useLocation } from 'react-router-dom';

const useRequireAuth = () => {

  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("in useRequireAuth", loading, user)
    if (!loading) {
      if (!user && location.pathname !== '/account/signup') { //don't redirect signup
        navigate('/account/login'); // Redirect to login if user is not logged in
      }
      else {
        //Do a check on the current user's token with API. if it fails, also navigate to login
      }
    }
  }, [user, loading, navigate]); // Dependencies
};

export default useRequireAuth;
