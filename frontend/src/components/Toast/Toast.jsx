import { useEffect, useState } from 'react'
import './Toast.css'

export const Toast = ({ mensaje, setMensaje }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [secondsVisible, setSecondsVisible] = useState(0)

  useEffect(() => {
    if (mensaje) {
      setIsVisible(true)
      setSecondsVisible(0)
    }
  }, [mensaje])

  useEffect(() => {
    const intervalId =
      (isVisible || secondsVisible) &&
      setInterval(() => {
        setSecondsVisible((prevSeconds) => prevSeconds + 0.05)
      }, 50)

    if (secondsVisible >= 3) {
      setIsVisible(false)
    }
    if (secondsVisible > 3.5) {
      setSecondsVisible(0)
      clearInterval(intervalId)
      setMensaje()
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [secondsVisible, isVisible, setMensaje])

  const progressWidth = 100 - (secondsVisible / 2.7) * 100

  return (
    <div className={`${isVisible ? 'toast-show' : 'toast-hide'}`}>
      <div className={`my-toast `}>
        <div className='toastContent'>
          {mensaje && (
            <>
              <p className='toastText'>{mensaje}</p>
              <div className='progress-bar' style={{ width: `${progressWidth}%` }}></div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
