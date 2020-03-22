import React from 'react'

export default class AppClass extends React.Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    })
  }

  incrementCount = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }))
  }

  render() {
    return (
      <>
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>
          [Class] I was clicked ${this.state.count} times
        </button>

        <h2>Toggle Light</h2>
        <img
          src={
            this.state.isOn
              ? 'https://icon.now.sh/highlight/fd0'
              : 'https://icon.now.sh/highlight/aaa'
          }
          style={{
            height: '50px',
            width: '50px'
          }}
          alt="Flashlight"
          onClick={this.toggleLight}
        />

        <h2>Mouse Position</h2>
        <p>X position: {this.state.x}</p>
        <p>Y position: {this.state.y}</p>
      </>
    )
  }
}
