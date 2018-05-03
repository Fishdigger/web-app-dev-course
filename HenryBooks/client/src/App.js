import React, { Component } from 'react'
import Router from "./routes"
import Nav from "./nav"
import Foot from "./foot"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Router />
        <Foot />
      </div>
    )
  }
}

export default App
