import React, { Component } from 'react';

import './Say.css';

export default class Say extends Component {
  constructor() {
    super();

    this.state = {
      text: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    this.props.onText(this.state.text);
    event.preventDefault();
  }

  render() {
    return <div className="say">
      I want to say{' '}
      <form onSubmit={this.handleSubmit} className="say__form">
        <input
          className="say__input"
          type={'text'}
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="something"
        />
      </form>
      !
    </div>;
  }
}