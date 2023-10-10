import { useState } from 'react'

/*
  Hook: useLocalStorage

  Este hook proporciona una interfaz para gestionar datos en el almacenamiento local del navegador.
  Permite almacenar, recuperar, editar y eliminar datos, y mantiene automáticamente la sincronización
  con el almacenamiento local.

  Parámetros:
    - key: Clave única para identificar el conjunto de datos en el almacenamiento local.
    - initialValue: Valor inicial si no hay datos almacenados.

  Retorna:
    Un objeto con el estado actual de los datos y funciones para agregar, editar y eliminar elementos.

  Uso:
    const { datos, agregarItem, editarItemPorId, eliminarItemPorId } = useLocalStorage('miDatos', []);
    agregarItem({ id: 1, nombre: 'Ejemplo' });
    editarItemPorId(1, { id: 1, nombre: 'Nuevo Ejemplo' });
    eliminarItemPorId(1);
*/
const useLocalStorage = (key, initialValue = []) => {
  // Obtener el valor almacenado en localStorage o usar el valor inicial
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue

  // Estado local para el valor
  const [dataStorage, setDataStorage] = useState(storedValue)

  // Función para actualizar el valor y almacenarlo en localStorage
  const setStoredValue = (newValue) => {
    setDataStorage(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  // Función para agregar un nuevo elemento al almacenamiento local
  const agregarItem = (item) => {
    const updatedValue = [...dataStorage, item]
    setStoredValue(updatedValue)
  }

  // Función para editar un elemento en el almacenamiento local por su identificador único
  const editarItemPorId = (itemId, newItem) => {
    const updatedValue = dataStorage.map((item) => (item.id === itemId ? newItem : item))
    setStoredValue(updatedValue)
  }

  // Función para eliminar un elemento del almacenamiento local por su identificador único
  const eliminarItemPorId = (itemId) => {
    const updatedValue = dataStorage.filter((item) => item.id !== itemId)
    setStoredValue(updatedValue)
  }

  return { datos: dataStorage, agregarItem, editarItemPorId, eliminarItemPorId }
}

export default useLocalStorage
