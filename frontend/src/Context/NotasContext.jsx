import { createContext, useReducer } from 'react'
// Definir acciones para el CRUD
export const ACTIONS = {
  ADD_ITEMS: 'ADD_ITEMS',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM'
}

const notasReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEMS:
      return {
        ...state,
        completadas: [
          ...action.payload.filter((nota) =>
            nota.tareas.every((tarea) => tarea.tareaCompletada === true)
          )
        ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
        noCompletadas: [
          ...action.payload.filter((nota) =>
            nota.tareas.some((tarea) => tarea.tareaCompletada === false)
          )
        ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      }

    case ACTIONS.UPDATE_ITEM:
      return action.payload.tareas.every((nota) => nota.tareaCompletada)
        ? {
            ...state,
            completadas: [
              ...state.completadas.filter((item) => item._id !== action.payload._id),
              action.payload
            ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
            noCompletadas: state.noCompletadas
              .filter((item) => item._id !== action.payload._id)
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          }
        : {
            ...state,
            noCompletadas: [
              ...state.noCompletadas.filter((item) => item._id !== action.payload._id),
              action.payload
            ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
            completadas: state.completadas
              .filter((item) => item._id !== action.payload._id)
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          }

    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        completadas: state.completadas.filter((item) => item._id !== action.payload),
        noCompletadas: state.noCompletadas.filter((item) => item._id !== action.payload)
      }
    default:
      return state
  }
}
export const NotasContext = createContext()
export const NotasProvider = ({ children }) => {
  const initialState = { completadas: [], noCompletadas: [] }
  const [state, dispatch] = useReducer(notasReducer, initialState)

  return <NotasContext.Provider value={{ state, dispatch }}>{children}</NotasContext.Provider>
}
