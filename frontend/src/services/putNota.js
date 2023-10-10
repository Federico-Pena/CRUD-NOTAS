import { baseUrl } from '../constantes'

export const putNota = async (nota, id) => {
  const res = await fetch(`${baseUrl}/api/notas/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(nota)
  })
  const data = await res.json()
  return data
}
