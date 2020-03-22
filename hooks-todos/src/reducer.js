export const initialState = { todos: [], currentTodo: null }

export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      }
    case 'ADD_TODO': {
      // if (!action.payload) {
      //   return state
      // }
      // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //   return state
      // }
      // const newTodo = {
      //   id: uuidv4(),
      //   text: action.payload,
      //   complete: false
      // }
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    }
    case 'UPDATE_TODO': {
      // if (!action.payload) {
      //   return state
      // }
      // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //   return state
      // }
      const updatedTodo = { ...action.payload }
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      )
      return {
        ...state,
        currentTodo: null,
        todos: [
          ...state.todos.slice(0, updatedTodoIndex),
          updatedTodo,
          ...state.todos.slice(updatedTodoIndex + 1)
        ]
        // todos: state.todos.map(todo =>
        //   todo.id === action.payload.id
        //     ? { ...action.payload, text: action.payload.text }
        //     : todo
        // )
      }
    }
    case 'REMOVE_TODO':
      return {
        ...state,
        currentTodo:
          state.currentTodo && state.currentTodo.id === action.payload.id
            ? null
            : state.currentTodo,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload
      }
    default:
      return state
  }
}
