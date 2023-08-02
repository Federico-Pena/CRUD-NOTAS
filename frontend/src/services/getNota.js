export const getNota = async () => {
	const res = await fetch('/api/notas')
	const data = await res.json()
	return data
}
