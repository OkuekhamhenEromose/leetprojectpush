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

    // Simulate guard visibility
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
