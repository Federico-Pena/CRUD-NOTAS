import { useContext, useState } from 'react'
import './Formulario.css'
import { postNota } from '../../services/postNota'
import useForm from '../../Hooks/Formulario/useForm'
import { UserContext } from '../../Context/UserContext'
const initialValues = {
  titulo: '',
  tareas: ''
}
const validationRules = {
  titulo: {
    required: true,
    message: 'El titulo es requerido'
  },
  tareas: { required: true, message: 'El contenido es requerido' }
}
function Formulario({ agregarNuevaNota }) {
  const [error, setError] = useState('')
  const { user } = useContext(UserContext)

  const { values, errors, validateForm, handleChange, resetForm } = useForm(
    initialValues,
    validationRules
  )
  const submitForm = async (e) => {
    e.preventDefault()
    const res = validateForm()
    if (res) {
      const { titulo, tareas } = values
      let nota = {
        titulo: titulo.trim(),
        tareas: tareas
          .split('.')
          .map((tarea) => ({ tareaTitulo: tarea.trim(), tareaCompletada: false }))
      }
      try {
        const { data, error } = await postNota(nota, user.token)
        if (data) {
          agregarNuevaNota(data)
          resetForm()
        } else throw new Error(error)
      } catch (error) {
        setError('Error al guardar nota')
        setTimeout(() => {
          setError('')
        }, 2000)
      }
    } else {
      setError('Campos inválidos')
    }
  }
  return (
    <form className='formulario' onSubmit={submitForm}>
      <header className='headerFormulario'>
        <h2>Agrega una nota</h2>
      </header>
      <main className='mainFormulario'>
        {error && <span className='errors'>{error}</span>}

        <section className='sectionFormulario'>
          <label htmlFor='titulo' className='labelForm'>
            Titulo
          </label>
          <input
            minLength={2}
            type='text'
            name='titulo'
            className='titulo'
            placeholder='Titulo'
            required
            onChange={handleChange}
            value={values.titulo}
          />
          {errors.titulo && <span className='errors'>{errors.titulo}</span>}
        </section>
        <section className='sectionFormulario'>
          <label htmlFor='tareas' className='labelForm'>
            Tareas
          </label>
          <input
            type='text'
            name='tareas'
            className='tareas'
            placeholder='Sacar el perro. Comprar fruta. etc.'
            onChange={handleChange}
            value={values.tareas}
          />
          <samp>* Agrega tareas nuevas separando con un .</samp>
          {values.tareas.length > 0 && (
            <ul className='tareasList'>
              {values.tareas
                .split('. ')
                .map((tarea, index) => tarea.trim() && <li key={index}>{tarea.trim()}</li>)}
            </ul>
          )}
        </section>
      </main>

      <footer className='footerFormulario'>
        <button type='submit'>Enviar</button>
      </footer>
    </form>
  )
}

export default Formulario
