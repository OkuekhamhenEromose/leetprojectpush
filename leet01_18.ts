
// 🧠 Tutor-Style Explanation
// 🔹 What Is a Magic Square?

// A k × k magic square must satisfy:

// Every row sum is equal

// Every column sum is equal

// Both diagonal sums are equal

// ✔ Any 1 × 1 square is automatically magic.

// 🎯 Goal

// Given a grid, find the largest possible k such that some k × k subgrid is magic.

// 🚀 Key Optimization: Prefix Sums

// Naively checking all rows and columns repeatedly would be slow.
// We use prefix sums to compute sums in O(1) time.

// Row prefix
// rowPrefix[i][j] = sum of grid[i][0..j-1]

// Column prefix
// colPrefix[i][j] = sum of grid[0..i-1][j]


// This lets us quickly compute:

// Row sum → rowPrefix[r][c2] - rowPrefix[r][c1]

// Column sum → colPrefix[r2][c] - colPrefix[r1][c]

// 🔁 Algorithm Flow
// 1️⃣ Try square sizes from largest to smallest
// for (let k = maxSize; k >= 2; k--)


// This ensures we return early once the largest magic square is found.

// 2️⃣ Slide a k × k window across the grid
// for (let i = 0; i + k <= m; i++)
//     for (let j = 0; j + k <= n; j++)


// Each (i, j) is the top-left corner of a candidate square.

// 3️⃣ Choose a target sum

// We use the first row as the reference:

// const target = rowSum(i, j, j + k);

// 4️⃣ Validate all rows

// Each row must equal target:

// rowSum(i + r, j, j + k) === target

// 5️⃣ Validate all columns

// Each column must equal target:

// colSum(j + c, i, i + k) === target

// 6️⃣ Validate both diagonals

// Main diagonal:

// grid[i + d][j + d]


// Anti-diagonal:

// grid[i + d][j + k - 1 - d]


// Both must equal target.

// 7️⃣ Success → return k

// The first valid k found is the answer, because we search from largest to smallest.

// ⏱️ Complexity Analysis
// Time Complexity

// O(min(m, n) × m × n × k) (acceptable since m, n ≤ 50)

// Space Complexity

// O(m × n) for prefix sums

// ===========================  CODE STRUCTURE ===========================
// (1) expfunct largestMagicSquare(p){2V.length,2V.fromfunct.fill,for(p){for(p){2+}2Vfunct-,V.min}
// (1a) for(p){for(p){for(p){Vcall,v,2for(p){if(call){false}}if(!p){},2vfor(p){++}if(!==){}return}}}
// (1b) return
// }


export function largestMagicSquare(grid: number[][]): number{
    const m: number = grid.length
    const n: number = grid[0].length
    const rowPrefix: number[][] = Array.from({length:m}, ()=> Array(n+1).fill(0))
    const colPrefix: number[][] = Array.from({length:m+1}, ()=>Array(n).fill(0))
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            rowPrefix[i][j+1]=rowPrefix[i][j]+grid[i][j]
            colPrefix[i+1][j]=colPrefix[i][j]+grid[i][j]
        }
    }
    const rowSum=(r:number,c1:number,c2:number): number=>
        rowPrefix[r][c2]-rowPrefix[r][c1]
    const colSum=(c:number,r1:number,r2:number): number=>
        colPrefix[c][r2]-colPrefix[c][r1]
    const maxSize = Math.min(m,n)
    for(let k=maxSize; k>=2;k++){
        for(let i=0;i+k<=m;i++){
            for(let j=0;j+k<=n;j++){
                const target = rowSum(i,j+k,k)
                let valid = true
                for(let r=0; r<k; r++){
                    if(rowSum(i+r,j,j+k)!==target){
                        valid=false
                        break
                    }
                    if(!valid)continue
                }
                for(let c=0; c<k; c++){
                    if(colSum(j+c,i,i+k)!==target){
                        valid=false
                        break
                    }
                    if(!valid)continue
                }
                let diag1=0
                for(let d=0;d<k;d++){
                    diag1=grid[i+d][j+d]
                }
                if(diag1!==target)continue
                let diag2=0
                for(let d=0;d<k;d++){
                    diag2=grid[i+d][j+k-1-d]
                }
                if(diag2!==target)continue
                return k
            }
        }
    }

    return 1
}







































// export function largestMagicSquare(grid: number[][]): number {
//     const m = grid.length;
//     const n = grid[0].length;

//     // Prefix sums for rows and columns
//     const rowPrefix: number[][] = Array.from({ length: m }, () => Array(n + 1).fill(0));
//     const colPrefix: number[][] = Array.from({ length: m + 1 }, () => Array(n).fill(0));

//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             rowPrefix[i][j + 1] = rowPrefix[i][j] + grid[i][j];
//             colPrefix[i + 1][j] = colPrefix[i][j] + grid[i][j];
//         }
//     }

