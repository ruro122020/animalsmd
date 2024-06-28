import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

//Custom Hook
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [user, setUser] = useState(null)
  //these are global variables for the cart
  //itemCount is to display the number of items that is on the cart icon
  const [itemCount, setItemCount] = useState(0)


  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)
  const updateUser = (obj) => setUser(obj)

  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, login, logout, user, updateUser, itemCount, setItemCount }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}