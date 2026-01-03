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

// ========================  PYTHON TO TYPESCRIPT COMPARISON  =============================
// 🔍 Python ↔ TypeScript: Deep Comparison & Analysis
// 1️⃣ Language Philosophy
// Aspect	Python	TypeScript
// Core idea	Readability & simplicity	Safety on top of JavaScript
// Typing	Dynamic	Static (optional but powerful)
// Runtime	Interpreted	Compiled → JavaScript
// Primary domain	Backend, data, scripting	Frontend + full-stack

// 🔑 Key insight
// Python optimizes for speed of writing
// TypeScript optimizes for correctness & maintainability

// 2️⃣ Type System (Most Important Difference)
// Python
// def add(a, b):
//     return a + b


// ✔ Works with anything
// ❌ Errors only appear at runtime

// TypeScript
// function add(a: number, b: number): number {
//     return a + b;
// }


// ✔ Errors caught before execution
// ✔ IDE autocomplete & refactoring
// ✔ Safer large codebases

// 📌 Why TS wins in big projects

// Prevents silent bugs

// Makes refactoring safe

// Documents intent via types

// 3️⃣ Data Structures Comparison
// Arrays / Lists
// Python	TypeScript
// list	number[], string[]
// arr = [1, 2, 3]

// const arr: number[] = [1, 2, 3];


// TypeScript forces uniform type discipline, Python does not.

// Dictionaries / Objects
// user = {"name": "Charles", "age": 25}

// const user: { name: string; age: number } = {
//     name: "Charles",
//     age: 25
// };


// 🔑 TS objects behave like typed schemas, Python dicts are free-form.

// 4️⃣ Loops (for-in vs for-of – very important)
// Python
// for x in arr:
//     print(x)


// Simple and intuitive.

// TypeScript
// for (const x of arr) {
//     console.log(x);
// }


// 🚨 Critical TS distinction

// for (const i in arr)  // indexes
// for (const v of arr)  // values


// Python hides this complexity; TS exposes it.

// 5️⃣ Functions & Closures
// Python
// def greet(name="Guest"):
//     return f"Hello {name}"

// TypeScript
// function greet(name: string = "Guest"): string {
//     return `Hello ${name}`;
// }


// TS requires explicit return types in professional codebases.

// 6️⃣ Classes & OOP
// Python
// class User:
//     def __init__(self, name):
//         self.name = name

// TypeScript
// class User {
//     constructor(public name: string) {}
// }


// ✔ TS reduces boilerplate
// ✔ Access modifiers (public, private, readonly) are enforced

// 7️⃣ Error Handling
// Python
// try:
//     risky()
// except Exception as e:
//     print(e)

// TypeScript
// try {
//     risky();
// } catch (e) {
//     console.error(e);
// }


// ❗ TypeScript does not type exceptions
// This is one area Python is more flexible.

// 8️⃣ Asynchronous Programming
// Python (async/await)
// async def fetch_data():
//     await get_data()

// TypeScript
// async function fetchData(): Promise<void> {
//     await getData();
// }


// 🔑 TS forces you to think in Promises
// This avoids many async bugs common in JS.

// 9️⃣ Performance Model
// Area	Python	TypeScript
// Execution	Slower	Faster (JS engines)
// CPU tasks	Weak	Strong
// I/O	Excellent	Excellent
// Web apps	Backend	Frontend + backend

// 📌 For algorithms (LeetCode):

// TS often runs faster

// Python is easier to write

// 🔟 Tooling & Ecosystem
// Python

// Django, Flask, FastAPI

// NumPy, Pandas, ML

// Scripting & automation

// TypeScript

// React, Next.js, Angular

// Node.js backends

// Strong IDE support

// 🔑 Hiring reality

// Python → backend / data

// TypeScript → full-stack / frontend-heavy roles

// 1️⃣1️⃣ Interview Perspective
// Criteria	Python	TypeScript
// Speed	⭐⭐⭐⭐⭐	⭐⭐⭐
// Readability	⭐⭐⭐⭐⭐	⭐⭐⭐⭐
// Safety	⭐⭐	⭐⭐⭐⭐⭐
// Scalability	⭐⭐⭐	⭐⭐⭐⭐⭐

// Most interviews:

// Python = faster coding

// TS = shows engineering maturity

// 1️⃣2️⃣ Algorithm Example Comparison (BFS)
// Python
// from collections import deque

// q = deque()
// q.append((0, 0))

// TypeScript
// const queue: [number, number][] = [];
// queue.push([0, 0]);


// Python wins in brevity
// TS wins in type clarity

// 🧠 Final Verdict (Practical)
// When to Use Python

// ✔ Rapid prototyping
// ✔ Algorithms & interviews
// ✔ Backend logic
// ✔ Data processing

// When to Use TypeScript

// ✔ Production web apps
// ✔ Large teams
// ✔ Long-term maintainability
// ✔ Frontend + backend consistency
