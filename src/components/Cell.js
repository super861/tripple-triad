import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return(
      <div id={this.props.cellId} className="cell" onClick={this.props.onClick}>
        <img src={this.props.bg} alt="card" id={this.props.cardId} />
      </div>

    );
  }
}

export default Cell;
