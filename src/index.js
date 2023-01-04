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
        onClick={ () => this.props.onClick(i) }
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
      /** Step of history displayed */
      stepNumber: 0,
      /** `true`: add X to a cell / `false`: add O to a cell */
      isXNext: true
    }
  }

  /**
   * Handle click on button inside Square
   * @param {number} i
   */
  handleClick(i) {
    /**
     * Copy the array for modification.
     * Slice it with stepNumber to remove potential extra moves
     */
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    /** If someone won or the square is already taken */
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.isXNext ? 'X' : 'O'

    const column = getCellColumn(i) 
    const row = getCellRow(i) 

    /** Update Board state */
    this.setState({
      /** Concat better than push : don't edit original array */
      history: history.concat([{
        squares: squares,
        move: {
          row: row,
          column: column
        }
      }]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isXNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move
        ? <span>Back to <b>round {move}</b> ({step.move.column}, {step.move.row})</span>
        : `Restart game`
      
        return (
          <li key={move}>
            <button
              onClick={ () => this.jumpTo(move) }
            >
              { desc }
            </button>
          </li>
        )
    })

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
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

function getCellColumn(cellIndex) {
  const columns = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]

  return columns.findIndex(column => column.includes(cellIndex)) + 1
}

function getCellRow(cellIndex) {
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]

  return rows.findIndex(row => row.includes(cellIndex)) +1
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
