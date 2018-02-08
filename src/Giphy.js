import React, { Component } from 'react';
import './Giphy.css';

export default class Giphy extends Component {
  render() {
    const {loading, error, gif} = this.props;
    if (loading) {
      return <i>Loading...</i>;
    }
    if (error) {
      return <div className="giphy__error">Couldn't reach GIPHY: {error}</div>;
    }

    let user;
    if (gif.username) {
      user = <React.Fragment> by <span className="giphy__user">{gif.username}</span></React.Fragment>
    }
    return <div className="giphy">
      <div className="giphy__suggestion">
      How about <span className="giphy__name">{gif.title}</span>{user}?
      </div>
      <div>
        <img src={gif.images.original.url} alt={gif.title} />
      </div>
    </div>
  }
}

