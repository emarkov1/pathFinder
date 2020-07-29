import React from 'react';

import './index.css';

export default function (props) {

    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = props;
    const classes = ['node']
    if (isFinish) classes.push('node-finish')
    if (isStart) classes.push('node-start')
    if (isWall) classes.push('node-wall')

    return (
      <div
        id={`cell-${row}-${col}`}
        className={classes.join(' ')}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
}
