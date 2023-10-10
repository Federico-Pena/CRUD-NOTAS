import { useEffect, useState } from 'react'

/*
  Custom Hook: useNotification

  Este hook proporciona funciones para mostrar y cerrar notificaciones en el navegador.
  Maneja las diferencias entre dispositivos y solicita permisos al usuario si es necesario.

  Uso:
    const { showNotification, closeNotification, requestPermission } = useNotification();

    // Solicitar permisos al usuario
    requestPermission();

    // Mostrar notificación
    showNotification('¡Hola, mundo!', { icon: 'path/to/icon.png' });

    // Cerrar notificación actual
    closeNotification();
*/
const useNotification = () => {
  const [notification, setNotification] = useState(null)

  // Solicitar permisos de notificación al usuario
  const requestPermission = () => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          console.log('Permiso de notificación:', permission)
        })
      }
    }
  }
  useEffect(() => {
    requestPermission()
  }, [])
  // Mostrar notificación
  const showNotification = (message, options) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const notification = new Notification(message, options)
        setNotification(notification)
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            const notification = new Notification(message, options)
            setNotification(notification)
          }
        })
      }
    }
  }

  // Cerrar notificación actual
  const closeNotification = () => {
    if (notification) {
      notification.close()
      setNotification(null)
    }
  }

  return { showNotification, closeNotification, requestPermission }
}

export default useNotification
