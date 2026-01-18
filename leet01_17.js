
// 🧩 Problem Restatement (Simple Terms)

// You are given several axis-aligned rectangles.

// Each rectangle is described by:

// a bottom-left point

// a top-right point

// Your goal:
// 👉 Find the largest possible square that can fit inside the overlapping region of at least two rectangles.

// If no two rectangles overlap, return 0.

// 🧠 Key Insight

// A square can only exist inside an intersection of rectangles.

// So the plan is:

// Check every pair of rectangles

// Compute their intersection

// If the intersection exists:

// Find the largest square inside it

// Track the maximum square area

// 🔍 Detailed Explanation (Line by Line)
// 🔹 Step 1: Number of rectangles
// const n = bottomLeft.length;


// n is how many rectangles we have.

// Each rectangle uses:

// bottomLeft[i] = [x, y]

// topRight[i] = [x, y]

// 🔹 Step 2: Track the best square area
// let maxArea = 0;


// Stores the largest square area found so far

// Starts at 0 in case no square is possible

// 🔹 Step 3: Compare all rectangle pairs
// for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {


// Why this loop structure?

// We check every unique pair

// Avoids:

// Comparing a rectangle with itself

// Duplicate comparisons (A–B and B–A)

// 🔹 Step 4: Compute intersection boundaries
// const left = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
// const right = Math.min(topRight[i][0], topRight[j][0]);
// const bottom = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
// const top = Math.min(topRight[i][1], topRight[j][1]);


// This calculates the overlapping rectangle:

// Variable	Meaning
// left	Rightmost left boundary
// right	Leftmost right boundary
// bottom	Highest bottom boundary
// top	Lowest top boundary

// 📌 This is the standard formula for rectangle intersection.

// 🔹 Step 5: Check if rectangles overlap
// if (left < right && bottom < top) {


// Why this condition?

// left < right → overlap width > 0

// bottom < top → overlap height > 0

// If either fails → no intersection

// 🔹 Step 6: Find the largest square in the overlap
// const side = Math.min(right - left, top - bottom);


// Explanation:

// The overlap is a rectangle

// The largest square must fit in both dimensions

// The limiting dimension is the smaller one

// 📐 Square side = min(width, height)

// 🔹 Step 7: Update maximum square area
// maxArea = Math.max(maxArea, side * side);


// Compute square area

// Compare with the best seen so far

// Keep the maximum

// 🔹 Step 8: Return the result
// return maxArea;


// Returns 0 if no overlapping pair exists

// Otherwise, returns the largest square area found

var largestSquareArea = function (bottomLeft, topRight) {
    const n = bottomLeft.length;
    let maxArea = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const left = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
            const right = Math.min(topRight[i][0], topRight[j][0]);
            const bottom = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
            const top = Math.min(topRight[i][1], topRight[j][1]);

            if (left < right && bottom < top) {
                const side = Math.min(right - left, top - bottom);
                maxArea = Math.max(maxArea, side * side);
            }
        }
    }

    return maxArea;
};
