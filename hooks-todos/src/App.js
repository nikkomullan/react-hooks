import React, { useEffect, useReducer } from 'react'
import reducer, { initialState } from './reducer'
import TodosContext from './context'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { TODOS_API_BASE_URL } from './config'
import useAPI from './hooks/useAPI'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const savedTodos = useAPI(TODOS_API_BASE_URL)

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    })
  }, [savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}
