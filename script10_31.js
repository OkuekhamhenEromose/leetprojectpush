// ======================  QUESTION  =============================
// 3289. The Two Sneaky Numbers of Digitville
// Solved
// Easy
// Topics
// premium lock icon
// Companies
// Hint
// In the town of Digitville, there was a list of numbers called nums containing integers from 0 to n - 1. Each number was supposed to appear exactly once in the list, however, two mischievous numbers sneaked in an additional time, making the list longer than usual.

// As the town detective, your task is to find these two sneaky numbers. Return an array of size two containing the two numbers (in any order), so peace can return to Digitville.

 

// Example 1:

// Input: nums = [0,1,1,0]

// Output: [0,1]

// Explanation:

// The numbers 0 and 1 each appear twice in the array.

// Example 2:

// Input: nums = [0,3,2,1,3,2]

// Output: [2,3]

// Explanation:

// The numbers 2 and 3 each appear twice in the array.

// Example 3:

// Input: nums = [7,1,5,4,3,4,6,0,9,5,8,2]

// Output: [4,5]

// Explanation:

// The numbers 4 and 5 each appear twice in the array

// 🪄 Step-by-Step Logic Breakdown

// Let’s break it into conceptual blocks.

// 🧱 1. Declaring Variables
// const count = {};
// const result = [];


// count is an object we’ll use as a frequency map.
// It keeps track of how many times each number appears in nums.

// Example:
// If nums = [0, 1, 1, 0], then after processing,
// count = { 0: 2, 1: 2 }.

// result is an empty array that will store the final answer —
// i.e., the numbers that appeared exactly twice.

// 🔁 2. Loop Through nums and Count Occurrences
// for (const num of nums) {
//     count[num] = (count[num] || 0) + 1;
// }

// Let's unpack that line carefully:

// for (const num of nums) means we’re looping through every element in the array.

// Inside the loop, we use:

// count[num] = (count[num] || 0) + 1;


// This line looks tricky but it’s a common and powerful JavaScript pattern.
// Here’s what it does step-by-step:

// count[num] → Check if this key already exists in the count object.

// count[num] || 0 → If it doesn’t exist yet, it defaults to 0.

// + 1 → Increase it by 1.

// ✅ So every time we see a number, we either:

// Set its count to 1 (if it’s new)

// Or increment it by 1 (if we’ve seen it before)

// Example in Action

// For nums = [0, 1, 1, 0]:

// Iteration	num	count before	count after
// 1	0	{}	{ 0: 1 }
// 2	1	{ 0: 1 }	{ 0: 1, 1: 1 }
// 3	1	{ 0: 1, 1: 1 }	{ 0: 1, 1: 2 }
// 4	0	{ 0: 1, 1: 2 }	{ 0: 2, 1: 2 }

// At the end:
// 👉 count = { 0: 2, 1: 2 }

// 🔍 3. Find Which Numbers Appeared Twice
// for (const num in count) {
//     if (count[num] === 2) {
//         result.push(Number(num));
//     }
// }


// for (const num in count) loops over the keys of the object count.
// In JavaScript, object keys are always strings, even if they look like numbers.

// Inside the loop:

// if (count[num] === 2) checks whether this number appeared exactly twice.

// If yes, we push it into the result array.

// We wrap it with Number(num) because keys from for...in are strings, and we want the final result to be numbers.

// Continuing the Example

// count = { 0: 2, 1: 2 }

// Looping through:

// For key "0", value is 2 → push 0

// For key "1", value is 2 → push 1

// ✅ So result = [0, 1]

// 🏁 4. Return the Result
// return result;


// At this point, result contains all numbers that appeared twice.

// ============================  CODE STRUCTURE  ==========================
// (1) funct getSneakyNumbers(p){2V}
// (1a) forof(p){V||++}
// (1b) forin(p){if(p){.push}}
// (1c) return

/**
 * @param {number[]} nums
 * @return {number[]}
 */

var getSneakyNumbers = function(nums) {
    const count = {};//for in loops over the keys,they are returned as strings
    const result = [];// for of through the elements

    for (const num of nums) {
        count[num] = (count[num] || 0) + 1;
    }

    for (const num in count) {
        if (count[num] === 2) {
            result.push(Number(num));
        }
    }

    return result;
};
