import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function range(x, y){
  const range = [];
  for(var i = x; i < y; i++){
    range.push(i);
  }
  return range;
}

class App extends Component {
  render() {
    return (
      <GameBoard width={40} height={30}/>
    );
  }
}

class GameBoard extends Component {

  constructor(props){
    super(props);

    this.state = {
      cellStates: range(0, this.props.height).map((row) => {
        return range(0, this.props.width).map((col) => {
          return {
            row: row,
            col: col,
            isAlive: Math.random() < 0.2,
          }
        })
      })
    }
    this.setCellAlive.bind(this);
  }

  componentDidMount(){
    setInterval(()=>{
      const flatCellList = [];
      this.state.cellStates.forEach((row) => {
        row.forEach((cell) => {
          flatCellList.push(cell);
        })
      })
      this.setState({
        cellStates: this.state.cellStates.map((row) => {
          return row.map((cell) => {
            var newLiveState = cell.isAlive;
            const surroundingCells = flatCellList.filter((otherCell) => {
              return  (otherCell.row === cell.row - 1) && (otherCell.col === cell.col - 1)    ||
                      (otherCell.row === cell.row - 1) && (otherCell.col === cell.col)        ||
                      (otherCell.row === cell.row - 1) && (otherCell.col === cell.col + 1)    ||
                      (otherCell.row === cell.row) && (otherCell.col === cell.col - 1)        ||
                      (otherCell.row === cell.row) && (otherCell.col === cell.col + 1)        ||
                      (otherCell.row === cell.row + 1) && (otherCell.col === cell.col - 1)    ||
                      (otherCell.row === cell.row + 1) && (otherCell.col === cell.col)        ||
                      (otherCell.row === cell.row + 1) && (otherCell.col === cell.col + 1);
            });
            var aliveNabourCount = surroundingCells.filter(otherCell=>otherCell.isAlive).length;
            if(cell.isAlive){
              if(aliveNabourCount < 2) newLiveState = false;
              else if(aliveNabourCount === 2 || aliveNabourCount === 3) newLiveState = true;
              else if(aliveNabourCount > 3) newLiveState = false;
            } else {
              if(aliveNabourCount === 3) newLiveState = true;
            }
            return {
              row: cell.row,
              col: cell.col,
              isAlive: newLiveState,
            }
          })
        })
      })
    }, 100);
  }

  setCellAlive(cell){
    const flatCellList = [];
    this.state.cellStates.forEach((row) => {
      row.forEach((cell) => {
        flatCellList.push(cell);
      })
    })
  }

  render(){
    return (
      <div>
        {
          this.state.cellStates.map((row) => {
            return (
              <div>
                {
                  row.map((cell) => {
                    return (
                      <span
                        onClick={this.setCellAlive(cell)}
                        style={{
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          height: "30px",
                          border: "solid 1px grey",
                          backgroundColor: cell.isAlive ? "green" : "black",
                      }}/>
                      )
                    })
                  }
                </div>
              )
            })
        }
      </div>
    )
  }
}

export default App;
