export const postNota = async (nota) => {
	const res = await fetch('/api/notas', {
		method: 'POST',
		body: JSON.stringify(nota),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await res.json()
	return data
}
