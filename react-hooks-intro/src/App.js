import React, { useState } from 'react'
import AppFunction from './AppFunction'
import AppClass from './AppClass'
import Login from './Login'
import Register from './Register'

export default function App() {
  const options = ['Register', 'Login', 'AppFunction', 'AppClass']

  const [selection, setSelection] = useState(options[0])

  const renderSelection = () => {
    switch (selection) {
      case 'AppFunction':
        return <AppFunction />
      case 'AppClass':
        return <AppClass />
      case 'Login':
        return <Login />
      case 'Register':
        return <Register />
      default:
        return 'Select an option'
    }
  }

  const renderOptions = () => {
    return options.map(option => (
      <button
        style={{
          background: selection === option ? 'orange' : 'white'
        }}
        onClick={() => setSelection(option)}
      >
        {option}
      </button>
    ))
  }

  return (
    <>
      <div>{renderOptions()}</div>
      <div>{renderSelection()}</div>
    </>
  )
}
