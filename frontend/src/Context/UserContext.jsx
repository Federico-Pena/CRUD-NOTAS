import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loginUser = (token) => {
    console.log(token)
    setUser({ token })
  }
  const logoutUser = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>
  )
}
