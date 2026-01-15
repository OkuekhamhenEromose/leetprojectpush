// 1458. Max Dot Product of Two Subsequences
// Solved
// Hard
// Topics
// premium lock icon
// Companies
// Hint
// Given two arrays nums1 and nums2.

// Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

// A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

 

// Example 1:

// Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
// Output: 18
// Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
// Their dot product is (2*3 + (-2)*(-6)) = 18.
// Example 2:

// Input: nums1 = [3,-2], nums2 = [2,-6,7]
// Output: 21
// Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
// Their dot product is (3*7) = 21.
// Example 3:

// Input: nums1 = [-1,-1], nums2 = [1,1]
// Output: -1
// Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
// Their dot product is -1.


// 🧠 Instructor-Level Explanation (Step by Step)
// 🔍 Problem Insight

// You are given two arrays:

// You must choose non-empty subsequences

// The subsequences must have the same length

// You want to maximize the dot product

// Key difficulty:

// Negative numbers exist, so choosing more elements is not always better.

// This means:

// Greedy approaches fail ❌

// Classic subsequence DP must be modified ❌

// We must force at least one pair to be chosen ✅

// 📐 Why Dynamic Programming?

// At each position (i, j) we must decide:

// Do we pair nums1[i] with nums2[j]?

// Or do we skip one of them?

// This naturally leads to a 2D DP table.

// 🧮 DP Definition
// State
// dp[i][j]


// 👉 The maximum dot product using:

// nums1[0..i-1]

// nums2[0..j-1]

// with at least one pair chosen

// 🚨 Why initialize with -Infinity?

// Because:

// Subsequence must be non-empty

// Initializing with 0 would incorrectly allow “choosing nothing”

// Array(m + 1).fill(-Infinity)


// This forces at least one multiplication to occur.

// 🔁 Transition Logic (The Core)

// At position (i, j):

// const product = nums1[i - 1] * nums2[j - 1];


// We have 4 choices:

// 1️⃣ Start a NEW subsequence
// product


// Useful when previous values are negative.

// 2️⃣ Extend an EXISTING subsequence
// dp[i - 1][j - 1] + product

// 3️⃣ Skip current element in nums1
// dp[i - 1][j]

// 4️⃣ Skip current element in nums2
// dp[i][j - 1]

// ✅ Final transition
// dp[i][j] = Math.max(
//     product,
//     dp[i - 1][j - 1] + product,
//     dp[i - 1][j],
//     dp[i][j - 1]
// );


// This guarantees:

// Correct handling of negatives

// Non-empty subsequence

// Optimal dot product

// 📊 Example Walkthrough
// Example 3
// nums1 = [-1, -1]
// nums2 = [1, 1]


// Possible products:

// -1 × 1 = -1

// Best choice:

// [-1] · [1] = -1


// DP correctly returns -1, not 0.

// ⏱️ Complexity Analysis
// Metric	Value
// Time	O(n × m)
// Space	O(n × m)
// Constraints	Efficient for limits
// 🧠 Key Takeaways (Interview Gold)

// ✔ Non-empty subsequence constraint
// ✔ Negative numbers handled correctly
// ✔ DP state carefully designed
// ✔ No greedy shortcuts

// 🏁 Final Result
// return dp[n][m];


// This gives the maximum dot product of valid subsequences.

// ================================  CODE STRUCTURE  ===============================
// (1) function maxDotProduct(2p){2V,V:.from=>.fill
// (1a) for(p){for(p){V*,=.max(4)}}
// return}

function maxDotProduct(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    const m = nums2.length;

    // dp[i][j] = maximum dot product using
    // nums1[0..i-1] and nums2[0..j-1] with non-empty subsequences
    const dp: number[][] = Array.from({ length: n + 1 }, () =>
        Array(m + 1).fill(-Infinity)
    );

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const product = nums1[i - 1] * nums2[j - 1];

            // Either:
            // 1. Start a new subsequence with this pair
            // 2. Extend an existing subsequence
            // 3. Skip nums1[i-1]
            // 4. Skip nums2[j-1]
            dp[i][j] = Math.max(
                product,
                dp[i - 1][j - 1] + product,
                dp[i - 1][j],
                dp[i][j - 1]
            );
        }
    }

    return dp[n][m];
}


// 🧠 Problem Recap (Language-Independent)

// We want:

// Non-empty subsequences

// Same length

// Maximum dot product

// Negative values allowed

// This forces a Dynamic Programming solution in both Python and TypeScript.

// ✅ Core DP Idea (Same in Both Languages)
// Concept	Meaning
// dp[i][j]	Max dot product using nums1[0..i-1] and nums2[0..j-1]
// Initialize with -∞	Prevent empty subsequences
// Transition	Take pair, extend, or skip
// 🐍 Python Implementation
// class Solution(object):
//     def maxDotProduct(self, nums1, nums2):
//         n, m = len(nums1), len(nums2)

//         dp = [[float('-inf')] * (m + 1) for _ in range(n + 1)]

//         for i in range(1, n + 1):
//             for j in range(1, m + 1):
//                 product = nums1[i - 1] * nums2[j - 1]

//                 dp[i][j] = max(
//                     product,
//                     dp[i - 1][j - 1] + product,
//                     dp[i - 1][j],
//                     dp[i][j - 1]
//                 )

//         return dp[n][m]

// 🟦 TypeScript Implementation
// function maxDotProduct(nums1: number[], nums2: number[]): number {
//     const n = nums1.length;
//     const m = nums2.length;

//     const dp: number[][] = Array.from(
//         { length: n + 1 },
//         () => Array(m + 1).fill(-Infinity)
//     );

//     for (let i = 1; i <= n; i++) {
//         for (let j = 1; j <= m; j++) {
//             const product = nums1[i - 1] * nums2[j - 1];

//             dp[i][j] = Math.max(
//                 product,
//                 dp[i - 1][j - 1] + product,
//                 dp[i - 1][j],
//                 dp[i][j - 1]
//             );
//         }
//     }

//     return dp[n][m];
// }

// 🔁 Side-by-Side Comparison
// Feature	Python	TypeScript
// Function	def maxDotProduct()	function maxDotProduct()
// Matrix init	List comprehension	Array.from()
// Negative infinity	float('-inf')	-Infinity
// Loop syntax	for i in range()	for (let i = 0...)
// Max function	max()	Math.max()
// Typing	Dynamic	Static (number[])
// 🔍 Key Differences Explained
// 1️⃣ Array Initialization

// Python

// dp = [[-inf] * (m + 1) for _ in range(n + 1)]


// TypeScript

// Array.from({ length: n + 1 }, () => Array(m + 1).fill(-Infinity))


// ✔ TS requires explicit array construction
// ✔ Python list comprehensions are shorter

// 2️⃣ Type Safety
// Python	TypeScript
// Flexible, dynamic	Strict, compile-time checked
// Faster to write	Safer for large apps
// 3️⃣ Math Constants
// Python	TypeScript
// float('-inf')	-Infinity

// Both serve the same purpose: block empty subsequences

// 4️⃣ Runtime Behavior
// Aspect	Python	TypeScript
// Execution	Interpreted	Compiled (V8)
// Performance	Slightly slower	Faster in browsers
// Interview use	Very common	Increasingly common
// 🧠 Mental Translation Trick

// If you understand the Python DP → you understand the TypeScript DP

// Only change:

// Syntax

// Array creation

// Typing

// The algorithm is identical.

// 📌 When to Use Each
// Scenario	Recommended
// LeetCode / Interviews	Python
// Frontend / Full-stack	TypeScript
// Large-scale systems	TypeScript
// Fast prototyping	Python