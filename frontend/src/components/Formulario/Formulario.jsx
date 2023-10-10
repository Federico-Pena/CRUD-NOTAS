import { useState } from 'react'
import './Formulario.css'
import { postNota } from '../../services/postNota'
import useForm from '../../Hooks/Formulario/useForm'

function Formulario({ agregarNuevaNota }) {
  const [error, setError] = useState('')
  const initialValues = {
    titulo: '',
    contenido: ''
  }
  const validationRules = {
    titulo: {
      required: true,
      message: 'El titulo es requerido'
    },
    contenido: { required: true, message: 'El contenido es requerido' }
  }
  const { values, errors, validateForm, handleChange, resetForm } = useForm(
    initialValues,
    validationRules
  )

  const submitForm = async (e) => {
    e.preventDefault()
    const res = validateForm()
    if (res) {
      const { titulo, contenido } = values
      let nota = {
        titulo: titulo.trim(),
        contenido: contenido.trim()
      }
      try {
        const { data, error } = await postNota(nota)
        if (data) {
          agregarNuevaNota(data)
        } else throw new Error(error)
      } catch (error) {
        setError('Error al guardar nota')
        setTimeout(() => {
          setError('')
        }, 2000)
      }
      resetForm()
    } else {
      return
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
          <label htmlFor='contenido' className='labelForm'>
            Contenido
          </label>
          <textarea
            minLength={2}
            type='text'
            name='contenido'
            className='contenido'
            placeholder='Contenido'
            required
            onChange={handleChange}
            value={values.contenido}
          />
          {errors.contenido && <span className='errors'>{errors.contenido}</span>}
        </section>
      </main>

      <footer className='footerFormulario'>
        <button type='submit'>Enviar</button>
      </footer>
    </form>
  )
}

export default Formulario
