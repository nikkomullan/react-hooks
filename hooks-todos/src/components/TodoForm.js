import React, { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import TodosContext from '../context'
import { TODOS_API_BASE_URL } from '../config'

export default function TodoForm() {
  const [text, setText] = useState('')
  const {
    state: { currentTodo },
    dispatch
  } = useContext(TodosContext)
  const textInputRef = useRef()

  useEffect(() => {
    if (currentTodo) {
      setText(currentTodo.text)
    } else {
      setText('')
    }
    textInputRef.current.focus()
  }, [currentTodo])

  const handleSubmit = async event => {
    event.preventDefault()
    if (currentTodo) {
      const response = await axios.patch(
        `${TODOS_API_BASE_URL}/${currentTodo.id}`,
        { text }
      )
      dispatch({ type: 'UPDATE_TODO', payload: response.data })
    } else {
      const response = await axios.post(TODOS_API_BASE_URL, {
        id: uuidv4(),
        text,
        complete: false
      })
      dispatch({ type: 'ADD_TODO', payload: response.data })
    }
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        autoFocus
        type="text"
        onChange={event => setText(event.target.value)}
        className="border-black border-solid border-2"
        value={text}
        ref={textInputRef}
      />
    </form>
  )
}
