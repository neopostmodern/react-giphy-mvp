import React, { Component } from 'react';

import { GIPHY_API_KEY } from './config'

import './App.css';
import Giphy from './Giphy'

class App extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      gif: null,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(`http://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=hello`)
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

  render() {
    return (
      <div className="App">
        <h1 className="title">Talk like GIPHY?</h1>
        {
          this.state.gif
          ? <Giphy loading={this.state.loading} error={this.state.error} gif={this.state.gif}/>
          : <div>No GIPHY</div>
        }
      </div>
    );
  }
}

export default App;
