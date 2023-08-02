export const deleteNota = async (id) => {
	const res = await fetch(`/api/notas/${id}`, {
		method: 'DELETE',
	})
	const data = await res.json()
	return data
}
