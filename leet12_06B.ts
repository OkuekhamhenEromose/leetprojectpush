// 3578. Count Partitions With Max-Min Difference at Most K
// Solved
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// You are given an integer array nums and an integer k. Your task is to partition nums into one or more non-empty contiguous segments such that in each segment, the difference between its maximum and minimum elements is at most k.

// Return the total number of ways to partition nums under this condition.

// Since the answer may be too large, return it modulo 109 + 7.

 

// Example 1:

// Input: nums = [9,4,1,3,7], k = 4

// Output: 6

// Explanation:

// There are 6 valid partitions where the difference between the maximum and minimum elements in each segment is at most k = 4:

// [[9], [4], [1], [3], [7]]
// [[9], [4], [1], [3, 7]]
// [[9], [4], [1, 3], [7]]
// [[9], [4, 1], [3], [7]]
// [[9], [4, 1], [3, 7]]
// [[9], [4, 1, 3], [7]]
// Example 2:

// Input: nums = [3,3,4], k = 0

// Output: 2

// Explanation:

// There are 2 valid partitions that satisfy the given conditions:

// [[3], [3], [4]]
// [[3, 3], [4]]

// ✅ FULL EXPLANATION (As a TypeScript Instructor)

// Let’s explain every part clearly so you understand the logic and why the algorithm works.

// 💡 Goal of the Problem

// We must split the array into contiguous segments such that:

// max(segment) - min(segment) ≤ k


// And count how many different partitions are possible.

// Example:
// [9, 4, 1, 3, 7] → 6 valid partitions.

// 🧠 Main Idea

// We use Dynamic Programming (DP) with a sliding window and two monotonic queues to track:

// ✔ Maximum value in the current window
// ✔ Minimum value in the current window

// This lets us know whether the window [left … right] is a valid segment.

// 🎯 DP Definition

// Let:

// dp[i] = number of valid ways to partition nums[0:i]


// Example:

// dp[0] = 1 — there is 1 way to partition an empty prefix.

// dp[1] = ways to partition first element

// …

// answer = dp[n]

// 📌 Core Transition

// If a segment ends at index right, and starts at any valid index j:

// dp[right + 1] += dp[j]


// Where:

// nums[j ... right] is valid (max-min ≤ k)


// This means:

// For each ending position right,

// We add every dp[j] that could start the last segment.

// But we must do this efficiently.

// ⚡ Problem: Checking max/min for many windows is expensive

// A naive solution would check:

// for each right:
//     for each j < right:
//         check max/min → O(n^2)


// We avoid that using monotonic queues.

// 🚀 Solution Techniques
// 1️⃣ Sliding Window with Two Monotonic Queues

// We maintain a window [left … right] where:

// maxQ stores indices in decreasing order → front is max

// minQ stores indices in increasing order → front is min

// This allows:

// max of window → nums[maxQ[0]]
// min of window → nums[minQ[0]]


// Both in O(1) time.

// If the window becomes invalid:

// max - min > k


// We move left forward.

// 2️⃣ Efficient DP with Running Window Sum

// For each right, the valid j values are:

// left ≤ j ≤ right


// And we must compute:

// dp[right + 1] = dp[left] + dp[left+1] + ... + dp[right]


// Instead of summing every time (O(n)), we maintain:

// windowSum = dp[left] + dp[left+1] + ... + dp[right]


// Updating windowSum in O(1).

// 🔍 Now let’s walk through the code
// ✔ Setup DP
// const dp = Array(n + 1).fill(0);
// dp[0] = 1;

// ✔ Setup monotonic queues
// const maxQ: number[] = [];
// const minQ: number[] = [];

// ✔ Variables for the sliding window
// let left = 0;
// let windowSum = 0;

// 🔁 Main Loop (right pointer moves from 0 → n-1)
// 👉 Step 1: Insert nums[right] into max queue
// while (maxQ.length && nums[maxQ[maxQ.length - 1]] < nums[right]) {
//     maxQ.pop();
// }
// maxQ.push(right);


// Keeps it decreasing, so front = largest.

// 👉 Step 2: Insert into min queue
// while (minQ.length && nums[minQ[minQ.length - 1]] > nums[right]) {
//     minQ.pop();
// }
// minQ.push(right);


// Keeps it increasing, so front = smallest.

// 👉 Step 3: Shrink window while invalid
// while (nums[maxQ[0]] - nums[minQ[0]] > k) {
//     windowSum = (windowSum - dp[left] + MOD) % MOD;

//     if (maxQ[0] === left) maxQ.shift();
//     if (minQ[0] === left) minQ.shift();

//     left++;
// }


// This ensures:

// max-min <= k

// 👉 Step 4: Add dp[right] to the running sum
// windowSum = (windowSum + dp[right]) % MOD;


// dp[right] corresponds to choosing a new segment that starts at right.

// 👉 Step 5: dp[right+1] = sum of all valid dp[j]
// dp[right + 1] = windowSum;


// This counts all partitions ending at index right.

// 🏁 Final answer
// return dp[n] % MOD;


function countPartitions_V3(nums: number[], k: number): number {
    const MOD = 1_000_000_007;
    const n = nums.length;

    // dp[i] = number of valid ways to partition nums[0 : i]
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;

    // Monotonic queues
    const maxQ: number[] = []; // decreasing queue (max at front)
    const minQ: number[] = []; // increasing queue (min at front)

    let left = 0;
    let windowSum = 0; // running sum of dp[left ... right]

    for (let right = 0; right < n; right++) {

        // Maintain DECREASING queue for maximum
        while (maxQ.length > 0 && nums[maxQ[maxQ.length - 1]] < nums[right]) {
            maxQ.pop();
        }
        maxQ.push(right);

        // Maintain INCREASING queue for minimum
        while (minQ.length > 0 && nums[minQ[minQ.length - 1]] > nums[right]) {
            minQ.pop();
        }
        minQ.push(right);

        // Shrink window until max - min <= k
        while (nums[maxQ[0]] - nums[minQ[0]] > k) {
            windowSum = (windowSum - dp[left] + MOD) % MOD;

            if (maxQ[0] === left) maxQ.shift();
            if (minQ[0] === left) minQ.shift();

            left++;
        }

        // Add dp[right] to the running window sum
        windowSum = (windowSum + dp[right]) % MOD;

        // dp[right + 1] = all valid partitions ending at index right
        dp[right + 1] = windowSum;
    }

    return dp[n] % MOD;
}
