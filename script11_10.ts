// 3542. Minimum Operations to Convert All Elements to Zero
// Solved
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// You are given an array nums of size n, consisting of non-negative integers. Your task is to apply some (possibly zero) operations on the array so that all elements become 0.

// In one operation, you can select a subarray [i, j] (where 0 <= i <= j < n) and set all occurrences of the minimum non-negative integer in that subarray to 0.

// Return the minimum number of operations required to make all elements in the array 0.

 

// Example 1:

// Input: nums = [0,2]

// Output: 1

// Explanation:

// Select the subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0].
// Thus, the minimum number of operations required is 1.
// Example 2:

// Input: nums = [3,1,2,1]

// Output: 3

// Explanation:

// Select subarray [1,3] (which is [1,2,1]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [3,0,2,0].
// Select subarray [2,2] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [3,0,0,0].
// Select subarray [0,0] (which is [3]), where the minimum non-negative integer is 3. Setting all occurrences of 3 to 0 results in [0,0,0,0].
// Thus, the minimum number of operations required is 3.
// Example 3:

// Input: nums = [1,2,1,2,1,2]

// Output: 4

// Explanation:

// Select subarray [0,5] (which is [1,2,1,2,1,2]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [0,2,0,2,0,2].
// Select subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,2,0,2].
// Select subarray [3,3] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,2].
// Select subarray [5,5] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,0].
// Thus, the minimum number of operations required is 4

// 🧩 Problem Recap — What are we solving?

// We’re given an array of non-negative integers (nums).

// We can repeatedly perform this operation:

// Choose any subarray [i, j] and set all occurrences of the minimum non-zero element in that subarray to 0.

// We want the minimum number of operations required to make all elements zero.

// 💡 Intuitive Explanation

// Imagine nums as segments of non-zero values separated by zeros:

// Each segment acts independently, because zeros “split” the array — you can’t perform a subarray operation that jumps across a zero.

// Within each segment, we must remove distinct positive values, one by one, from smallest to largest.

// 👉 So the number of operations equals:

// the number of distinct positive values in each segment,

// summed over all segments.

// That’s the big idea.

// 🧠 How the Stack Helps

// We use a stack to model increasing numbers in each segment.

// The stack maintains a strictly increasing sequence of distinct positive values that are still “active” (not yet turned to zero).

// Let’s go through the actual code line by line.

// 🧾 Code Walkthrough
// function minOperations(nums: number[]): number {


// We declare a TypeScript function minOperations that accepts an array of numbers and returns a number.

// The type annotation number[] → ensures every element in nums is numeric.

// Return type number ensures we output a numeric count of operations.

// 1️⃣ Initialize Stack and Counter
//     const stack: number[] = []; // increasing stack of distinct positive values
//     let ops = 0;


// stack will store the increasing sequence of numbers we’ve seen in the current segment.

// ops counts the total operations we’ve made so far.

// 2️⃣ Iterate Through Each Element
//     for (let v of nums) {


// We loop through each element v in the array using a for-of loop — very common in React when iterating through data (e.g., rendering list items).

// 3️⃣ Handle Zeros as Segment Breaks
//         if (v === 0) {
//             // Zero splits segments: flush remaining values in stack (each needs one operation)
//             ops += stack.length;
//             stack.length = 0; // clear stack
//             continue;
//         }

// 💬 Explanation:

// A zero means the current segment has ended.

// Every value remaining in the stack represents a unique positive number we must zero out.

// ops += stack.length → each unique number adds one operation.

// stack.length = 0 clears the stack for the next segment.

// continue skips the rest of the loop for this iteration.

// This is like resetting state between segments — just as you would reset a form or local state in React when switching contexts.

// 4️⃣ Handle Positive Numbers
//         while (stack.length > 0 && stack[stack.length - 1] > v) {
//             stack.pop();
//             ops++;
//         }

// 💬 Explanation:

// If the current number v is smaller than the last number in the stack,
// then all larger numbers must be removed (each costs one operation).

// Why? Because when we see a smaller number, it means:

// The larger numbers before it would have been zeroed out earlier.

// So, we “pop” them off the stack, and each pop adds an operation.

// This step ensures the stack is always increasing, like [1, 2, 4], never [3, 2].

// 5️⃣ Push Distinct Increasing Values
//         if (stack.length === 0 || stack[stack.length - 1] < v) {
//             stack.push(v);
//         }
//         // else top == v -> skip pushing

// 💬 Explanation:

// If stack is empty or the top is smaller, push this new value.

// If the top equals the current value (stack[stack.length - 1] === v), skip — it’s a duplicate value already accounted for.

// This prevents double-counting — very similar to avoiding duplicate state updates in React (for example, not re-setting the same state twice).

// 6️⃣ After the Loop: Flush Remaining Segment
//     ops += stack.length;


// When the loop ends, we may still have values left in the stack (last segment not followed by a zero).
// Each remaining unique value adds one operation.

// 7️⃣ Return Result
//     return ops;
// }


// That’s the total number of operations needed to turn the array into all zeros.

function minOperations(nums: number[]): number {
    const stack: number[] = []; // increasing stack of distinct positive values
    let ops = 0;

    for (let v of nums) {
        if (v === 0) {
            // Zero splits segments: flush remaining values in stack (each needs one operation)
            ops += stack.length;
            stack.length = 0; // clear stack
            continue;
        }

        // Pop larger values — each popped value requires one operation
        while (stack.length > 0 && stack[stack.length - 1] > v) {
            stack.pop();
            ops++;
        }

        // If top equals current value, do nothing (they can be handled by same operation)
        if (stack.length === 0 || stack[stack.length - 1] < v) {
            stack.push(v);
        }
        // else top == v -> skip pushing
    }

    // Flush remaining in stack at end of array
    ops += stack.length;

    return ops;
}

// Example tests
console.log(minOperations([0, 2])); // 1
console.log(minOperations([3, 1, 2, 1])); // 3
console.log(minOperations([1, 2, 1, 2, 1, 2])); // 4
