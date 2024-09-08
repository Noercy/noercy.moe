import { useEffect, useState } from 'react';

type Dot = {
    id: string; 
    row: number;
    column: number;
    color: string;
}

type Grid = {
    grid: {
        rows: number; 
        columns: number; 
    }
    dots: Dot[];
}

type Cell = {
    filled: boolean;
    color?: string;
    spawnDot?: boolean;
};

const gridMap: Grid = {
    "grid": {
        "rows": 5,
        "columns": 5
    },
    "dots": [
        {
            "id": "dot1",
            "row": 0,
            "column": 0,
            "color": "red"
        },
        {
            "id": "dot2",
            "row": 0,
            "column": 4,
            "color": "red"
        },
        {
            "id": "dot3",
            "row": 3,
            "column": 4,
            "color": "blue"
        },
        {
            "id": "dot4",
            "row": 4,
            "column": 1,
            "color": "blue"
        } 
    ]
};

const Grid: React.FC = () => {
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [draggingDot, setDraggingDot] = useState<Dot | null>(null);
    const [currentPath, setCurrentPath] = useState<{ row: number; column: number }[]>([]);


  
    useEffect(() => {
        initializeGrid();
      }, []);
    
    const initializeGrid = () => {
        // Initialize the grid with empty cells
        const initialGrid: Cell[][] = Array.from({ length: gridMap.grid.rows }, () =>
          Array.from({ length: gridMap.grid.columns }, () => ({ filled: false }))
        );
    
        // Place the dots based on the JSON data
        gridMap.dots.forEach(dot => {
          if (dot.row < gridMap.grid.rows && dot.column < gridMap.grid.columns) {
            initialGrid[dot.row][dot.column] = { filled: true, color: dot.color, spawnDot: true };
          }
        });
    
        setGrid(initialGrid);
    };
    
   
    const resetPath = (color: string) => {
        const newGrid = grid.map(row =>
            row.map(cell => (cell.color === color ? { filled: false } : cell))
          );
      
          // Retain original dots
          gridMap.dots.forEach(dot => {
            if (dot.color === color) {
              newGrid[dot.row][dot.column] = { filled: true, color: dot.color };
            }
          });
      
          setGrid(newGrid);
    }

    // click down
    const handleMouseDown = (dot: Dot) => {
        resetPath(dot.color);
        setDraggingDot(dot);
        setCurrentPath([{ row: dot.row, column: dot.column }]);
    };

    // release click
    const handleMouseUp = () => {
        setDraggingDot(null);
        setCurrentPath([]);
    };

    const handleMouseMove = (row: number, column: number) => {
        if (!draggingDot) return;

        const lastPosition = currentPath[currentPath.length - 1];
    
        if (!lastPosition) {
            // If there is no lastPosition, add the initial position and return
            setCurrentPath([{ row, column }]);
            return;
        }
    
        // Check if the move is to an adjacent cell
        const isAdjacent = Math.abs(row - lastPosition.row) + Math.abs(column - lastPosition.column) === 1;
    
        if (isAdjacent) {
            const newGrid = grid.map(row => row.slice()); // Copy the current grid
            const currentCell = newGrid[row][column];
      
            if (currentCell.filled && currentCell.color === draggingDot.color) {
              // Retrace logic: if the cell was already part of the path, remove it
              if (row === draggingDot.row && column === draggingDot.column) return; // Skip the original dot
      
              newGrid[row][column] = { filled: false };
              setCurrentPath(prevPath => prevPath.slice(0, -1)); // Remove last step from path
            } else if (!currentCell.filled) {
              // Move forward
              newGrid[row][column] = { filled: true, color: draggingDot.color };
              setCurrentPath([...currentPath, { row, column }]);
            }
      
            setGrid(newGrid);
          }
    }



    // render the base grid with inputted stats
    const renderGrid = () => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridMap.grid.columns}, 50px)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    border: '1px solid #ddd',
                    backgroundColor: cell.filled ? cell.color : 'white',
                  }}
                  onMouseDown={() => {
                    const dot = gridMap.dots.find(d => d.row === rowIndex && d.column === columnIndex);
                    if (dot) handleMouseDown(dot);
                  }}
                  onMouseMove={(e) => {
                    if (e.buttons === 1) { // Check if the left mouse button is held down
                      handleMouseMove(rowIndex, columnIndex);
                    }
                  }}
                  onMouseUp={handleMouseUp}
                />
              ))
            )}
          </div>
        );
    };
        return <div>{renderGrid()}</div>;
    };

export default Grid;
