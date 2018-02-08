import React, { Component } from 'react';

import { GIPHY_API_KEY } from './config'

import './App.css';
import Say from './Say'
import Giphy from './Giphy'

class App extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      gif: null,
      loading: false
    }

    this.handleText = this.handleText.bind(this);
    this.handleRequestAnother = this.handleRequestAnother.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.text !== nextState.text) {
      this.searchGiphy();
    }
  }

  searchGiphy() {
    this.setState({
      loading: true
    });
    fetch(`http://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${this.state.text}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          gif: data.data
        })
      })
      .catch(error => {
        console.warn(error);
        this.setState({
          loading: false,
          error: error.message
        })
      })
  }

  handleText(text) {
    this.setState({ text });
  }

  handleRequestAnother() {
    this.searchGiphy();
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Talk like GIPHY?</h1>
        <Say onText={this.handleText} />
        {
          this.state.gif
          ? <Giphy
              loading={this.state.loading}
              error={this.state.error}
              gif={this.state.gif}
              onRequestAnother={this.handleRequestAnother}
            />
          : <div>To start, enter a search term above</div>
        }
      </div>
    );
  }
}

export default App;
