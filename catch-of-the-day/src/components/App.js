import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }
  addFish = fish => {
    console.log('adding fish!')
    const fishes = { ...this.state.fishes }
    fishes[`fish${Date.now()}`] = fish
    this.setState({
      fishes: fishes
    })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          {/* <Fish /> */}
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App
