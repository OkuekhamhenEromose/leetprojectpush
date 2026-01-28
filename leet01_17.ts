
// 🧩 Problem Recap (Conceptual)

// You’re given multiple axis-aligned rectangles on a 2D plane.

// Each rectangle is defined by:

// bottomLeft[i] = [x₁, y₁]

// topRight[i] = [x₂, y₂]

// Your task:
// 👉 Find the largest square area that can fit inside the overlapping region of at least two rectangles.

// If no rectangles overlap, return 0.

// ✅ High-Level Strategy

// Compare every pair of rectangles.

// Compute their intersection rectangle.

// If they intersect:

// Find the largest square that fits inside that intersection.

// Track the maximum square area found.

// 🔍 Step-by-Step Explanation
// 🔹 Function Signature (Type Safety)
// function largestSquareArea(
//     bottomLeft: number[][],
//     topRight: number[][]
// ): number


// Both inputs are 2D arrays of numbers

// The function returns a number

// TypeScript ensures:

// You don’t pass invalid data

// Arithmetic operations are safe and predictable

// 🔹 Step 1: Count Rectangles
// const n = bottomLeft.length;


// n is the number of rectangles

// Each rectangle i has:

// bottomLeft[i]

// topRight[i]

// 🔹 Step 2: Track Maximum Square Area
// let maxArea = 0;


// Keeps track of the largest square area found

// Defaults to 0 in case no intersection exists

// 🔹 Step 3: Pairwise Rectangle Comparison
// for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {


// Why this structure?

// Every unique pair of rectangles is examined

// Avoids:

// Comparing a rectangle with itself

// Duplicate checks

// 🔹 Step 4: Compute Intersection Boundaries
// const left = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
// const right = Math.min(topRight[i][0], topRight[j][0]);
// const bottom = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
// const top = Math.min(topRight[i][1], topRight[j][1]);


// This determines the overlapping rectangle:

// Boundary	Meaning
// left	Rightmost left edge
// right	Leftmost right edge
// bottom	Highest bottom edge
// top	Lowest top edge

// 📐 This is standard rectangle intersection math.

// 🔹 Step 5: Validate Intersection
// if (left < right && bottom < top) {


// Why this works:

// left < right → positive width

// bottom < top → positive height

// If either fails → no overlap

// 🔹 Step 6: Largest Square Inside Intersection
// const side = Math.min(right - left, top - bottom);


// The intersection is a rectangle

// A square must fit within both dimensions

// The limiting dimension determines square size

// 📌 Square side length = min(width, height)

// 🔹 Step 7: Update Maximum Area
// maxArea = Math.max(maxArea, side * side);


// Compute square area

// Compare with previous best

// Keep the larger value

// 🔹 Step 8: Return Final Result
// return maxArea;


// Returns 0 if no valid square exists

// Otherwise returns the largest square area


// ===================================  CODE STRUCTURE  ==================================
// (1) expfunct largestSquareArea(p){
// (1a) V,v,for(p){for(p){4VMath,if(p&){VMath,=Math}}}
//  (1b) return
// }


export function largestSquareArea(
    bottomLeft: number[][],
    topRight: number[][]
): number{
    const n = bottomLeft.length
    let max_area = 0
    for(let i = 0; i <n; i++){
        for(let j=i+1; j<n; j++){
            const left = Math.max(bottomLeft[i][0], bottomLeft[j][0])
            const right = Math.min(topRight[i][0], topRight[j][0])
            const bottom = Math.max(bottomLeft[i][1], bottomLeft[j][1])
            const top = Math.min(topRight[i][0], topRight[j][0])
            if(left<right && bottom<top){
                const side = Math.min(right - left, top - bottom)
                max_area= Math.max(max_area,side*side)
            }
        }
    }
    return max_area
}













































// export function largestSquareArea(
//     bottomLeft: number[][],
//     topRight: number[][]
// ): number {
//     const n = bottomLeft.length;
//     let maxArea = 0;

//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             const left = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
//             const right = Math.min(topRight[i][0], topRight[j][0]);
//             const bottom = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
//             const top = Math.min(topRight[i][1], topRight[j][1]);

//             if (left < right && bottom < top) {
//                 const side = Math.min(right - left, top - bottom);
//                 maxArea = Math.max(maxArea, side * side);
//             }
//         }
//     }

