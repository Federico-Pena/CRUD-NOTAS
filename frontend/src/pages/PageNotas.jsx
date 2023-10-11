import './PageNotas.css'
import { useContext, useEffect, useState } from 'react'
import useFetchData from '../Hooks/Fetch/useFetchData'
import Nota from '../components/Nota/Nota'
import Spinner from '../components/Spinner/Spinner'
import FormularioEditar from '../components/Formulario/FormularioEditar'
import Formulario from '../components/Formulario/Formulario'
import { ModalContext } from '../Context/ModalContext'
import { Toast } from '../components/Toast/Toast'

export const PageNotas = () => {
  const [notasCompletadas, setNotasCompletadas] = useState([])
  const [notasNoCompletadas, setNotasNoCompletadas] = useState([])
  const [verCompletadas, setVerCompletadas] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [form, setForm] = useState(false)

  const [nota, setNota] = useState({})
  const url = '/api/notas'
  const { data, error, loading } = useFetchData(url)
  const { mensaje, setMensaje } = useContext(ModalContext)
  useEffect(() => {
    const completadas = data.filter((nota) => nota.completada)
    const noCompletadas = data.filter((nota) => !nota.completada)
    setNotasCompletadas(completadas)
    setNotasNoCompletadas(noCompletadas)
  }, [data])

  const agregarNuevaNota = (nota) => {
    setNotasNoCompletadas((prev) =>
      prev.concat(nota).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    )
    setMensaje('Nota creada')
    setForm(false)
    setFormEdit(false)
  }

  const openForm = async (e) => {
    setNota(e)
    setFormEdit(true)
  }

  const actualizarNotas = (notaNueva) => {
    const notasFiltradaCompletadas = notasCompletadas.filter((nota) => nota._id !== notaNueva._id)
    const notasFiltradaNoCompletadas = notasNoCompletadas.filter(
      (nota) => nota._id !== notaNueva._id
    )
    if (notaNueva.completada) {
      notasFiltradaCompletadas.push(notaNueva)
    }
    if (!notaNueva.completada) {
      notasFiltradaNoCompletadas.push(notaNueva)
    }
    setNotasCompletadas(
      notasFiltradaCompletadas.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    )
    setNotasNoCompletadas(
      notasFiltradaNoCompletadas.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    )
    setFormEdit(false)
    setForm(false)
  }
  const quitarBorrada = (res) => {
    if (res.data) {
      const id = res.data._id
      const notaCompletada = notasCompletadas.find((nota) => nota._id === id)
      const notaNoCompletada = notasNoCompletadas.find((nota) => nota._id === id)
      if (notaCompletada) {
        const notasFiltradaCompletadas = notasCompletadas.filter((nota) => nota._id !== id)
        setNotasCompletadas(
          notasFiltradaCompletadas.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        )
      }
      if (notaNoCompletada) {
        const notasFiltradaNoCompletadas = notasNoCompletadas.filter((nota) => nota._id !== id)
        setNotasNoCompletadas(
          notasFiltradaNoCompletadas.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        )
      }
    }
    if (res.error) {
      setMensaje(res.error)
    }
  }

  return (
    <>
      {mensaje && <Toast mensaje={mensaje} setMensaje={setMensaje} />}
      <main className='mainPage'>
        <h2>{data[0] ? `Notas de ${data[0].nombreUsuario}` : 'Tus Notas'}</h2>
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
              <FormularioEditar nota={nota} actualizarNotas={actualizarNotas} />
            </>
          )}
          {form && <Formulario agregarNuevaNota={agregarNuevaNota} />}
        </div>

        {error ? (
          <h2>{error}</h2>
        ) : (
          <div className='notasContainer'>
            {loading ? (
              <Spinner />
            ) : notasNoCompletadas.length ? (
              notasNoCompletadas.map((nota) => {
                return (
                  <Nota
                    key={nota._id}
                    nota={nota}
                    openForm={openForm}
                    quitarBorrada={quitarBorrada}
                    marcarCompletada={actualizarNotas}
                  />
                )
              })
            ) : (
              <h2>No hay Notas</h2>
            )}
            {notasCompletadas.length > 0 ? (
              <button
                className='btnMostrarCompletadas'
                type='button'
                onClick={() => setVerCompletadas(!verCompletadas)}>
                {verCompletadas ? 'Ocultar Completadas' : 'Mostrar Completadas'}
              </button>
            ) : null}
            {verCompletadas &&
              notasCompletadas.length > 0 &&
              notasCompletadas.map((nota) => {
                return (
                  <Nota
                    key={nota._id}
                    nota={nota}
                    openForm={openForm}
                    quitarBorrada={quitarBorrada}
                    marcarCompletada={actualizarNotas}
                  />
                )
              })}
          </div>
        )}
      </main>
    </>
  )
}
