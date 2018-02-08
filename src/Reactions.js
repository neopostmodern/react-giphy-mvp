import React, { Component } from 'react';

import "./Reactions.css";

export default class Reactions extends Component {
  constructor() {
    super();

    this.state = {
      copiedUrl: null
    }

    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    // https://developers.google.com/web/updates/2015/04/cut-and-copy-commands?hl=en
    const selection = window.getSelection();
    selection.empty();
    let range = document.createRange();
    range.selectNode(this.urlSpan);
    selection.addRange(range);

    try {
      // Now that we've selected the anchor text, execute the copy command
      const successful = document.execCommand('copy');
      if (successful) {
        this.setState({ copiedUrl: this.props.url });
      }
    } catch(err) {
      console.log('Oops, unable to copy');
    }

    // Remove the selections - NOTE: Should use removeRange(range) when it is supported
    window.getSelection().removeAllRanges();
  }

  render() {
    return (
      <React.Fragment>
        <div className="reaction">
          <span className="reaction__expression reaction--positive__expression">
            Yes?
          </span>{' '}
          Drop this:{' '}
          <span
            ref={element => this.urlSpan = element}
            className="reaction__url"
          >
            {this.props.url}
          </span>{' '}

          {
            this.state.copiedUrl === this.props.url
            ? "Copied!"
            : (
              <button
                type="button"
                onClick={this.copyToClipboard}
                className="button"
              >
                Copy to clipboard?
              </button>
            )
          }
        </div>
        <div className="reaction">
          <span className="reaction__expression reaction--negative__expression">
            No?
          </span>{' '}
          <button type="button" onClick={this.props.onRequestAnother} className="button">
            Try another one!
          </button>
        </div>
      </React.Fragment>
    );
  }
}