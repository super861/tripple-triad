// import React and React Component
import React, { Component } from 'react';
// import user-defined components
import Header from '../components/Header';
import Board from '../components/Board';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
//import actions
import { fetchCards, fetchGame } from '../actions/index';
import { setStatusNew } from '../actions/game';
//import connect to connect redux and react
import { connect } from 'react-redux';

/**
* This class is parent component for all the user-defined React components that make up the whole View.
*/
class TrippleTriad extends Component {
  constructor() {
    super();
    this.state = {
      showSetup: true,
      toggleReset: false,
      closedGameOver: false,
    }
  }

  /**
  * This method fetches game setup data from the API.
  * This lifecycle method will be called after the React component TrippleTriad is mounted.
  */
  componentDidMount() {
    this.props.fetchCards();

  }

  componentDidUpdate() {
    const {status} = this.props.game.game;
    /* Reset the closedGameOver boolean after a game over with reset
     * this cannot be done in the reset/setup, only after a status change from won/lost/draw to playing */
    if (status === "playing" && this.state.closedGameOver){
        this.setState({
          closedGameOver: false
        });
    }
  }

  showGameOverModalCheck() {
    const {status} = this.props.game.game;
    // Check if the modal should be opened
    if((status === "won" || status === "lost" || status === "draw") && !this.state.closedGameOver) {
      // game ended and the player did not close the modal already
      return true;
    } else {
      // status is not defined or 'playing'
      return false;
    }
  }

  toggleResetHandler() {
    this.setState({
      toggleReset: !this.state.toggleReset
    })
  }

  closeGameOverHandler() {
    this.setState({
      closedGameOver: true
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
      <Modal
          title="Tripple Triad Setup"
          id="setup"
          button2={{click: this.gameStartHandler.bind(this), value: "Start game"}}
      />
    )
  }

  renderReset() {
    return(
      <Modal
          close={this.toggleResetHandler.bind(this)}
          title="Reset Game"
          id="reset"
          button1={{click: this.toggleResetHandler.bind(this), value: "Close"}}
          button2={{click: this.gameResetHandler.bind(this), value: "Reset game"}}
      />
    )
  }

  renderGameOver() {
    const {status} = this.props.game.game;

    return(
      <Modal
          close={this.closeGameOverHandler.bind(this)}
          title="Game Over"
          id="game-over"
          button1={{click: this.closeGameOverHandler.bind(this), value: "Close"}}
          button2={{click: this.gameOverHandler.bind(this), value: "Yes, play again!"}}
          status={status}
      />
    )
  }

  renderTemp() {
    return(
      <div className="main">
      </div>
    )
  }

  gameResetHandler() {
    this.props.setStatusNew('Waiting for turn');
    this.setState({
      toggleReset: !this.state.toggleReset,
      gameStart: !this.state.gameStart,
      showSetup: !this.state.showSetup,
    })
  }

  gameOverHandler() {
    this.props.setStatusNew('Waiting for turn');
    this.setState({
      gameStart: !this.state.gameStart,
      showSetup: !this.state.showSetup,
      closedGameOver: true
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
          {this.state.showSetup && this.renderSetup()}
          {this.state.toggleReset && this.renderReset()}
          {this.showGameOverModalCheck() && this.renderGameOver()}
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
    fetchGame: (action, body) => dispatch(fetchGame(action, body)),
    setStatusNew: (status) => dispatch(setStatusNew(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrippleTriad);
