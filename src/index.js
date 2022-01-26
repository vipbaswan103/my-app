import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

class Square extends React.Component {
  render() {
    return (
      <button 
      className="square"
      onClick={() => this.props.onClick()}
      >
      {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      isXNext : true
    };
  };

  calculateWinner(squares) {
    const possibleWinCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i< possibleWinCombinations.length; i++) {
      const combo = possibleWinCombinations[i];
      if(squares[combo[0]] && 
        squares[combo[0]] === squares[combo[1]] && 
        squares[combo[1]] === squares[combo[2]]) {
          return squares[combo[0]];
        }
    }

    return null;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      squares : squares,
      isXNext : !this.state.isXNext
    });
  }
  
  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
