import { useContext, useEffect, useState } from 'react'
import { baseUrl } from '../../constantes'
import { UserContext } from '../../Context/UserContext'
import { ModalContext } from '../../Context/ModalContext'
import { ACTIONS, NotasContext } from '../../Context/NotasContext'

export const useNotas = (url) => {
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)
  const { setMensaje } = useContext(ModalContext)
  const { dispatch } = useContext(NotasContext)

  useEffect(() => {
    const fetchData = async () => {
      const url = '/api/notas'
      try {
        setLoading(true)
        const response = await fetch(`${baseUrl}${url}`, {
          headers: {
            authorization: user.token
          }
        })
        const { data, error } = await response.json()
        if (data) {
          dispatch({ type: ACTIONS.ADD_ITEMS, payload: data })
          return
        }
        if (error) {
          setMensaje(error)
          return
        }

        return new Error('Error al obtener las notas')
      } catch (error) {
        setMensaje(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url, setMensaje, user, dispatch])

  const postData = async (newItem) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token
        },
        body: JSON.stringify(newItem)
      })
      const { data, error } = await response.json()
      if (data) {
        dispatch({ type: ACTIONS.UPDATE_ITEM, payload: data })
        setMensaje('Nota creada')
        return true
      }
      if (error) {
        throw new Error(error)
      }
    } catch (error) {
      setMensaje(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const putData = async (updatedItem) => {
    try {
      const response = await fetch(`${baseUrl}${url}/${updatedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token
        },
        body: JSON.stringify(updatedItem)
      })
      const { data, error } = await response.json()
      if (data) {
        dispatch({ type: ACTIONS.UPDATE_ITEM, payload: data })

        const terminada = data.tareas.every((tarea) => tarea.tareaCompletada === true)
        if (terminada) {
          setMensaje(`Tarea completada`)
        } else {
          setMensaje('Nota actualizada')
        }
        return true
      }
      if (error) {
        throw new Error(error)
      }
    } catch (error) {
      setMensaje(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const deleteData = async (id) => {
    try {
      const res = await fetch(`${baseUrl}${url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token
        }
      })
      const { data, error } = await res.json()
      if (data) {
        dispatch({ type: ACTIONS.DELETE_ITEM, payload: id })
        setMensaje('Nota eliminada')
      }
      if (error) {
        throw new Error(error)
      }
    } catch (error) {
      setMensaje(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { postData, putData, deleteData, loading }
}
