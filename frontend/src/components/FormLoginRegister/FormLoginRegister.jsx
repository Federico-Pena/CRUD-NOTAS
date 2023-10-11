import { useContext, useState } from 'react'
import useForm from '../../Hooks/Formulario/useForm'
import './FormLoginRegister.css'
import { UserContext } from '../../Context/UserContext'
import { baseUrl } from '../../constantes'
import { ModalContext } from '../../Context/ModalContext'
import { Toast } from '../Toast/Toast'

export const FormLoginRegister = () => {
  const { loginUser } = useContext(UserContext)
  const { mensaje, setMensaje } = useContext(ModalContext)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const initialValues = {
    username: '',
    password: ''
  }

  const validationRules = {
    username: {
      required: true,
      message: 'El nombre de usuario es requerido'
    },
    password: {
      required: true,
      message: 'La contraseña es requerida'
    }
  }
  const { values, errors, validateForm, handleChange, resetForm } = useForm(
    initialValues,
    validationRules
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validForm = validateForm()
    if (validForm) {
      setLoading(true)
      try {
        const response = await fetch(`${baseUrl}/api/${isLogin ? 'login' : 'register'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        resetForm()

        const data = await response.json()
        if (isLogin) {
          if (response.ok) {
            resetForm()
            loginUser(data.token)
          } else {
            setMensaje(data.error)
          }
        } else {
          if (response.status === 201) {
            setMensaje(data.message)
          } else {
            setMensaje(data.error)
          }
        }
      } catch (error) {
        setMensaje(error)
      }
      setLoading(false)
    } else {
      return
    }
  }

  return (
    <>
      {mensaje && <Toast mensaje={mensaje} setMensaje={setMensaje} />}
      <dialog className='auth-dialog'>
        <form onSubmit={handleSubmit} className='auth-form'>
          <header>
            <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          </header>
          <main>
            <label className='label-auth-form'>
              Usuario:
              <input
                type='text'
                name='username'
                value={values.username}
                onChange={handleChange}
                className='auth-input'
              />
              {errors.username && <span className='errors'>{errors.username}</span>}
            </label>
            <label className='label-auth-form'>
              Contraseña:
              <input
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                className='auth-input'
              />
              {errors.password && <span className='errors'>{errors.password}</span>}
            </label>
          </main>
          <footer>
            <button type='submit' className='auth-button' disabled={loading}>
              {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
            <span className='spanFooter' onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
            </span>
          </footer>
        </form>
      </dialog>
    </>
  )
}
