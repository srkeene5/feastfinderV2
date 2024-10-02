import { createContext, useContext, useEffect, useState } from 'react'
import React from 'react'

export const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
    const [user, setUser] = useState<any>(null) //use this to verify logged in
    const [userInfo, setUserInfo] = useState<any>({}) //use this for additional info
    const [loading, setLoading] = useState(true) //use this to ensure this useEffect runs first
    
    // console.log(userInfo)


    useEffect(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user)
      }
      
      setLoading(false) //to prevent redirection too early
      console.log("in Authorizer loading false")
      //set loading will rerender all components it AuthContext wraps
    }, []);

    useEffect(() => {
      const handleStorageChange = () => {
        console.log("Handling storage change")
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    const setUserToken = (userToken: string, email : string) => {
      const user = {
        token: userToken,
        email: email
      }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = async () => {
      const token = user.token
      const authToken = "Bearer " + token
      //console.log("AuthToken: ", authToken)
      try {
        const res = await fetch('http://localhost:5001/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : authToken
          },
          
        });
  
        if (res.ok) {
          const data = await res.json();
          console.log('User logged out:', data);
          // Store token or redirect user
        } else {
          const errorData = await res.json();
          console.error('Error during logout:', errorData);
          
        }
      } catch (error) {
          console.error('Network error:', error);
      }
      setUser(null)
      setUserInfo(null)
      localStorage.removeItem('user');
      //call logout api?

        
    }

    const validateToken = async () => {
      console.log("in validateToken()")
      try {
        const response = await fetch('http://localhost:5001/api/auth/protected', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.msg || 'Server error');
            return false;
        }

          // Parse the response JSON
          const userData = await response.json();
          console.log('User data:', userData);
          if (userData.msg && userData.msg == "Token is not valid") return false;
          return true; //this isn't very safe check lol
      } catch (error) {
          console.error('Fetch error:', error);
          return false;
      }
    }
    return (
        <AuthContext.Provider value={{ user, setUserToken, logout, userInfo, loading, validateToken}}>
          {loading ? null : children}
        </AuthContext.Provider>
      )
}