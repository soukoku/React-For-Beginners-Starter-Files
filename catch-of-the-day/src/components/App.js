import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }
  componentDidMount() {
    const { storeId } = this.props.match.params
    const localStorageRef = JSON.parse(localStorage.getItem(`${storeId}:order`))
    if (localStorageRef) {
      this.setState({ order: localStorageRef })
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }
  componentDidUpdate() {
    const { storeId } = this.props.match.params
    localStorage.setItem(`${storeId}:order`, JSON.stringify(this.state.order))
  }
  componentWillUnmount() {
    base.removeBinding(this.ref)
  }
  addFish = fish => {
    const fishes = { ...this.state.fishes }
    fishes[`fish${Date.now()}`] = fish
    this.setState({ fishes })
  }
  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes, [key]: updatedFish }
    this.setState({ fishes })
  }
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }
  addToOrder = key => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App
