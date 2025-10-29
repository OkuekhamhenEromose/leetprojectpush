// 🧱 Step-by-Step Code Breakdown
// 1️⃣ Function Definition and State Setup
// var countValidSelections = function(nums) {
//   const n = nums.length;
//   let count = 0;


// n is the array length.

// count will track how many valid selections we find.

// 2️⃣ Helper Function: simulate()

// This is the heart of the algorithm — it mimics the “movement” process for one start point and one direction.

// function simulate(start, dir) {
//   const arr = nums.slice(); // copy array
//   let curr = start;


// start = starting index (must be a zero).

// dir = current direction: 1 (right) or -1 (left).

// arr = nums.slice() makes a shallow copy so the simulation doesn’t affect the original array.

// 3️⃣ The Movement Loop
// while (curr >= 0 && curr < n) {


// Loop continues as long as curr is inside the array bounds.

// Once it goes beyond 0 or n - 1, the process stops.

// 4️⃣ Case 1: When current value is 0
// if (arr[curr] === 0) {
//   curr += dir;
// }


// If the current value is already 0, you just move one step in the same direction.

// No change to the array or direction.

// ✅ Example:
// If arr[curr] = 0 and dir = +1,
// you move curr = curr + 1.

// 5️⃣ Case 2: When current value is greater than 0
// else {
//   arr[curr] -= 1;
//   dir *= -1; // reverse direction
//   curr += dir;
// }


// If the current position has a positive value, you:

// Decrease it by one (arr[curr] -= 1).

// Reverse direction (dir *= -1).

// Move one step in the new direction (curr += dir).

// This matches the problem rule that says:

// “If nums[curr] > 0: decrement it by 1, reverse direction, and move one step.”

// 6️⃣ End Condition: Out of Bounds

// Once curr becomes < 0 or >= n, the loop ends, meaning the movement has exited the array.

// Now we must check whether all elements are zero:

// return arr.every(v => v === 0);


// .every() checks if all values in the array equal 0.

// Returns true if the array is completely zeroed out, otherwise false.

// 7️⃣ Trying All Possible Starting Positions
// for (let i = 0; i < n; i++) {
//   if (nums[i] === 0) {
//     if (simulate(i, 1)) count++;
//     if (simulate(i, -1)) count++;
//   }
// }


// Loop through the array.

// Whenever we find nums[i] === 0, we run two simulations:

// One moving to the right (dir = +1)

// One moving to the left (dir = -1)

// If either simulation returns true, it means that configuration leads to all zeros → increment count.

// 8️⃣ Return the Final Count
// return count;
// };


// After checking every possible zero index and both directions, return the total number of valid selections.



/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function(nums) {
  const n = nums.length;
  let count = 0;

  // helper function to simulate the process
  function simulate(start, dir) {
    const arr = nums.slice(); // copy array
    let curr = start;

    while (curr >= 0 && curr < n) {
      if (arr[curr] === 0) {
        curr += dir;
      } else {
        arr[curr] -= 1;
        dir *= -1; // reverse direction
        curr += dir;
      }
    }

    // check if all elements are zero
    return arr.every(v => v === 0);
  }

  // try all zero positions with both directions
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      if (simulate(i, 1)) count++;
      if (simulate(i, -1)) count++;
    }
  }

  return count;
};
