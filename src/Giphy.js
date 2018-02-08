import React, { Component } from 'react';
import './Giphy.css';

export default class Giphy extends Component {
  render() {
    const { loading, error, gif, onRequestAnother } = this.props;
    if (loading) {
      return <i>Loading...</i>;
    }
    if (error) {
      return <div className="giphy__error">
        Couldn't reach GIPHY: {error}<br/>
        <button type="button" onClick={onRequestAnother} className="button">
          Retry?
        </button>
      </div>;
    }

    let user;
    if (gif.username) {
      user = <React.Fragment> by <span className="giphy__user">{gif.username}</span></React.Fragment>
    }
    return <div className="giphy">
      <div className="giphy__suggestion">
        How about <span className="giphy__name">{gif.title}</span>{user}?
      </div>

      <img className="giphy__image" src={gif.images.original.url} alt={gif.title} />

      <div className="giphy__reaction">
        <span className="giphy__reaction__expression giphy__reaction--positive__expression">
          Yes?
        </span>{' '}
        Drop this: {gif.images.original.url}
      </div>
      <div className="giphy__reaction">
        <span className="giphy__reaction__expression giphy__reaction--negative__expression">
          No?
        </span>{' '}
        <button type="button" onClick={onRequestAnother} className="button">
          Try another one!
        </button>
      </div>
    </div>
  }
}

