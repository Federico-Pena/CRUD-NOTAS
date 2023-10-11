import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)

  const loginUser = (token) => {
    setUser({ token })
  }
  const logoutUser = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>
  )
}
