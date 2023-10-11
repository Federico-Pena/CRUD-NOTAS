import { useContext, useState } from 'react'
import { calcularDiferenciaTiempo } from '../../helpers/calcularDiferenciaTiempo'
import { putNota } from '../../services/putNota'
import './Nota.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { deleteNota } from '../../services/deleteNota'
import { UserContext } from '../../Context/UserContext'
import { ModalContext } from '../../Context/ModalContext'
import { Toast } from '../Toast/Toast'
function Nota({ nota, openForm, quitarBorrada, marcarCompletada }) {
  const { user } = useContext(UserContext)
  const { mensaje, setMensaje } = useContext(ModalContext)

  const borrarNotas = async (e) => {
    const id = e.target.id
    const res = await deleteNota(id, user.token)
    quitarBorrada(res)
  }
  const editarNotas = () => {
    window.scrollTo(0, 0)
    openForm(nota)
  }
  const editarCompletada = async (check) => {
    const notaNueva = {
      titulo: nota.titulo,
      contenido: nota.contenido,
      completada: check
    }
    const { data, error } = await putNota(notaNueva, nota._id, user.token)
    if (data) {
      marcarCompletada(data)
      setMensaje(`Nuevo estado ${check ? 'Completada' : 'Pendiente'}`)
    }
    if (error) {
      setMensaje(error)
    }
  }

  const fechaCreado = new Date(nota.createdAt)
  const fechaActualizado = new Date(nota.updatedAt)
  const fechas = calcularDiferenciaTiempo(fechaCreado, fechaActualizado)
  return (
    <>
      {mensaje && <Toast mensaje={mensaje} setMensaje={setMensaje} />}
      <article className={`containerNota ${nota.completada ? 'completada' : ''}`}>
        <header className='tituloYbotonesNota'>
          <input
            type='checkbox'
            defaultChecked={nota.completada}
            name='completada'
            id=''
            onChange={(e) => editarCompletada(e.target.checked)}
          />
          <h3>{nota.titulo}</h3>
          <AiOutlineEdit onClick={editarNotas} className='btnEditar' />
          <AiOutlineDelete id={nota._id} onClick={borrarNotas} className='btnBorrar' />
        </header>
        <main className='contenido'>
          <p>{nota.contenido}</p>
        </main>
        <footer className='fechas'>
          <samp>{fechas.creado}</samp>
          {nota.createdAt !== nota.updatedAt && <samp>{fechas.actualizado}</samp>}
        </footer>
      </article>
    </>
  )
}

export default Nota
