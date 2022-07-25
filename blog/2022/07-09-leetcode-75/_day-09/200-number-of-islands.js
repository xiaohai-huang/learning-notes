

/**
 * @param {character[][]} grid
 * @return {number} The number of islands in the grid.
 */
var numIslands = function (grid) {

    function dfs(grid, sr, sc, visited) {
        const START = { row: sr, col: sc }
        const TOP = { row: sr - 1, col: sc }
        const BOTTOM = { row: sr + 1, col: sc };
        const LEFT = { row: sr, col: sc - 1 };
        const RIGHT = { row: sr, col: sc + 1 };
        const POSITIONS = [START, TOP, BOTTOM, LEFT, RIGHT];
        for (let i = 0; i < POSITIONS.length; i++) {
            const position = POSITIONS[i];
            const coordinate = `${position.row}-${position.col}`
            if (visited.has(coordinate)) continue
            if (grid[position.row] !== undefined && grid[position.row][position.col] === "1") {
                visited.add(coordinate);
                dfs(grid, position.row, position.col, visited);
            }
        }

    }
    const visited = new Set();
    let numVisited = -1;
    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === "0") continue
            const coordinate = `${row}-${col}`;
            if (visited.has(coordinate)) continue;
            dfs(grid, row, col, visited)
            if (visited.size > 0 && visited.size !== numVisited) {
                numVisited = visited.size;
                count++;
            }
        }
    }

    return count
};

// explore all 1s at the current region, when the stack is empty, increment numIslands by 1
// start from the water, find the land which has not visited
// if a land is found, exploring all 1s started from the land

function eg1() {
    const grid = [
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"]
    ]

    console.log(numIslands(grid)); // 1
}

function eg2() {
    const grid = [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"]
    ]

    console.log(numIslands(grid)); // 3
}

function eg3() {
    const grid = [["0"]]
    console.log(numIslands(grid)); // 0
}

function eg4() {
    const grid = [
        ["0", "1", "0"],
        ["1", "0", "1"],
        ["0", "1", "0"]]

    console.log(numIslands(grid)); // 4
}


eg1();
eg2();
eg3();
eg4();