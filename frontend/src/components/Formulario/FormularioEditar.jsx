import { useState } from 'react'
import './Formulario.css'
import { putNota } from '../../services/putNota'
import useForm from '../../Hooks/Formulario/useForm'

function FormularioEditar({ nota, actualizarNotas }) {
  const [error, setError] = useState('')
  const initialValues = {
    titulo: nota.titulo,
    contenido: nota.contenido
  }
  const validationRules = {
    titulo: {
      required: true,
      message: 'El titulo es requerido'
    },
    contenido: { required: true, message: 'El contenido es requerido' }
  }
  const { values, errors, validateForm, handleChange } = useForm(initialValues, validationRules)
  const submitForm = async (e) => {
    e.preventDefault()
    const res = validateForm()
    if (res) {
      const { _id } = nota
      const { titulo, contenido } = values
      let notaNueva = {
        titulo: titulo.trim(),
        contenido: contenido.trim()
      }
      try {
        const { data, error } = await putNota(notaNueva, _id)
        if (data) {
          actualizarNotas(data)
          e.target.reset()
        } else throw new Error(error)
      } catch (error) {
        setError('Error al guardar nota')
        setTimeout(() => {
          setError('')
        }, 2000)
      }
    } else {
      return
    }
  }

  return (
    <form className='formulario' onSubmit={submitForm}>
      <header className='headerFormulario'>
        <h2>Editar nota</h2>
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
            defaultValue={values.titulo}
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
            defaultValue={values.contenido}
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

export default FormularioEditar
