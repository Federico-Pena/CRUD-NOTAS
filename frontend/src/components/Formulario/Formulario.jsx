import { useContext } from 'react'
import './Formulario.css'
import useForm from '../../Hooks/Formulario/useForm'
import { ModalContext } from '../../Context/ModalContext'
import { useNotas } from '../../Hooks/Notas/useNotas'
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
function Formulario({ setForm }) {
  const { setMensaje } = useContext(ModalContext)
  const { values, errors, validateForm, handleChange, resetForm } = useForm(
    initialValues,
    validationRules
  )
  const url = '/api/notas'
  const { postData } = useNotas(url)
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
        const res = await postData(nota)
        if (res) {
          setForm()
          resetForm()
        }
      } catch (error) {
        setMensaje('Error al guardar nota')
      }
    } else {
      setMensaje('Campos inválidos')
    }
  }
  return (
    <form className='formulario' onSubmit={submitForm}>
      <header className='headerFormulario'>
        <h2>Agrega una nota</h2>
      </header>
      <main className='mainFormulario'>
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
