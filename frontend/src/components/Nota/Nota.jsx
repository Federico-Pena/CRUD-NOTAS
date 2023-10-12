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
  const editarCompletada = async (index, check) => {
    const nuevasTareas = [...nota.tareas]
    nuevasTareas[index].tareaCompletada = check
    const notaNueva = {
      titulo: nota.titulo,
      tareas: nuevasTareas
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
      <article
        className={`containerNota ${
          nota.tareas.every((tarea) => tarea.tareaCompletada) ? 'completada' : ''
        }`}>
        <header className='tituloYbotonesNota'>
          <h3>{nota.titulo}</h3>
          <AiOutlineEdit onClick={editarNotas} className='btnEditar' />
          <AiOutlineDelete id={nota._id} onClick={borrarNotas} className='btnBorrar' />
        </header>
        <main className='contenido'>
          {nota.tareas.map((tarea, index) => (
            <div key={index} className={`tarea ${tarea.tareaCompletada ? 'completada' : ''}`}>
              <input
                className='checkTarea'
                type='checkbox'
                defaultChecked={tarea.tareaCompletada}
                onChange={(e) => editarCompletada(index, e.target.checked)}
              />
              <p>{tarea.tareaTitulo}</p>
            </div>
          ))}
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
