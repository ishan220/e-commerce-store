import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { isAuthenticated,isLoading,loginWithRedirect, logout, user } = useAuth0()
   
  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    setMyUser(user);
    console.log("loginwithredirect",loginWithRedirect);
    console.log("logout",logout);
    console.log("user", user);
    console.log("isAuthen", isAuthenticated);
    console.log("isLoading", isLoading);
    
  }, [user]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser,isAuthenticated,user }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
