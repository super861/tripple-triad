import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return(
      <div id={this.props.cellId} className="cell">
        <img src={this.props.bg} alt="card"  />
      </div>

    );
  }
}

export default Cell;
