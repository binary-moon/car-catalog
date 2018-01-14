import React, { Component } from 'react'
import { connect } from 'react-redux';
import { displayFeaturedCar, displayDetailCar } from '../../reducers/catalog'

import './CarDetail.css'

class CarDetail extends Component {
  render() {
    if (this.props.car) {
      return(
        <section className="CarDetail">
          <img className="CarDetail-image" src={this.props.car.imageUrl} alt={this.props.car.name}/>
          <h2 className="CarDetail-name">{this.props.car.makeName} - {this.props.car.name}</h2>
          <h4 className="CarDetail-price">${this.props.car.price}</h4>
        </section>
      )
    }
    return (
      <section className="CarDetail">
        <p>We are unable to find the car requested...</p>
      </section>
    )
  }
}

export default connect(
    (state, ownProps) => (
      {
        car: ownProps.showFeaturedCar
          ? displayFeaturedCar(state.featuredCar, state.makes, state.models)
          : displayDetailCar(ownProps.make, ownProps.model, ownProps.id, state.makes, state.models),
      }
    )
)(CarDetail)
