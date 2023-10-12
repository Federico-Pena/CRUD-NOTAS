import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('token'))
    if (data) {
      setUser(data)
    }
  }, [])

  const loginUser = (data) => {
    setUser(data)
    sessionStorage.setItem('token', JSON.stringify(data))
  }
  const logoutUser = () => {
    setUser(null)
    sessionStorage.removeItem('token')
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>
  )
}
