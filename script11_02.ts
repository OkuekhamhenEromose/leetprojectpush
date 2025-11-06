// 2257. Count Unguarded Cells in the Grid
// Solved
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// You are given two integers m and n representing a 0-indexed m x n grid. You are also given two 2D integer arrays guards and walls where guards[i] = [rowi, coli] and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.

// A guard can see every cell in the four cardinal directions (north, east, south, or west) starting from their position unless obstructed by a wall or another guard. A cell is guarded if there is at least one guard that can see it.

// Return the number of unoccupied cells that are not guarded.

 

// Example 1:


// Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
// Output: 7
// Explanation: The guarded and unguarded cells are shown in red and green respectively in the above diagram.
// There are a total of 7 unguarded cells, so we return 7.
// Example 2:


// Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
// Output: 4
// Explanation: The unguarded cells are shown in green in the above diagram.
// There are a total of 4 unguarded cells, so we return 4.

// ✅ Step-by-Step Breakdown (Like a Tutor Would Teach)
// 🎯 Step 1: Create the Grid

// We first create a 2D matrix representing every cell in the grid.

// 0 → Empty

// 1 → Guard

// 2 → Wall

// 3 → Guarded by a guard’s line of sight

// const grid = Array.from({ length: m }, () => Array(n).fill(0));

// 🎯 Step 2: Place Guards and Walls on the Grid
// for (const [r, c] of guards) {
//     grid[r][c] = 1;
// }

// for (const [r, c] of walls) {
//     grid[r][c] = 2;
// }


// At this point, we know the exact fixed obstacles.

// 🎯 Step 3: Define Movement Directions

// Guards can look in 4 straight directions: up, right, down, left.

// const directions = [
//     [-1, 0],
//     [0, 1],
//     [1, 0],
//     [0, -1]
// ];

// 🎯 Step 4: Simulate Guard Vision

// For each guard:

// Look in each direction.

// Move step-by-step (like rays of light).

// Stop if:

// You hit a grid boundary.

// You hit a wall (2).

// You hit another guard (1).

// If you see an empty cell (0), mark it as guarded → 3.

// while (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] !== 2 && grid[r][c] !== 1) {
//     if (grid[r][c] === 0) {
//         grid[r][c] = 3;
//     }
//     r += dr;
//     c += dc;
// }

// 🎯 Step 5: Count Unguarded Cells

// Finally, loop through grid cells. Count only cells still marked 0 (empty + not seen).

// if (grid[i][j] === 0) {
//     count++;
// }

// ====================================  CODE STRUCTURE  ====================================
// (1) funct countUnguarded(4p){V.from((p)functArray(p).fill)}=>create 2D matrix representing every cell in the grid;for empty,guard,wall,guarded
// (1a) forof(p){=}=>place guards
// (1b) forof(p){=}=>place walls
// (1c) V(4[])=>up,right,down.left
// (1d) forof(p){forof(p){2v,while(&p){if(p===){=}2++}}}=>simulate/create guard visibility,continue in direction until out of bounds, wall or another guard
// (1e) v,for(p){for(p){if(p===){++}}}=>count unguarded empty cells
// (1f) return


function countUnguarded(m: number, n: number, guards: number[][], walls: number[][]): number {
    // Create grid where:
    // 0 = empty, 1 = guard, 2 = wall, 3 = guarded
    const grid = Array.from({ length: m }, () => Array(n).fill(0));

    // Place guards
    for (const [r, c] of guards) {
        grid[r][c] = 1;
    }

    // Place walls
    for (const [r, c] of walls) {
        grid[r][c] = 2;
    }

    // Directions: up, right, down, left
    const directions = [
        [-1, 0], // up
        [0, 1],  // right
        [1, 0],  // down
        [0, -1]  // left
    ];

    // Simulate/create guard visibility
    for (const [gr, gc] of guards) {
        for (const [dr, dc] of directions) {
            let r = gr + dr;
            let c = gc + dc;

            // Continue in direction until out of bounds, wall, or another guard
            while (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] !== 2 && grid[r][c] !== 1) {
                if (grid[r][c] === 0) {
                    grid[r][c] = 3; // Mark as guarded
                }
                r += dr;
                c += dc;
            }
        }
    }

    // Count unguarded empty cells
    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                count++;
            }
        }
    }

    return count;
}
