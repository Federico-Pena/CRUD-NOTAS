import { useContext } from 'react'
import { calcularDiferenciaTiempo } from '../../helpers/calcularDiferenciaTiempo'
import './Nota.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { ModalContext } from '../../Context/ModalContext'
import { Toast } from '../Toast/Toast'
import { useNotas } from '../../Hooks/Notas/useNotas'

function Nota({ nota, openForm }) {
  const { mensaje, setMensaje } = useContext(ModalContext)
  const { deleteData, putData } = useNotas(`/api/notas`)

  const borrarNotas = async (e) => {
    const id = e.target.id
    await deleteData(id)
  }
  const editarNotas = () => {
    window.scrollTo(0, 0)
    openForm(nota)
  }
  const editarCompletada = async (index, check) => {
    const nuevasTareas = [...nota.tareas]
    nuevasTareas[index].tareaCompletada = check
    const notaNueva = {
      _id: nota._id,
      titulo: nota.titulo,
      tareas: nuevasTareas
    }
    await putData(notaNueva)
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
