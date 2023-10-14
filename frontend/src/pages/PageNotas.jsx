import './PageNotas.css'
import { useContext, useState } from 'react'
import Nota from '../components/Nota/Nota'
import Spinner from '../components/Spinner/Spinner'
import FormularioEditar from '../components/Formulario/FormularioEditar'
import Formulario from '../components/Formulario/Formulario'
import { ModalContext } from '../Context/ModalContext'
import { Toast } from '../components/Toast/Toast'
import { UserContext } from '../Context/UserContext'
import { useNotas } from '../Hooks/Notas/useNotas'
import { NotasContext } from '../Context/NotasContext'

export const PageNotas = () => {
  const [verCompletadas, setVerCompletadas] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [form, setForm] = useState(false)
  const [nota, setNota] = useState({})
  const { mensaje, setMensaje } = useContext(ModalContext)
  const { user } = useContext(UserContext)
  const { state } = useContext(NotasContext)
  const url = '/api/notas'
  const { loading } = useNotas(url)

  const openForm = async (e) => {
    setNota(e)
    setFormEdit(true)
  }

  return (
    <>
      {mensaje && <Toast mensaje={mensaje} setMensaje={setMensaje} />}
      <main className='mainPage'>
        <h2>{user.username ? `Notas de ${user.username}` : 'Tus Notas'}</h2>
        <div className='formContainer'>
          {!formEdit && (
            <button
              type='button'
              title={form ? 'Cerrar Form' : 'Agregar Nueva Nota'}
              onClick={() => {
                setForm(!form)
              }}>
              {form ? 'Cerrar Form' : 'Agregar Nueva Nota'}
            </button>
          )}
          {formEdit && (
            <>
              <button
                type='button'
                title='Cerrar Form'
                onClick={() => {
                  setFormEdit(false)
                }}>
                Cerrar Form
              </button>
              <FormularioEditar nota={nota} setForm={() => setFormEdit(false)} />
            </>
          )}
          {form && <Formulario setForm={() => setForm(false)} />}
        </div>

        {
          <div className='notasContainer'>
            {loading ? (
              <Spinner />
            ) : state.noCompletadas.length ? (
              state.noCompletadas.map((nota) => {
                return <Nota key={nota._id} nota={nota} openForm={openForm} />
              })
            ) : (
              <h2>No hay Notas</h2>
            )}
            {state.completadas.length ? (
              <button
                className='btnMostrarCompletadas'
                type='button'
                onClick={() => setVerCompletadas(!verCompletadas)}>
                {verCompletadas ? 'Ocultar Completadas' : 'Mostrar Completadas'}
              </button>
            ) : null}
            {verCompletadas &&
              state.completadas.length > 0 &&
              state.completadas.map((nota) => {
                return <Nota key={nota._id} nota={nota} openForm={openForm} />
              })}
          </div>
        }
      </main>
    </>
  )
}
