import { useState } from 'react'

const useModal = () => {
  // Estado local para el estado del modal
  const [isOpen, setIsOpen] = useState(false)

  // Funciones para abrir y cerrar el modal
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { isOpen, openModal, closeModal }
}

export default useModal
