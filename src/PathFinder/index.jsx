import React, { Component} from 'react';
import Cell from './Cell';
import './index.css';
import ObjFunctions from './functions'
const functions = ObjFunctions()


export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      visualizing:false
    };
  }
  START_NODE_ROW = 5;
  START_NODE_COL = 5;
  FINISH_NODE_ROW = 18;
  FINISH_NODE_COL = 45;
  componentDidMount() {
    const grid = functions.getInitialGrid.call(this);
    this.setState({grid});
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <button className="start" onClick={() => functions.visualizeDijkstra.call(this)}>
          Find path
        </button>
        <button className="clear" onClick={() => functions.clearBoard.call(this)}>
          Clear
        </button>
        <button onClick={() => functions.generateBoard.call(this)}>
          Generate Walls
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Cell
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => functions.handleMouseDown.call(this,row, col)}
                      onMouseEnter={(row, col) =>
                        functions.handleMouseEnter.call(this,row, col)
                      }
                      onMouseUp={() => functions.handleMouseUp.call(this)}
                      row={row} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
