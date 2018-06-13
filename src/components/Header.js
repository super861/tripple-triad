import React, { Component } from "react";
import Modal from "./Modal"

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCards: false,
      showHelp: false
    };
  }

  renderHelp() {
    const {cards} = this.props;

    return(
      <Modal
          title="About Tripple Triad"
          id="help"
          close={this.toggleHelpModalHandler.bind(this)}
          button1={{click: this.toggleHelpModalHandler.bind(this), value: "Close help"}}
          button2={{click: this.toggleHelpModalHandler.bind(this), style: {display: "none"}, value: "hoi"}}
          cards={cards}
      />
    )
  }

  toggleHelpModalHandler(){
    this.setState({showHelp: !this.state.showHelp});
  }

  render() {
    const {turn, status} = this.props.game;

    return(
      <header> {/* Alles moet binnen één DIV element zitten voor het renderen van React.*/ }
        <div className="container mw-100">
          <button className="btn btn-danger mx-2 gamereset" onClick={this.props.reset} disabled={!this.props.gameStart}>Reset game</button>
          <button className="btn btn-primary mx-2 help" onClick={this.toggleHelpModalHandler.bind(this)}>?</button>
          {this.state.showHelp && this.renderHelp()}
        </div>
        <div className="container mw-100">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h3>Turn: {turn}</h3>
              {turn === 'cpu' && <button className="btn btn-secondary" onClick={this.props.doCpu}>do cpu turn</button>}
            </div>
            <div className="col-md-6">
              <h3>Status: {status}</h3>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
