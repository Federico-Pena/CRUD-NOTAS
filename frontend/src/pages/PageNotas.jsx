import './PageNotas.css'
import { useEffect, useState } from 'react'
import useFetchData from '../Hooks/Fetch/useFetchData'
import { deleteNota } from '../services/deleteNota'
import Nota from '../components/Nota/Nota'
import Spinner from '../components/Spinner/Spinner'
import FormularioEditar from '../components/Formulario/FormularioEditar'
import Formulario from '../components/Formulario/Formulario'

export const PageNotas = () => {
  const [notasCompletadas, setNotasCompletadas] = useState([])
  const [notasNoCompletadas, setNotasNoCompletadas] = useState([])
  const [verCompletadas, setVerCompletadas] = useState(false)
  const [FormEdit, setFormEdit] = useState(false)
  const [nota, setNota] = useState({})
  const url = '/api/notas'
  const { data, error, loading } = useFetchData(url)

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
  }

  const openForm = async (e) => {
    setNota(e)
    setFormEdit(true)
  }

  const actualizarNotas = (notaNueva) => {
    console.log(notaNueva.completada)
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
  }
  const quitarBorrada = async (id) => {
    await deleteNota(id)
    const notaCompletada = notasCompletadas.find((nota) => nota._id !== id)
    const notaNoCompletada = notasNoCompletadas.find((nota) => nota._id !== id)
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
  return (
    <main className='mainPage'>
      <h1>CRUD NOTAS</h1>
      <div className='formContainer'>
        {FormEdit ? (
          <FormularioEditar nota={nota} actualizarNotas={actualizarNotas} />
        ) : (
          <Formulario agregarNuevaNota={agregarNuevaNota} />
        )}
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
            <button type='button' onClick={() => setVerCompletadas(!verCompletadas)}>
              {verCompletadas ? 'Ocultar Completadas' : 'Mostrar Completadas'}
            </button>
          ) : null}

          {verCompletadas &&
            notasCompletadas.length &&
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
  )
}
