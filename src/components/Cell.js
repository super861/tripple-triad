import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return(
      <div id={this.props.cellId} className={this.props.selected ? "cell selected" : "cell"} onClick={this.props.onClick} style={this.props.cellStyle}>
        <img src={this.props.bg} alt="card" id={this.props.cardId} />
      </div>

    );
  }
}

export default Cell;
