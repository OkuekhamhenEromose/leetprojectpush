// 961. N-Repeated Element in Size 2N Array
// Solved
// Easy
// Topics
// premium lock icon
// Companies
// You are given an integer array nums with the following properties:

// nums.length == 2 * n.
// nums contains n + 1 unique elements.
// Exactly one element of nums is repeated n times.
// Return the element that is repeated n times.

 

// Example 1:

// Input: nums = [1,2,3,3]
// Output: 3
// Example 2:

// Input: nums = [2,1,2,5,3,2]
// Output: 2
// Example 3:

// Input: nums = [5,1,5,2,5,3,5,4]
// Output: 5

// ===================================  JAVASCRIPT  ==============================
// 🧠 Explanation (TypeScript Tutor Style)
// 🔹 Key Observation

// The problem guarantees:

// The array has 2n elements

// There are n + 1 unique numbers

// Exactly one number appears n times

// All other numbers appear only once

// 👉 This means the first number you encounter twice must be the answer.

// We do not need to count all elements.

// 🔹 Step 1: Use a Set
// const seen = new Set<number>();


// A Set stores only unique values

// Checking if a value exists in a set (has) is O(1) time

// Perfect for detecting duplicates efficiently

// 🔹 Step 2: Loop Through the Array
// for (const num of nums) {


// We iterate once through nums

// Time complexity remains O(n)

// 🔹 Step 3: Detect the Repeated Element
// if (seen.has(num)) {
//     return num;
// }


// If num already exists in seen, it means:

// We’ve found the element that appears n times

// We return it immediately

// 🔹 Step 4: Store First-Time Values
// seen.add(num);


// If the number is not in the set yet, store it

// 🔹 Why the return -1 Exists
// return -1;


// This is only for TypeScript completeness

// The problem guarantees an answer, so this line is never reached

function repeatedNTimes(nums: number[]): number {
    const seen = new Set<number>();

    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }

    // This line is never reached due to problem constraints
    return -1;
}


// ========================  PYTHON TO TYPESCRIPT COMPARISON  ==================================
// 🔁 Python ↔ TypeScript Comparison
// 🧩 Problem Recap (Language-Independent)

// Array length = 2n

// Exactly one number appears n times

// All other numbers appear once

// Return the number repeated n times

// 👉 Key Insight:
// The first duplicate you encounter while scanning the array must be the answer.

// ✅ Python Solution
// class Solution(object):
//     def repeatedNTimes(self, nums):
//         seen = set()

//         for num in nums:
//             if num in seen:
//                 return num
//             seen.add(num)

// ✅ TypeScript Solution
// function repeatedNTimes(nums: number[]): number {
//     const seen = new Set<number>();

//     for (const num of nums) {
//         if (seen.has(num)) {
//             return num;
//         }
//         seen.add(num);
//     }

//     return -1; // never reached
// }

// 🧠 Line-by-Line Conceptual Mapping
// Concept	Python	TypeScript
// Function definition	def repeatedNTimes	function repeatedNTimes
// Set creation	set()	new Set<number>()
// Loop	for num in nums:	for (const num of nums)
// Membership test	num in seen	seen.has(num)
// Add to set	seen.add(num)	seen.add(num)
// Early return	return num	return num
// 🧠 Why This Works in Both Languages

// A Set stores unique values

// The repeated number appears many times

// The first repetition is guaranteed to occur early

// No counting or sorting needed

// ⏱️ Performance Comparison
// Metric	Python	TypeScript
// Time Complexity	O(n)	O(n)
// Space Complexity	O(n)	O(n)
// Lookup Time	O(1) average	O(1) average
// Readability	Very concise	Slightly more verbose
// 🧪 Example Walkthrough (Same Logic)
// Input
// [2,1,2,5,3,2]

// Execution Flow
// Step	Value	Seen Set
// 1	2	{2}
// 2	1	{2,1}
// 3	2	Duplicate → return 2
// 🧩 Syntax Differences That Matter
// Python

// Dynamic typing

// Cleaner membership checks (in)

// No return type required

// TypeScript

// Static typing (number[], Set<number>)

// .has() instead of in

// Requires return value for completeness

// ❌ What NOT to Do (Both Languages)
// # O(n²) — bad
// nums.count(num)

// // O(n²) — bad
// nums.filter(x => x === num).length


// 🚫 Too slow for large inputs.

// 🎯 Final Instructor Takeaway
// Lesson	Explanation
// Use constraints	Problem guarantees simplify logic
// Use the right structure	Sets detect duplicates efficiently
// Early exit	Stops unnecessary work
// Language-agnostic logic	Same idea, different syntax
