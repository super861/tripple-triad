// import React and React Component
import React, { Component } from 'react';
// import user-defined components
import Header from '../components/Header';
import Board from '../components/Board';
import Footer from '../components/Footer';
//import actions
import { fetchCards, fetchGame } from '../actions/index';
//import connect to connect redux and react
import { connect } from 'react-redux';

import ReactModal from "react-modal"; // React Modal, source: https://www.npmjs.com/package/react-modal manual: http://reactcommunity.org/react-modal/
import ModalContent from "../components/ModalContent";

//for the Modal!
ReactModal.setAppElement('body');

/**
* This class is parent component for all the user-defined React components that make up the whole View.
*/
class TrippleTriad extends Component {
  constructor() {
    super();
    this.state = {
      showSetup: true,
      toggleReset: false
    }
  }

  /**
  * This method fetches game setup data from the API.
  * This lifecycle method will be called after the React component TrippleTriad is mounted.
  */
  componentDidMount() {
    this.props.fetchCards();

  }

  toggleResetHandler() {
    this.setState({
      toggleReset: !this.state.toggleReset
    })
  }

  renderGame(){
    const {game} = this.props.game
    const {cards} = this.props.cards
    const {music} = this.props.setup.options
    return <Board cards={cards} game={game} music={music}  />
  }

  renderSetup() {
    return (
      <ReactModal isOpen={this.state.showSetup}  contentLabel="Help Modal" className="Modal" overlayClassName="Overlay">
        <ModalContent
          title="Tripple Triad Setup"
          id="setup"
          button2={{click: this.gameStartHandler.bind(this), value: "Start game"}}
        />
      </ReactModal>
    )
  }

  renderReset() {
    return(
      <ReactModal isOpen={this.state.toggleReset} onRequestClose={this.toggleResetHandler.bind(this)} contentLabel="Help Modal" className="Modal" overlayClassName="Overlay">
        <ModalContent
          close={this.toggleResetHandler.bind(this)}
          title="About Tripple Triad"
          id="reset"
          button1={{click: this.toggleResetHandler.bind(this), value: "Close"}}
          button2={{click: this.gameResetHandler.bind(this), value: "Reset game"}}
        />
      </ReactModal>
    )
  }

  renderTemp() {
    return(
      <div className="main">
      </div>
    )
  }

  gameResetHandler() {
    this.setState({
      toggleReset: !this.state.toggleReset,
      gameStart: !this.state.gameStart,
      showSetup: !this.state.showSetup
    })
  }

  gameStartHandler() {
    this.props.fetchGame('setup').then(() => {
      this.props.fetchGame('toss-coin').then(() => {
        this.setState({
          gameStart: true,
          showSetup: false
        })
      })
    })
  }

  resetOnClickHandler() {
    this.setState({
      toggleReset: true
    })
  }

  doCpuOnClickHandler() {
    this.props.fetchGame('do-cpu');
  }

  /**
  * This method examines this.props and this.state, and renders the (in JSX-code writtten) native DOM and user-defined components.
  */
  render() {
    if(this.props.cards && this.props.game) {
      const {game} = this.props.game
      const {cards} = this.props.cards
      return(
        <div> {/* Everything should be inside one DOM element for React to render the components.*/ }
          <Header
            gameStart={this.state.gameStart}
            cards={cards}
            game={game}
            reset={this.resetOnClickHandler.bind(this)}
            doCpu={this.doCpuOnClickHandler.bind(this)}
            />
          {this.state.gameStart ? this.renderGame() : this.renderTemp()}
          {this.renderSetup()}
          {this.renderReset()}
          <Footer />
        </div>
      );
    } else {
      return(
        <div className="loading">
          <div className="logo"></div>
          <div className="gif"></div>
          <strong>{!this.state.fetchStatus.failed ? "Waiting for Api" : "Fetch request failed"}</strong>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const {cards, game, setup} = state;
  return {
    cards,
    game,
    setup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCards: () => dispatch(fetchCards()),
    fetchGame: (action, body) => dispatch(fetchGame(action, body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrippleTriad);
