import { baseUrl } from '../constantes'

export const deleteNota = async (id, token) => {
  const res = await fetch(`${baseUrl}/api/notas/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
  const data = await res.json()
  return data
}
