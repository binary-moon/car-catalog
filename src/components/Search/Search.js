import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateCurrentMake, updateCurrentModel, resetSearch } from '../../reducers/catalog'

import './Search.css'

class Search extends Component {
  componentDidMount = () => {
    this.props.resetSearch();
  }

  handleMakeChange = (e) => {
    this.props.updateCurrentMake(e.target.value);
  }

  handleModelChange = (e) => {
    this.props.updateCurrentModel(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(this.props.searchURL)
  }

  render() {
    if (this.props.makes.length > 0
      && this.props.models.length > 0) {
      return (
        <section className="Search">
          <p>Please select a make and a model from the dropdowns below:</p>
          <form className="Search-form" onSubmit={this.handleSubmit}>
              <select className="Search-select Select"
                name="models"
                onChange={this.handleMakeChange}>
                  <option value="">Select a make...</option>
                {this.props.makes.map(make =>
                  <option key={make.id} value={make.id}>{make.name}</option>
                )}
              </select>
              <select className="Search-select Select"
                name="makes"
                onChange={this.handleModelChange}
                disabled={this.props.filteredModels.length === 0}>
                  <option value="">Select a model...</option>
                  {this.props.filteredModels.map(model =>
                    <option key={model.id} value={model.id}>{model.name}</option>
                  )}
              </select>
              <button className="Search-button Button"
                disabled={this.props.currentModel === null}>
                Go
              </button>
          </form>
        </section>
      )
    } else {
      return (
        <section className="Search">
          <p>Loading...</p>
        </section>
      )
    }
  }
}

export default connect(
    (state, ownProps) => ({
      makes: state.makes,
      models: state.models,
      filteredModels: state.filteredModels,
      currentModel: state.currentModel,
      searchURL: state.searchURL,
      history: ownProps.history
    }),
    {updateCurrentMake, updateCurrentModel, resetSearch}
)(Search)
