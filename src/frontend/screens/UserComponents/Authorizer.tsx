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
      //set loading will rerender all components it AuthContext wraps
    }, [])

    const setUserToken = (userToken: string, email : string) => {
      const user = {
        token: userToken,
        email: email
      }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      console.log("in set userToken", localStorage.getItem('user'))
    }

    const logout = async () => {
      const token = user.token
      try {
        const res = await fetch('http://localhost:5001/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          body: JSON.stringify({
            'Token' : token
          })
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
    return (
        <AuthContext.Provider value={{ user, setUserToken, logout, userInfo}}>
          {loading ? null : children}
        </AuthContext.Provider>
      )
}