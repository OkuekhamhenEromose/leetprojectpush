// 3432. Count Partitions with Even Sum Difference
// Solved
// Easy
// Topics
// premium lock icon
// Companies
// Hint
// You are given an integer array nums of length n.

// A partition is defined as an index i where 0 <= i < n - 1, splitting the array into two non-empty subarrays such that:

// Left subarray contains indices [0, i].
// Right subarray contains indices [i + 1, n - 1].
// Return the number of partitions where the difference between the sum of the left and right subarrays is even.


// Example 1:

// Input: nums = [10,10,3,7,6]

// Output: 4

// Explanation:

// The 4 partitions are:

// [10], [10, 3, 7, 6] with a sum difference of 10 - 26 = -16, which is even.
// [10, 10], [3, 7, 6] with a sum difference of 20 - 16 = 4, which is even.
// [10, 10, 3], [7, 6] with a sum difference of 23 - 13 = 10, which is even.
// [10, 10, 3, 7], [6] with a sum difference of 30 - 6 = 24, which is even.
// Example 2:

// Input: nums = [1,2,2]

// Output: 0

// Explanation:

// No partition results in an even sum difference

// ========================= JAVASCRIPT =================
// 🧠 Comprehensive Explanation (JavaScript Instructor Style)

// Let's break down the logic step-by-step like you're learning from a professional JavaScript tutor.

// 🎯 Goal

// We need to find how many ways we can split the array into:

// Left side: nums[0…i]

// Right side: nums[i+1…n-1]

// Such that:

// (leftSum - rightSum) is EVEN


// A partition index i is valid only when 0 ≤ i < n-1.

// 🧩 Key Insight: Parity (Even/Odd Logic)

// You don't need the exact values; you need to check if the difference is even.

// A number is even when:

// difference % 2 === 0


// But there's a faster way:

// difference is even ⇔ (leftSum - rightSum) has the same parity on both sides


// In other words:

// Even - even = even

// Odd - odd = even

// So all you need is to compute leftSum and rightSum and check if the difference is even.

// JavaScript trick:

// x & 1


// returns:

// 0 if x is even

// 1 if x is odd

// So:

// ((leftSum - rightSum) & 1) === 0


// means the difference is even.

// 🧠 Step-by-Step Code Walkthrough
// 1. Compute total sum
// let total = nums.reduce((a, b) => a + b, 0);


// We compute this once so we don't repeatedly sum the right side.

// 2. Initialize leftSum and count
// let leftSum = 0;
// let count = 0;


// We'll build leftSum as we iterate.

// 3. Loop through partition positions
// for (let i = 0; i < n - 1; i++) {


// We stop at n - 2 because the right side must have at least 1 element.

// 4. Update leftSum
// leftSum += nums[i];

// 5. Compute rightSum
// const rightSum = total - leftSum;

// 6. Check if difference is even
// if (((leftSum - rightSum) & 1) === 0) {
//     count++;
// }


// This checks the parity of the difference.

// 7. Return total count
// return count;

// =============================  CODE STRUCTURE  ===================
// (1) funct countPartitions(p){
// (1a) V.length,v.reduce,2v
// (1b) for(p){++,V,if(&===){++}}
// return}


/**
 * @param {number[]} nums
 * @return {number}
 */
var countPartitions = function(nums) {
    const n = nums.length;

    // Compute total sum of the array
    let total = nums.reduce((a, b) => a + b, 0);

    let leftSum = 0;
    let count = 0;

    // Loop through valid partition points: 0 to n-2
    for (let i = 0; i < n - 1; i++) {
        leftSum += nums[i];
        const rightSum = total - leftSum;

        // Check whether (leftSum - rightSum) is even
        if (((leftSum - rightSum) & 1) === 0) {
            count++;
        }
    }

    return count;
};


// ======================== TYPESCRIPT ==================

