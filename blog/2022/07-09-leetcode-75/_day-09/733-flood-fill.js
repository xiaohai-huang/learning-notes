/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color, visited = new Set()) {
    const startingPixel = image[sr][sc];
    // any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel
    // top, bottom, left, right
    const START = { row: sr, col: sc }
    const TOP = { row: sr - 1, col: sc }
    const BOTTOM = { row: sr + 1, col: sc };
    const LEFT = { row: sr, col: sc - 1 };
    const RIGHT = { row: sr, col: sc + 1 };
    const PIXELS = [START, TOP, BOTTOM, LEFT, RIGHT];
    // Replace the color of all of the aforementioned pixels with color.
    PIXELS.forEach(neighbor => {
        const position = `${neighbor.row}-${neighbor.col}`
        if (visited.has(position)) return;
        // should have the same color as the starting pixel
        if (image[neighbor.row] !== undefined && image[neighbor.row][neighbor.col] === startingPixel) {
            visited.add(position)
            floodFill(image, neighbor.row, neighbor.col, color, visited);
            image[neighbor.row][neighbor.col] = color;
        }
    })
    return image
};

function eg1() {
    const image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr = 1, sc = 1, color = 2
    console.log(floodFill(image, sr, sc, color))
}

function eg2() {
    const image = [[0, 0, 0], [0, 1, 0]], sr = 1, sc = 1, color = 2;
    console.log(floodFill(image, sr, sc, color))
}

eg1()
eg2()