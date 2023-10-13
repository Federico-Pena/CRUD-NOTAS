import { createContext, useContext, useEffect, useState } from 'react'
import { baseUrl } from '../constantes'
import { ModalContext } from './ModalContext'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const { setMensaje } = useContext(ModalContext)
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
  const deleteUser = async () => {
    const options = {
      method: 'POST',
      headers: {
        authorization: user.token
      }
    }
    const res = await fetch(`${baseUrl}/api/delete/${user.username}`, options)
    const data = await res.json()
    console.log(data)
    if (data.user) {
      logoutUser()
    }
    if (data.error) {
      setMensaje(data.error)
    }
  }
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}
