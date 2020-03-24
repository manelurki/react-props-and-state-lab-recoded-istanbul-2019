import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

 onChangeType = (event) => {
    this.setState({
      filters: {
        type : event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let URL = ""

    if(this.state.filters.type === 'all') {
      URL += '/api/pets'
    }
    else {
      URL += `/api/pets?type=${this.state.filters.type}`
    }
    fetch(URL)
    .then(res=>res.json())
    .then(json=>this.setState({pets:json}))
  }

  onAdoptPet = (id) => {
    this.state.pets[this.state.pets.findIndex(pet => pet.id === id)].isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.upDateFilter} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App