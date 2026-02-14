// 🧠 Tutor-Style Explanation (JavaScript)
// 🔹 What is a Magic Square?

// A k × k magic square must satisfy:

// All row sums are equal

// All column sums are equal

// Both diagonal sums are equal

// ✔ Any 1 × 1 grid is trivially magic.

// 🎯 Problem Strategy

// We want the largest possible k, not just any valid one.

// Key idea:

// 👉 Try the largest square size first and return immediately when found.

// 🚀 Optimization with Prefix Sums

// Checking sums repeatedly would be slow.

// So we precompute:

// Row Prefix Sum
// rowPrefix[i][j] = sum of grid[i][0..j-1]

// Column Prefix Sum
// colPrefix[i][j] = sum of grid[0..i-1][j]


// This allows us to compute any row or column sum in O(1) time.

// 🧩 How the Algorithm Works
// 1️⃣ Try square sizes from largest to smallest
// for (let k = maxSize; k >= 2; k--)


// This guarantees the first valid square is the largest.

// 2️⃣ Slide a k × k window across the grid
// for (let i = 0; i + k <= m; i++)
//     for (let j = 0; j + k <= n; j++)


// Each (i, j) is the top-left corner of a candidate square.

// 3️⃣ Fix a target sum

// Use the first row as the reference:

// const target = getRowSum(i, j, j + k);

// 4️⃣ Validate all rows

// Every row must equal target:

// getRowSum(i + r, j, j + k)

// 5️⃣ Validate all columns

// Every column must equal target:

// getColSum(j + c, i, i + k)

// 6️⃣ Validate diagonals

// Main diagonal:

// grid[i + d][j + d]


// Anti-diagonal:

// grid[i + d][j + k - 1 - d]


// Both must equal target.

// 7️⃣ Return immediately when valid
// return k;


// This ensures maximum size is returned.

// ⏱️ Time & Space Complexity
// Time Complexity

// O(min(m,n) × m × n × k)

// Works well because m, n ≤ 50

// ======================================  CODE STRUCTURE  =========================================
// (1) funct largestMagicSquare(p){2V.length,2V.fromfunct.fill,for(p){for(p){2+}}2Vfunct-,V.min
// (1a) for(p){for(p){for(p){Vcall,v,2for(p){if(call){false}}if(!p){},2vfor(p){++}if(!==){}return}}}
// (1b) return
// }

const largestMagicSquare=(grid)=>{
    const m = grid.length
    const n = grid[0].length
    const rowPrefix = Array.from({length:m}, ()=>Array(n+1).fill(0))
    const colPrefix = Array.from({length:m+1}, ()=>Array(n).fill(0))
    for(let i=0;i<m;i++){
        for(let j = 0;j<n;j++){
            rowPrefix[i][j+1]=rowPrefix[i][j]+grid[i][j]
            colPrefix[i][j+1]=colPrefix[i][j]+grid[i][j]
        }
    }
    const getRowSum = (r,c1,c2)=>rowPrefix[r][c2]-rowPrefix[r][c1] 
    const getColSum = (c,r1,r2)=>colPrefix[c][r2]-colPrefix[c][r1]
    const maxArea = Math.min(m,n)
    for(let k=maxArea;k<=2;k--){
        for(let i = 0; i<k;i++){
            for(let j=0;j<k;j++){
                const target = getRowSum(i,j,j+k)
                let valid = true
                for(let r =0;r<k;r++){
                    if(getRowSum(i+r,j,j+k)!==target){
                        valid=false
                        break
                    }
                    if(!valid) continue
                }
                for(let c =0;r<k;c++){
                    if (getColSum(i+c,j,j+k)!==target){
                        valid=false
                        break
                    }
                    if(!valid)continue
                }
                let diag1=0
                for(let d=0;d<k;d++){
                    diag1=grid[i+d][j+d]
                }
                if(!valid)continue

                let diag2=0
                for(let d=0;d<k;d++){
                    diag2=grid[i+d][j+k-1-d]
                }
                if(diag2!=target)continue

                return k
            }
        }
    }
    return 1
}







































// var largestMagicSquare = function (grid) {
//     const m = grid.length;
//     const n = grid[0].length;

//     // Prefix sums for rows and columns
//     const rowPrefix = Array.from({ length: m }, () => Array(n + 1).fill(0));
//     const colPrefix = Array.from({ length: m + 1 }, () => Array(n).fill(0));

//     // Build prefix sums
//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             rowPrefix[i][j + 1] = rowPrefix[i][j] + grid[i][j];
//             colPrefix[i + 1][j] = colPrefix[i][j] + grid[i][j];
//         }
//     }

//     // Helpers to get row and column sums in O(1)
//     const getRowSum = (r, c1, c2) => rowPrefix[r][c2] - rowPrefix[r][c1];
//     const getColSum = (c, r1, r2) => colPrefix[r2][c] - colPrefix[r1][c];

//     const maxSize = Math.min(m, n);

//     // Try square sizes from largest to smallest
//     for (let k = maxSize; k >= 2; k--) {
//         for (let i = 0; i + k <= m; i++) {
//             for (let j = 0; j + k <= n; j++) {

//                 // Target sum from first row
//                 const target = getRowSum(i, j, j + k);
//                 let valid = true;

//                 // Check all rows
//                 for (let r = 0; r < k; r++) {
//                     if (getRowSum(i + r, j, j + k) !== target) {
//                         valid = false;
//                         break;
//                     }
//                 }
//                 if (!valid) continue;

//                 // Check all columns
//                 for (let c = 0; c < k; c++) {
//                     if (getColSum(j + c, i, i + k) !== target) {
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

//                 // Found the largest possible magic square
//                 return k;
//             }
//         }
//     }

//     // At minimum, 1x1 is always magic
//     return 1;
// };
