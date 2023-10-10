import { baseUrl } from '../constantes'

export const deleteNota = async (id) => {
  const res = await fetch(`${baseUrl}/api/notas/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  return data
}
