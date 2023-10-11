import { createContext, useState } from 'react'

export const ModalContext = createContext({})
export const MensajeProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  return (
    <ModalContext.Provider value={{ mensaje, setMensaje, error, setError }}>
      {children}
    </ModalContext.Provider>
  )
}
