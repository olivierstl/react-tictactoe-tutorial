import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={ props.onClick }
    >
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  /**
   * Generate square component binded to state.squares
   * @param {number} i
   * @returns `<Square />` component
   */
  renderSquare(i) {
    return (
      <Square
        value={ this.props.squares[i] }
        onClick={ () => this.props.handleClick(i) }
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * Array of objects.
       * Each one has a key `squares` which represent the board at time T
       */
      history: [{
        squares: Array(9).fill(null)
      }],
      /** `true`: add X to a cell / `false`: add O to a cell */
      isXNext: true
    }
  }

  /**
   * Handle click on button inside Square
   * @param {number} i
   */
  handleClick(i) {
    /** Copy the array for modification */
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    /** If someone won or the square is already taken */
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.isXNext ? 'X' : 'O'

    /** Update Board state */
    this.setState({
      /** Concat better than push : don't edit original array */
      history: history.concat([{
        squares: squares
      }]),
      isXNext: !this.state.isXNext
    })
  }

  render() {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)

    let status
    if (winner) {
      status = `${winner} won`
    } else {
      status = `Next player: ${this.state.isXNext ? 'X' : 'O'}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
