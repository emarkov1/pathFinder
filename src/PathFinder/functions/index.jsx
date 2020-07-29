import { dijkstra, getNodesInShortestPathOrder } from '../../algorithm';

export default function(){
    function getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }
    function handleMouseDown(row, col) {
        if (document.querySelector(`#cell-${row}-${col}`).className.match(/finish|start/)) {
            return
        }
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }
    function handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        if (document.querySelector(`#cell-${row}-${col}`).className.match(/finish|start/)) {
            return
        }
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }
    function handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }
    function clearBoard() {
        if (!this.state.visualizing) {
            let grid = [];
            this.setState({ grid: grid, mouseIsPressed: false });
            setTimeout(() => {
                grid = getInitialGrid.call(this);
                this.setState({ grid });
            }, 0)
        }
    }
    function getInitialGrid(randomized){
        const grid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                let isWall = false
                if (randomized) {
                    let isStartOrFinish = (row === this.START_NODE_ROW && col === this.START_NODE_COL) || (row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL)
                    isWall = Math.random() > 0.7 && !isStartOrFinish
                }
                currentRow.push(createNode.call(this,col, row, isWall));
            }
            grid.push(currentRow);
        }
        return grid;
    };
    function createNode(col, row, isWall){
        return {
            col,
            row,
            isStart: row === this.START_NODE_ROW && col === this.START_NODE_COL,
            isFinish: row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: isWall || false,
            previousNode: null,
        };
    };
    function generateBoard(){
        if (!this.state.visualizing) {
            let grid = [];
            this.setState({ grid: grid, mouseIsPressed: false });
            setTimeout(() => {
                grid = getInitialGrid.call(this,true);
                this.setState({ grid });
            }, 0)
        }
    }
    function visualizeDijkstra() {
        if (!this.state.visualizing) {
            const { grid } = this.state;
            const startNode = grid[this.START_NODE_ROW][this.START_NODE_COL];
            const finishNode = grid[this.FINISH_NODE_ROW][this.FINISH_NODE_COL];
            const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            animateDijkstra.call(this,visitedNodesInOrder, nodesInShortestPathOrder);
        }
    }
    function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        this.setState({ visualizing: true })
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath.call(this,nodesInShortestPathOrder);

                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                let classes = document.getElementById(`cell-${node.row}-${node.col}`).className
                if (!classes.match(/finish|start/)) {
                    document.getElementById(`cell-${node.row}-${node.col}`).className = 'node node-visited'
                }

            }, 10 * i);
        }
    }
    function animateShortestPath(nodesInShortestPathOrder) {

        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                let len = nodesInShortestPathOrder.length
                let classes = document.getElementById(`cell-${node.row}-${node.col}`).className

                if (!classes.match(/finish|start/)) {
                    document.getElementById(`cell-${node.row}-${node.col}`).className = 'node node-shortest-path'
                }

                if (i === len - 1) this.setState({ visualizing: false })
            }, 50 * i);
        }
    }
    return { handleMouseDown, getNewGridWithWallToggled, handleMouseEnter, handleMouseUp,
         clearBoard, getInitialGrid, createNode, generateBoard, visualizeDijkstra,
        animateDijkstra, animateShortestPath}
}