//     // Helpers to get row / column sums in O(1)
//     const rowSum = (r: number, c1: number, c2: number): number =>
//         rowPrefix[r][c2] - rowPrefix[r][c1];

//     const colSum = (c: number, r1: number, r2: number): number =>
//         colPrefix[r2][c] - colPrefix[r1][c];

//     const maxSize = Math.min(m, n);

//     // Try largest size first
//     for (let k = maxSize; k >= 2; k--) {
//         for (let i = 0; i + k <= m; i++) {
//             for (let j = 0; j + k <= n; j++) {

//                 const target = rowSum(i, j, j + k);

//                 // Check rows
//                 let valid = true;
//                 for (let r = 0; r < k; r++) {
//                     if (rowSum(i + r, j, j + k) !== target) {
//                         valid = false;
//                         break;
//                     }
//                 }
//                 if (!valid) continue;

//                 // Check columns
//                 for (let c = 0; c < k; c++) {
//                     if (colSum(j + c, i, i + k) !== target) {
//                         valid = false;
//                         break;
//                     }
//                 }
//                 if (!valid) continue;

//                 // Check main diagonal
//                 let diag1 = 0;
//                 for (let d = 0; d < k; d++) {
//                     diag1 += grid[i + d][j + d];
//                 }
//                 if (diag1 !== target) continue;

//                 // Check anti-diagonal
//                 let diag2 = 0;
//                 for (let d = 0; d < k; d++) {
//                     diag2 += grid[i + d][j + k - 1 - d];
//                 }
//                 if (diag2 !== target) continue;

//                 // Found largest valid magic square
//                 return k;
//             }
//         }
//     }

//     // Every single cell is a 1x1 magic square
//     return 1;
// }


// 🔁 JS ↔ Python ↔ TypeScript Comparison

// Problem: Largest Magic Square

// 🧠 Core Algorithm (Same for All 3)

// All three languages use exactly the same strategy:

// Precompute row and column prefix sums

// Try square sizes from largest → smallest

// Slide a k × k window over the grid

// Check:

// All row sums

// All column sums

// Both diagonals

// Return immediately when the first valid square is found

// 👉 Algorithmic thinking is identical
// 👉 Differences are syntax + typing, not logic

// 🟨 Python Solution (Most Readable)
// Key Characteristics

// Clean, concise syntax

// Minimal boilerplate

// Easy for reasoning & debugging

// Snippet
// rowSum = prefixRow[r][c2] - prefixRow[r][c1]
// colSum = prefixCol[r2][c] - prefixCol[r1][c]

// Pros

// ✔ Very readable
// ✔ Best for interviews & whiteboards
// ✔ Easy prefix sum logic

// Cons

// ❌ Slower than JS/TS for large loops (but OK here)

// 🟦 JavaScript Solution (Performance-Focused)
// Key Characteristics

// Manual arrays

// Faster execution than Python

// No type checking

// Snippet
// const getRowSum = (r, c1, c2) =>
//     rowPrefix[r][c2] - rowPrefix[r][c1];

// Pros

// ✔ Fast
// ✔ Preferred for frontend/full-stack roles
// ✔ Works naturally in LeetCode JS environment

// Cons

// ❌ No type safety
// ❌ Slightly verbose

// 🟩 TypeScript Solution (Production-Grade)
// Key Characteristics

// Same runtime as JavaScript

// Compile-time safety

// Best for large codebases

// Snippet
// function getRowSum(r: number, c1: number, c2: number): number {
//     return rowPrefix[r][c2] - rowPrefix[r][c1];
// }

// Pros

// ✔ Type safety
// ✔ Easier to maintain
// ✔ Ideal for enterprise/frontend roles

// Cons

// ❌ More verbose
// ❌ Slight learning curve

// 🔍 Side-by-Side Feature Comparison
// Feature	Python	JavaScript	TypeScript
// Algorithm	Same	Same	Same
// Prefix Sums	Yes	Yes	Yes
// Type Safety	❌	❌	✅
// Runtime Speed	Medium	Fast	Fast
// Readability	⭐⭐⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐
// Interview Friendly	⭐⭐⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐
// Production Ready	⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐⭐
// 🧑‍🏫 Interview Perspective
// If asked language-agnostic

// Explain the prefix sum optimization and early exit

// If asked Python

// ✔ Emphasize readability
// ✔ Focus on algorithm correctness

// If asked JavaScript

// ✔ Highlight performance
// ✔ Use helper functions

// If asked TypeScript

// ✔ Mention type safety
// ✔ Show scalable thinking

// 🏁 Final Verdict
// Goal	Best Choice
// Fast coding / interviews	Python
// LeetCode + frontend	JavaScript
// Real-world apps	TypeScript

// 👉 All three solve the problem equally well
// 👉 Choice depends on context, not capability