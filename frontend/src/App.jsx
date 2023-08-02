import { useEffect, useState } from 'react'
import './App.css'
import { getNota } from './services/getNota'
import { getUnaNota } from './services/getUnaNota'
import Formulario from './components/Formulario'
import Nota from './components/Nota'
import FormularioEditar from './components/FormularioEditar'
import { deleteNota } from './services/deleteNota'
function App() {
	const [notas, setNotas] = useState([])
	const [FormEdit, setFormEdit] = useState(false)
	const [nota, setNota] = useState([])

	useEffect(() => {
		const obtenerNotas = async () => {
			const res = await getNota()
			setNotas(res.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)))
		}
		obtenerNotas()
	}, [])
	const setearNotas = (nota) => {
		setNotas((prev) =>
			prev.concat(nota).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
		)
	}

	const openForm = async (e) => {
		const res = await getUnaNota(e)
		setNota(res)
		setFormEdit(true)
	}

	const actualizarNotas = (notaNueva) => {
		const notasFiltrada = notas.filter((nota) => nota._id !== notaNueva._id)
		notasFiltrada.push(notaNueva)
		setNotas(notasFiltrada.sort((a, b) => (a.up < b.updatedAt ? 1 : -1)))
	}

	const quitarBorrada = async (id) => {
		await deleteNota(id)
		const filtradas = notas.filter((nota) => nota._id !== id)
		setNotas(filtradas.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)))
	}
	return (
		<main>
			<h1>CRUD NOTAS</h1>
			<div className='formContainer'>
				{FormEdit ? (
					<FormularioEditar nota={nota} actualizarNotas={actualizarNotas} />
				) : (
					<Formulario setearNotas={setearNotas} />
				)}
			</div>
			<div className='notasContainer'>
				{notas.length ? (
					notas.map((nota) => {
						return (
							<Nota
								key={nota._id}
								nota={nota}
								openForm={openForm}
								quitarBorrada={quitarBorrada}
							/>
						)
					})
				) : (
					<h2>No hay Notas</h2>
				)}
			</div>
		</main>
	)
}

export default App
