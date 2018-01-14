import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMakes, fetchModels, fetchFeaturedCar } from './reducers/catalog'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import PrimaryNavigation from './components/PrimaryNavigation/PrimaryNavigation'
import CarDetail from './components/CarDetail/CarDetail'
import Search from './components/Search/Search'

import './App.css';


class App extends Component {
  componentDidMount = () => {
    this.props.fetchFeaturedCar();
    this.props.fetchMakes();
    this.props.fetchModels();
  }

  render() {
    return (
      <Router>
        <div>
          <PrimaryNavigation />
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => (
                <div>
                  <CarDetail showFeaturedCar={true}/>
                  { this.props.featuredCar &&
                    <p className="u-text-center">{this.props.featuredCar.review}</p>
                  }
                </div>
              )}/>
              <Route path="/search" render={({history}) => (
                <Search history={history}/>
              )}/>
              <Route path="/:make/:model/:id" render={({match}) => (
                <CarDetail
                  showFeaturedCar={false}
                  make={match.params.make}
                  model={match.params.model}
                  id={match.params.id}/>
              )}/>
              <Route render={() => (
                <p>Page not found...</p>
              )}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(
    (state) => ({featuredCar: state.featuredCar}),
    {fetchMakes, fetchModels, fetchFeaturedCar}
)(App)
