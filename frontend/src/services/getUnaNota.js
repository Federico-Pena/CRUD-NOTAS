export const getUnaNota = async (e) => {
	const res = await fetch(`/api/nota/${e}`)
	const data = await res.json()
	return data
}
