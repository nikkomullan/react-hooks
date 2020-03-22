import React, { useContext } from 'react'
import axios from 'axios'
import TodosContext from '../context'
import { TODOS_API_BASE_URL } from '../config'

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext)
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing To Do!'

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
          >
            <span
              onDoubleClick={async () => {
                const response = await axios.patch(
                  `${TODOS_API_BASE_URL}/${todo.id}`,
                  { complete: !todo.complete }
                )
                dispatch({ type: 'TOGGLE_TODO', payload: response.data })
              }}
              className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                'line-through text-grey-darkest'}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
              }
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                className="h6"
              />
            </button>
            <button
              onClick={async () => {
                await axios.delete(`${TODOS_API_BASE_URL}/${todo.id}`)
                dispatch({ type: 'REMOVE_TODO', payload: todo })
              }}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
                className="h6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
