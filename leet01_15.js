

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
