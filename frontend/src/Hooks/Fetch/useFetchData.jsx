import { useState, useEffect, useContext } from 'react'
import { baseUrl } from '../../constantes'
import { UserContext } from '../../Context/UserContext'
import { ModalContext } from '../../Context/ModalContext'

const useFetchData = (url, opciones) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setloading] = useState(false)
  const { user } = useContext(UserContext)
  const { mensaje, setMensaje } = useContext(ModalContext)

  useEffect(() => {
    const options = {
      ...opciones,
      headers: {
        authorization: user.token
      }
    }
    const fetchData = async () => {
      setloading(true)
      try {
        if (!url) {
          throw new Error('URL no definida')
        }
        const response = await fetch(`${baseUrl}${url}`, options)
        const res = await response.json()
        console.log(res)
        if (response.ok) {
          setData(res.data)
        } else {
          setError(res.error)
          setMensaje(res.error)
        }
      } catch (err) {
        setError('Ocurrió un error')
        setMensaje('Ocurrió un error')
      }
      setloading(false)
    }

    fetchData()
  }, [url, user, opciones, setMensaje])

  return { data, error, loading }
}

export default useFetchData
