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
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true
    }
  }

  /**
   * Handle click on button inside Square
   * @param {number} i
   */
  handleClick(i) {
    /** Copy the array for modification */
    const squares = this.state.squares.slice()
    squares[i] = this.state.isXNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      isXNext: !this.state.isXNext
    })
  }

  /**
   * Generate square component binded to state.squares
   * @param {number} i
   * @returns `<Square />` component
   */
  renderSquare(i) {
    return (
      <Square
        value={ this.state.squares[i] }
        onClick={ () => this.handleClick(i) }
      />
    )
  }

  render() {
    const status = `Next player: ${this.state.isXNext ? 'X' : 'O'}`;

    return (
      <div>
        <div className="status">
          { status }
        </div>
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