//     return maxArea;
// }

// 🧠 Core Algorithm (Same in All 3)

// Regardless of language, the logic is identical:

// Compare every pair of rectangles

// Compute their intersection

// If intersection exists:

// Largest square side = min(width, height)

// Area = side²

// Track the maximum area

// 📌 This is a geometry + brute-force pair comparison problem.

// 🐍 Python Solution (Most Expressive)
// class Solution(object):
//     def largestSquareArea(self, bottomLeft, topRight):
//         n = len(bottomLeft)
//         max_area = 0

//         for i in range(n):
//             for j in range(i + 1, n):
//                 left = max(bottomLeft[i][0], bottomLeft[j][0])
//                 right = min(topRight[i][0], topRight[j][0])
//                 bottom = max(bottomLeft[i][1], bottomLeft[j][1])
//                 top = min(topRight[i][1], topRight[j][1])

//                 if left < right and bottom < top:
//                     side = min(right - left, top - bottom)
//                     max_area = max(max_area, side * side)

//         return max_area

// ✅ Strengths

// ✔ Very concise
// ✔ Easy to read and explain
// ✔ Ideal for algorithm interviews

// ❌ Weaknesses

// ✖ No static type checking
// ✖ Runtime errors possible if input shape is wrong

// 🧪 Interview Use

// Best for whiteboard & LeetCode interviews

// 🟨 JavaScript Solution (Flexible, Dynamic)
// var largestSquareArea = function (bottomLeft, topRight) {
//     const n = bottomLeft.length;
//     let maxArea = 0;

//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             const left = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
//             const right = Math.min(topRight[i][0], topRight[j][0]);
//             const bottom = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
//             const top = Math.min(topRight[i][1], topRight[j][1]);

//             if (left < right && bottom < top) {
//                 const side = Math.min(right - left, top - bottom);
//                 maxArea = Math.max(maxArea, side * side);
//             }
//         }
//     }

//     return maxArea;
// };

// ✅ Strengths

// ✔ Familiar to frontend developers
// ✔ No extra boilerplate
// ✔ Works well for online judges

// ❌ Weaknesses

// ✖ No compile-time type safety
// ✖ Silent bugs possible with malformed input

// 🧪 Interview Use

// Common in frontend-focused interviews

// 🔷 TypeScript Solution (Most Robust)
// function largestSquareArea(
//     bottomLeft: number[][],
//     topRight: number[][]
// ): number {
//     const n = bottomLeft.length;
//     let maxArea = 0;

//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             const left = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
//             const right = Math.min(topRight[i][0], topRight[j][0]);
//             const bottom = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
//             const top = Math.min(topRight[i][1], topRight[j][1]);

//             if (left < right && bottom < top) {
//                 const side = Math.min(right - left, top - bottom);
//                 maxArea = Math.max(maxArea, side * side);
//             }
//         }
//     }

//     return maxArea;
// }

// ✅ Strengths

// ✔ Compile-time safety
// ✔ Clear data contracts
// ✔ Ideal for large production systems

// ❌ Weaknesses

// ✖ Slightly more verbose
// ✖ Requires TypeScript setup

// 🧪 Interview Use

// Excellent for senior / production-level interviews

// ⚖️ Side-by-Side Comparison
// Feature	Python	JavaScript	TypeScript
// Readability	⭐⭐⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐
// Type Safety	❌	❌	✅
// Runtime Safety	⚠️	⚠️	✅
// Boilerplate	Minimal	Minimal	Moderate
// Interview Speed	⭐⭐⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐
// Production Readiness	⭐⭐⭐	⭐⭐⭐	⭐⭐⭐⭐⭐
// 🎯 Which Should YOU Use?
// Choose Python if:

// Algorithm / LeetCode interview

// Competitive programming

// Whiteboard explanation

// Choose JavaScript if:

// Frontend interviews

// Quick prototyping

// No strict typing required

// Choose TypeScript if:

// Production-grade systems

// Large teams

// Long-term maintainability

// 💬 Interview One-Liner (Universal)

// “I check every pair of rectangles, compute their intersection, and from that intersection determine the largest square that can fit by taking the minimum of width and height. I track the maximum square area across all pairs.”
