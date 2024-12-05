// useRequireAuth.ts
import { useEffect } from 'react';
import { useAuth } from './Authorizer.tsx'; 
import { useNavigate, useLocation } from 'react-router-dom';

const useRequireAuth = () => {

  const { user, loading, validateToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValidation = async () => {
      //console.log('here')
      const check = await validateToken();
      //console.log('!check', !check)
      if (!check) {
        navigate('/account/login')
      }
    }
    //console.log("in useRequireAuth", loading, user)
    if (!loading) {
      if (location.pathname !== '/account/signup') { //don't redirect signup
        if (!user) {
          navigate('/account/login');
        }
        else {
          fetchValidation();// Redirect to login if user is not logged in or token expired
        }
         
      }
    }
  }, [user, loading, navigate, location.pathname, validateToken]); // Dependencies
};

export default useRequireAuth;
