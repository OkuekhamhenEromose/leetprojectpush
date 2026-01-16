

// =================================  JAVASCRIPT  ==================================

// 🧠 Comprehensive Explanation (JavaScript Tutor Style)

// Let’s carefully break this down so the logic is intuitive and memorable.

// 🔲 Problem Insight

// You’re given a grid built from:

// n + 2 horizontal bars

// m + 2 vertical bars

// Each pair of adjacent bars forms a 1×1 cell.

// You may remove only certain bars:

// hBars → horizontal bars you may remove

// vBars → vertical bars you may remove

// Removing consecutive bars creates bigger gaps, which allows for a larger square hole.

// 🎯 Key Observation

// A square hole of side k requires:

// k - 1 consecutive horizontal bars removed

// k - 1 consecutive vertical bars removed

// So the problem becomes:

// ➡️ Find the longest consecutive removable bars in each direction

// 🧩 Step-by-Step Code Logic
// 1️⃣ Sort the Bar Indices
// hBars.sort((a, b) => a - b);
// vBars.sort((a, b) => a - b);


// Why sorting?

// Consecutive bars (like [3,4,5]) must appear next to each other

// Sorting makes detecting adjacency easy

// 2️⃣ Find the Longest Consecutive Sequence
// const longestConsecutive = (arr) => { ... };


// This helper function:

// Scans the sorted array

// Counts how many numbers are consecutive

// Resets when a gap is found

// Example:

// [2,3,4,7] → longest = 3

// 3️⃣ Handle Edge Case (No Bars Removed)
// if (arr.length === 0) return 0;


// No bars removed → no expansion → hole remains 1×1

// 4️⃣ Get Longest Removals
// const maxH = longestConsecutive(hBars);
// const maxV = longestConsecutive(vBars);


// maxH → horizontal removals

// maxV → vertical removals

// 5️⃣ Compute the Square Side
// const side = Math.min(maxH, maxV) + 1;


// Why +1?

// Removing k bars creates k + 1 cells
// Example:

// Remove 2 bars → 3-cell wide gap

// The square must fit both directions, so we take the minimum.

// 6️⃣ Return the Area
// return side * side;


var maximizeSquareHoleArea = function(n, m, hBars, vBars) {

    // Sort both arrays to detect consecutive bars
    hBars.sort((a, b) => a - b);
    vBars.sort((a, b) => a - b);

    // Helper function to find longest consecutive sequence
    const longestConsecutive = (arr) => {
        if (arr.length === 0) return 0;

        let longest = 1;
        let current = 1;

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1] + 1) {
                current++;
                longest = Math.max(longest, current);
            } else {
                current = 1;
            }
        }

        return longest;
    };

    // Find longest removable streaks
    const maxH = longestConsecutive(hBars);
    const maxV = longestConsecutive(vBars);

    // Square side length
    const side = Math.min(maxH, maxV) + 1;

    // Return area
    return side * side;
};


// =========================  PYTHON TO JAVASCRIPT  ================================
// 🐍 Python ↔ 🟨 JavaScript Comparison
// 🧠 Core Idea (Same in Both Languages)

// Sort removable horizontal and vertical bars

// Find the longest consecutive streak in each

// The square side length is
// min(maxHorizontal, maxVertical) + 1

// Return side²

// ✅ Python Solution
// class Solution(object):
//     def maximizeSquareHoleArea(self, n, m, hBars, vBars):

//         hBars.sort()
//         vBars.sort()

//         def longest_consecutive(arr):
//             if not arr:
//                 return 0

//             longest = curr = 1
//             for i in range(1, len(arr)):
//                 if arr[i] == arr[i - 1] + 1:
//                     curr += 1
//                     longest = max(longest, curr)
//                 else:
//                     curr = 1
//             return longest

//         maxH = longest_consecutive(hBars)
//         maxV = longest_consecutive(vBars)

//         side = min(maxH, maxV) + 1
//         return side * side

// ✅ JavaScript Solution
// var maximizeSquareHoleArea = function(n, m, hBars, vBars) {

//     hBars.sort((a, b) => a - b);
//     vBars.sort((a, b) => a - b);

//     const longestConsecutive = (arr) => {
//         if (arr.length === 0) return 0;

//         let longest = 1;
//         let curr = 1;

//         for (let i = 1; i < arr.length; i++) {
//             if (arr[i] === arr[i - 1] + 1) {
//                 curr++;
//                 longest = Math.max(longest, curr);
//             } else {
//                 curr = 1;
//             }
//         }
//         return longest;
//     };

//     const maxH = longestConsecutive(hBars);
//     const maxV = longestConsecutive(vBars);

//     const side = Math.min(maxH, maxV) + 1;
//     return side * side;
// };

// 🔍 Python vs JavaScript Differences
// Aspect	Python	JavaScript
// Sorting	arr.sort()	arr.sort((a,b)=>a-b)
// Empty check	if not arr:	if (arr.length === 0)
// Loop	for i in range(...)	for (let i = 1; ...)
// Max	max(a,b)	Math.max(a,b)
// Function style	Nested function	Arrow function

// ✔️ Logic is identical — only syntax differs.

// 🎯 Interview-Style Explanation
// ❓ Interviewer:

// How would you maximize the area of a square hole after removing bars?

// 🧠 Candidate (Your Answer):

// This problem reduces to finding the largest square of empty cells we can form by removing consecutive bars.

// 🔑 Key Insight

// Removing k consecutive bars creates a gap of size k + 1.

// To form a square:

// We need the same gap size horizontally and vertically

// So the square’s side is:

// min(horizontal_gap, vertical_gap)

// 🧩 Step-by-Step Approach

// Sort removable horizontal and vertical bars

// Scan to find longest consecutive sequence in each

// Compute square side as:

// side = min(maxHorizontal, maxVertical) + 1


// Return:

// area = side × side

// 📌 Example
// hBars = [2,3]  → longest = 2
// vBars = [1,2,3] → longest = 3

// Square side = min(2,3) + 1 = 3
// Area = 9

// ⏱️ Complexity Analysis

// Sorting: O(H log H + V log V)

// Scan: O(H + V)

// Space: O(1)

// Efficient and optimal.

// 🚀 Why This Is a Strong Solution

// Avoids grid simulation (too slow)

// Uses math + sequences

// Clean, readable, scalable

// Interviewers love the pattern recognition

// 🧠 Final Interview One-Liner

// “I reduce the problem to finding the longest consecutive removable bars in each direction and use the smaller one to form the largest possible square.”
