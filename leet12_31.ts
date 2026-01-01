// Code
// Testcase
// Test Result
// Test Result
// 1970. Last Day Where You Can Still Cross
// Solved
// Hard
// Topics
// premium lock icon
// Companies
// Hint
// There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.

// Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).

// You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).

// Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

 

// Example 1:


// Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
// Output: 2
// Explanation: The above image depicts how the matrix changes each day starting from day 0.
// The last day where it is possible to cross from top to bottom is on day 2.
// Example 2:


// Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
// Output: 1
// Explanation: The above image depicts how the matrix changes each day starting from day 0.
// The last day where it is possible to cross from top to bottom is on day 1.
// Example 3:


// Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
// Output: 3
// Explanation: The above image depicts how the matrix changes each day starting from day 0.
// The last day where it is possible to cross from top to bottom is on day 3

// ============================  TYPESCRIPT  ======================
// 🧠 Comprehensive Explanation (TypeScript Tutor Style)

// Let’s understand what we’re solving, why this approach works, and how each part of the code fits together.

// 🔍 Problem Insight

// The grid starts entirely as land

// Every day, one cell becomes water

// You can walk up, down, left, right

// Goal: find the last day you can walk from top row → bottom row using only land

// Key observation:

// Once it becomes impossible to cross, it will never become possible again.

// This gives us a monotonic condition, which is the biggest hint that binary search is the right tool.

// 🧩 High-Level Strategy

// We combine two ideas:

// Binary Search on the Answer (Days)

// BFS (Breadth-First Search) to check if crossing is possible

// 🪜 Step 1: Binary Search on Days

// We search between:

// 1 → first day

// cells.length → last possible day

// For each mid-day:

// If crossing is possible → try later days

// If not → try earlier days

// This narrows down the last valid day efficiently.

// 🚶 Step 2: Checking If Crossing Is Possible (BFS)

// For a given day:

// 1️⃣ Build the grid
// const grid: number[][] = ...


// 0 = land

// 1 = water or visited

// We flood the first day cells.

// 2️⃣ Start BFS from the top row
// for (let c = 0; c < col; c++) {
//     if (grid[0][c] === 0) {
//         queue.push([0, c]);
//         grid[0][c] = 1;
//     }
// }


// Why?

// You can start from any land cell in the top row

// 3️⃣ BFS Traversal
// while (head < queue.length) {


// Move in 4 directions

// Only visit land

// Mark visited cells as 1 to avoid revisits

// If we ever reach:

// if (r === row - 1) return true;


// 🎉 Crossing is possible!

// 🔁 Why BFS Works Here

// This is a connectivity problem

// BFS explores all reachable land efficiently

// Guarantees shortest exploration without missing paths

// ⏱️ Time & Space Complexity
// Part	Complexity
// BFS	O(row × col)
// Binary Search	O(log(row × col))
// Total	O(row × col × log(row × col))

// ✔ Efficient enough for large constraints
// ✔ Industry-standard approach

// 🧪 Example Walkthrough

// Example 1

// row = 2, col = 2
// cells = [[1,1],[2,1],[1,2],[2,2]]


// Day 1 → path exists

// Day 2 → path exists

// Day 3 → path blocked

// ➡ Answer = 2

function latestDayToCross(row: number, col: number, cells: number[][]): number {
    // Directions: down, up, right, left
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    // Helper function: checks if crossing is possible on `day`
    const canCross = (day: number): boolean => {
        // Build grid: 0 = land, 1 = water
        const grid: number[][] = Array.from({ length: row }, () =>
            Array(col).fill(0)
        );

        // Flood cells up to `day`
        for (let i = 0; i < day; i++) {
            const [r, c] = cells[i];
            grid[r - 1][c - 1] = 1;
        }

        // Queue for BFS
        const queue: [number, number][] = [];

        // Start BFS from all land cells in top row
        for (let c = 0; c < col; c++) {
            if (grid[0][c] === 0) {
                queue.push([0, c]);
                grid[0][c] = 1; // mark visited
            }
        }

        let head = 0;
        while (head < queue.length) {
            const [r, c] = queue[head++];
            
            // If we reach the bottom row, crossing is possible
            if (r === row - 1) return true;

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (
                    nr >= 0 &&
                    nr < row &&
                    nc >= 0 &&
                    nc < col &&
                    grid[nr][nc] === 0
                ) {
                    grid[nr][nc] = 1; // mark visited
                    queue.push([nr, nc]);
                }
            }
        }

        return false;
    };

    // Binary search on the day
    let left = 1;
    let right = cells.length;
    let answer = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canCross(mid)) {
            answer = mid;      // crossing possible → try later days
            left = mid + 1;
        } else {
            right = mid - 1;   // crossing not possible → try earlier days
        }
    }

    return answer;
}
