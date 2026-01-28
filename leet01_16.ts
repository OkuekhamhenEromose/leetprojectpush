// 📘 COMPREHENSIVE EXPLANATION (Tutor Style)
// 1️⃣ Why BigInt is REQUIRED (JS & TS)
// Problem constraints:

// Fence positions up to 10⁹

// Distance squared → 10¹⁸

// JavaScript number is unsafe beyond 2⁵³ ≈ 9e15

// Result:
// const MOD: bigint = 1000000007n;


// ✅ Prevents precision loss
// ✅ Passes large hidden test cases
// ❌ Normal number fails (as you experienced)

// 2️⃣ Adding Boundary Fences
// hFences.push(1, m);
// vFences.push(1, n);


// Why?

// Field edges are fixed

// Removing interior fences creates gaps

// But boundaries define maximum possible distances

// Without this:
// ❌ Missing valid square candidates

// 3️⃣ Sorting Fence Positions
// hFences.sort((a, b) => a - b);
// vFences.sort((a, b) => a - b);


// Why sorting matters:

// Ensures distances are positive

// Allows pairwise subtraction

// Makes logic deterministic

// 4️⃣ Generating All Horizontal Distances
// const hDistances: Set<bigint> = new Set();


// We store:

// Every possible distance between two horizontal fences

// These distances represent possible square heights

// Nested loop logic
// for (let i = 0; i < hFences.length; i++) {
//     for (let j = i + 1; j < hFences.length; j++) {
//         hDistances.add(BigInt(hFences[j] - hFences[i]));
//     }
// }


// Why a Set?

// O(1) lookup

// Avoid duplicates

// Memory efficient for ≤ 602 fences

// 5️⃣ Searching for Matching Vertical Distances
// let maxArea: bigint = -1n;


// Tracks:

// Largest square found so far

// -1n = no square yet

// Vertical loop
// const d: bigint = BigInt(vFences[j] - vFences[i]);


// Each d is:

// A candidate square width

// 6️⃣ Square Validity Check
// if (hDistances.has(d)) {


// This is the key condition:

// Same distance horizontally and vertically ⇒ square possible

// 7️⃣ Area Calculation (BigInt-safe)
// const area = d * d;


// Why BigInt?

// Prevent overflow

// JavaScript numbers would silently give wrong answers

// 8️⃣ Track Maximum Area
// if (area > maxArea) {
//     maxArea = area;
// }


// We only care about the largest square

// 9️⃣ Return Result Correctly
// return maxArea === -1n ? -1 : Number(maxArea % MOD);


// If no square found → -1

// Else:

// Modulo with BigInt

// Convert to number (LeetCode requirement)

// ==========================  CODE STRUCTURE  =============================
// (1) funct maximizeSquareArea(4p){
// (1a) V,2.push,2.sort,Vnew,for(p){for(p){.add}},v,for(p){for(p){}V,if(p){V,if(p)}}return?:

export function maximizeSquareArea(
    m: number,
    n: number,
    hFences: number[],
    vFences: number[]
): number {
    const MOD: bigint = 1000000007n;

    // Add boundary fences (cannot be removed)
    hFences.push(1, m);
    vFences.push(1, n);

    // Sort fence positions
    hFences.sort((a, b) => a - b);
    vFences.sort((a, b) => a - b);

    // Store all possible horizontal distances
    const hDistances: Set<bigint> = new Set();

    for (let i = 0; i < hFences.length; i++) {
        for (let j = i + 1; j < hFences.length; j++) {
            hDistances.add(BigInt(hFences[j] - hFences[i]));
        }
    }

    let maxArea: bigint = -1n;

    // Compare vertical distances
    for (let i = 0; i < vFences.length; i++) {
        for (let j = i + 1; j < vFences.length; j++) {
            const d: bigint = BigInt(vFences[j] - vFences[i]);
            if (hDistances.has(d)) {
                const area = d * d;
                if (area > maxArea) {
                    maxArea = area;
                }
            }
        }
    }

    return maxArea === -1n ? -1 : Number(maxArea % MOD);
}


// 🧠 Core Idea (Same for All 3)

// All three solutions use the exact same algorithm:

// Add boundary fences

// Sort fences

// Compute all possible horizontal distances

// Compute vertical distances

// Find the largest common distance

// Square it and return modulo 1e9 + 7

// Only the language mechanics differ, not the logic.

// 🐍 Python Solution
// 🔑 Key Characteristics

// Python integers are arbitrary precision

// No overflow issues

// Clean and concise

// Example Snippet
// hDistances.add(hFences[j] - hFences[i])
// area = d * d
// return area % MOD

// ✅ Pros

// ✔ No need for BigInt
// ✔ Very readable
// ✔ Mathematically safe by default
// ✔ Excellent for algorithm interviews

// ❌ Cons

// ✖ Slower runtime (nested loops + Python overhead)
// ✖ Less explicit about numeric limits

// 📌 Best For

// Coding interviews

// Competitive programming

// Quick correctness-focused solutions

// 🟨 JavaScript Solution (BigInt-Safe)
// 🔑 Key Characteristics

// Uses BigInt to avoid precision loss

// Explicit numeric control

// Verbose but precise

// Example Snippet
// const MOD = 1000000007n;
// const area = d * d;
// return Number(area % MOD);

// ✅ Pros

// ✔ Safe for very large values
// ✔ Required for real-world JS correctness
// ✔ Accepted by LeetCode

// ❌ Cons

// ✖ Verbose (n suffix everywhere)
// ✖ Cannot mix number and bigint
// ✖ Easier to make mistakes

// 📌 Best For

// JavaScript-heavy environments

// Browser / Node.js coding rounds

// Demonstrating numeric awareness

// 🔷 TypeScript Solution (BigInt-Safe)
// 🔑 Key Characteristics

// Same BigInt logic as JS

// Compile-time type safety

// Most robust solution

// Example Snippet
// const MOD: bigint = 1000000007n;
// const hDistances: Set<bigint> = new Set();

// ✅ Pros

// ✔ Compile-time protection
// ✔ Prevents mixing number & bigint
// ✔ Most professional & scalable
// ✔ Best for large codebases

// ❌ Cons

// ✖ Slightly more verbose
// ✖ Requires understanding TS types

// 📌 Best For

// Production-grade code

// Enterprise interviews

// Full-stack & backend roles

// 📊 Side-by-Side Comparison Table
// Feature	Python	JavaScript (BigInt)	TypeScript (BigInt)
// Overflow safety	✅ Automatic	✅ Manual	✅ Manual + Type safety
// Code verbosity	⭐ Low	❌ High	❌ Medium
// Performance	❌ Slowest	⭐ Faster	⭐ Faster
// Type safety	❌ None	❌ None	✅ Strong
// BigInt required	❌ No	✅ Yes	✅ Yes
// Interview clarity	⭐⭐⭐⭐	⭐⭐⭐	⭐⭐⭐⭐⭐
// Production readiness	⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐⭐
// 🎯 Interview Answer Summary (What to Say)
// If asked “Which solution is best?”

// Python is best for algorithm clarity and speed of development.
// JavaScript needs BigInt to avoid precision bugs.
// TypeScript is the most robust because it enforces BigInt correctness at compile time.