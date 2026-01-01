// 1523. Count Odd Numbers in an Interval Range
// Solved
// Easy
// Topics
// premium lock icon
// Companies
// Hint
// Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).

 

// Example 1:

// Input: low = 3, high = 7
// Output: 3
// Explanation: The odd numbers between 3 and 7 are [3,5,7].
// Example 2:

// Input: low = 8, high = 10
// Output: 1
// Explanation: The odd numbers between 8 and 10 are [9]

// 🧠 COMPREHENSIVE JAVASCRIPT EXPLANATION (as your tutor)

// The task:

// Count how many odd numbers exist between low and high, inclusive.

// Let’s walk through the logic step-by-step.

// ⭐ Step 1 — Understand what odd means

// A number is odd when:

// num % 2 === 1


// Examples: 1, 3, 5, 7 …

// ⭐ Step 2 — Make low start on an odd number

// We want to begin our counting from the first odd number in the range.

// Case A: low is odd

// If low is already odd, keep it.

// Case B: low is even

// The next odd number is:

// low + 1


// In code:

// if (low % 2 === 0) {
//     low += 1;
// }


// Examples:

// low = 8 → becomes 9

// low = 3 → stays 3

// Now low is guaranteed to be odd.

// ⭐ Step 3 — If low > high, there are no odds

// Example:

// low becomes 11, high = 10 → impossible to have any odd numbers

// if (low > high) {
//     return 0;
// }

// ⭐ Step 4 — Count odd numbers using arithmetic

// Since low is now odd, odd numbers follow this pattern:

// low, low+2, low+4, ..., ≤ high


// This is a sequence where:

// first term = low

// difference = 2

// last term ≤ high

// The number of odd numbers is:

// ((high - low) / 2) + 1


// We use Math.floor() because division may not be perfect:

// return Math.floor((high - low) / 2) + 1;

// Example:

// low = 3, high = 7

// (7 - 3) / 2 = 2
// 2 + 1 = 3  → 3 odd numbers: 3,5,7

// ⭐ Final Answer Returned
// return Math.floor((high - low) / 2) + 1;

/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function(low, high) {

    // If low is even, the first odd number is low + 1
    if (low % 2 === 0) {
        low += 1;
    }

    // If after adjusting, low is greater than high, no odd numbers exist
    if (low > high) {
        return 0;
    }

    // Count how many odd numbers exist from low to high (inclusive)
    return Math.floor((high - low) / 2) + 1;
};
