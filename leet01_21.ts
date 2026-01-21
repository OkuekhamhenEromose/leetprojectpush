
// 🧠 Problem Restatement (Instructor Style)

// You are given prime numbers in nums.

// For each number nums[i], you must find the smallest possible integer x such that:

// x OR (x + 1) = nums[i]


// If it’s impossible, return -1 for that index.

// 🔑 Key Bitwise Insights
// 1️⃣ Why EVEN numbers are impossible

// Let’s analyze x OR (x + 1):

// When you add 1 to a number:

// All trailing 1s flip to 0

// The first 0 bit becomes 1

// Therefore, the result of x OR (x + 1) is always odd

// ✅ So:

// If nums[i] is even, it can never be formed

// We immediately return -1

// if ((n & 1) === 0) {
//     ans.push(-1);
// }

// 2️⃣ How x OR (x + 1) is formed

// Example:

// x     =  100111
// x + 1 =  101000
// OR    =  101111


// 📌 Observation:

// The OR result is x plus exactly one extra bit set

// That bit comes from the first zero bit after trailing ones

// 🎯 Strategy to Minimize x

// We want the smallest possible x, so we must:

// Start from n

// Identify which bit was added

// Remove only that bit

// This guarantees:

// x OR (x + 1) = n

// x is minimal

// 🔍 Finding the Correct Bit (Core Logic)
// let bit = 1;
// while ((n & bit) !== 0) {
//     bit <<= 1;
// }

// What this loop does:

// Starts from the least significant bit

// Skips all trailing 1s

// Stops at the first 0 bit

// At that point:

// bit >> 1 is the lowest contributing 1-bit

// Removing it reconstructs the smallest valid x

// ✂️ Constructing the Answer
// ans.push(n - (bit >> 1));


// This:

// Removes exactly one bit

// Ensures correctness and minimality

function constructMinimumBitwiseArray(nums: number[]): number[] {
    const ans: number[] = [];

    for (const n of nums) {
        // If n is even, no solution exists
        if ((n & 1) === 0) {
            ans.push(-1);
            continue;
        }

        // Find the first zero bit after trailing ones
        let bit = 1;
        while ((n & bit) !== 0) {
            bit <<= 1;
        }

        // Remove the lowest contributing 1-bit
        ans.push(n - (bit >> 1));
    }

    return ans;
}

// 🔁 Python ↔ JavaScript ↔ TypeScript Comparison
// 🧠 Core Algorithm (Same in All Languages)

// Regardless of language, the logic is identical:

// Even numbers → impossible

// x OR (x + 1) is always odd

// For odd n

// Find the first zero bit after trailing ones

// Remove the lowest contributing 1-bit

// This gives the minimum valid x

// 🐍 Python Solution
// class Solution(object):
//     def constructMinimumBitwiseArray(self, nums):
//         ans = []

//         for n in nums:
//             if n % 2 == 0:
//                 ans.append(-1)
//                 continue

//             bit = 1
//             while n & bit:
//                 bit <<= 1

//             ans.append(n - (bit >> 1))

//         return ans

// Python Characteristics
// Feature	Explanation
// Typing	Dynamic
// Bit ops	Very clean & readable
// Overflow	❌ Not an issue (big ints)
// Code style	Concise
// Interview feel	Excellent for algorithm discussion
// 🟨 JavaScript Solution
// var constructMinimumBitwiseArray = function(nums) {
//     const ans = [];

//     for (const n of nums) {
//         if ((n & 1) === 0) {
//             ans.push(-1);
//             continue;
//         }

//         let bit = 1;
//         while ((n & bit) !== 0) {
//             bit <<= 1;
//         }

//         ans.push(n - (bit >> 1));
//     }

//     return ans;
// };

// JavaScript Characteristics
// Feature	Explanation
// Typing	Dynamic
// Bit ops	32-bit signed integers
// Overflow	❗ Safe here (numbers ≤ 10⁹)
// Syntax	Slightly more verbose
// Runtime	Very fast
// Interview	Needs explanation of bitwise limits
// 🔷 TypeScript Solution
// function constructMinimumBitwiseArray(nums: number[]): number[] {
//     const ans: number[] = [];

//     for (const n of nums) {
//         if ((n & 1) === 0) {
//             ans.push(-1);
//             continue;
//         }

//         let bit = 1;
//         while ((n & bit) !== 0) {
//             bit <<= 1;
//         }

//         ans.push(n - (bit >> 1));
//     }

//     return ans;
// }

// TypeScript Characteristics
// Feature	Explanation
// Typing	Static (safer)
// Bit ops	Same as JS
// Tooling	Autocomplete & compile-time checks
// Maintainability	⭐⭐⭐⭐⭐
// Interview	Strong “production-ready” impression
// 🧮 Side-by-Side Comparison
// Aspect	Python	JavaScript	TypeScript
// Algorithm	✅ Same	✅ Same	✅ Same
// Bitwise clarity	⭐⭐⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐
// Type safety	❌	❌	✅
// Overflow safety	✅	⚠️ (32-bit)	⚠️ (32-bit)
// Readability	⭐⭐⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐
// Enterprise readiness	⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐⭐
// 🎯 Interview Takeaways
// How to explain this solution in interviews:

// “Since x OR (x + 1) always sets exactly one new bit, for odd numbers we reverse the process by unsetting the lowest contributing bit to get the minimum valid value.”

// Language preference advice:

// 🐍 Python → Best for explaining logic

// 🟨 JavaScript → Competitive programming & LeetCode

// 🔷 TypeScript → Production systems & large teams

// 🚀 Final Recommendation

// Learn in Python

// Practice in JavaScript

// Deploy in TypeScript