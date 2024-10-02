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
      if ((location.pathname !== '/account/signup') && (!user ) ) { //don't redirect signup
        navigate('/account/login'); // Redirect to login if user is not logged in or token expired
      }
      else {
        fetchValidation()
      }
      
    }
  }, [user, loading, navigate]); // Dependencies
};

export default useRequireAuth;
