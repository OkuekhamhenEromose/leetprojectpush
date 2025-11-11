// 474. Ones and Zeroes
// Medium
// Topics
// premium lock icon
// Companies
// You are given an array of binary strings strs and two integers m and n.

// Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

// A set x is a subset of a set y if all elements of x are also elements of y.

 

// Example 1:

// Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
// Output: 4
// Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
// Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
// {"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
// Example 2:

// Input: strs = ["10","0","1"], m = 1, n = 1
// Output: 2
// Explanation: The largest subset is {"0", "1"}, so the answer is 2.

// 🧩 Problem Recap

// We’re solving the “474. Ones and Zeroes” problem.

// You’re given:

// strs: an array of binary strings (e.g. ["10","0001","111001","1","0"]),

// two integers:

// m → max number of 0s you can use,

// n → max number of 1s you can use.

// You must find the largest number of strings you can pick such that the total number of zeros ≤ m and the total number of ones ≤ n.

// ⚙️ Real-World Analogy

// Imagine you have a “budget”:

// You can only afford m zeros and n ones.

// Each string “costs” some zeros and ones.

// You want to pick the maximum number of strings you can afford without overspending your zeros or ones.

// That’s a two-dimensional knapsack problem (like a backpack with two capacity limits).

// 💡 Step-by-Step Code Logic Explanation

// Let’s break the code down line by line.

// 1️⃣ Create the DP Table
// const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));


// We create a 2D array dp of size (m+1) x (n+1).

// dp[i][j] means:
// the maximum number of strings we can pick
// using at most i zeros and j ones.

// Initially, all values are 0 — we haven’t picked any strings yet.

// 🧠 Example

// If m = 5, n = 3, then:

// dp = [
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ]


// Each row = number of zeros allowed.
// Each column = number of ones allowed.

// 2️⃣ Process Each String in strs
// for (let str of strs) {
//   const zeros = str.split('').filter(ch => ch === '0').length;
//   const ones = str.length - zeros;


// For each binary string:

// Count how many 0s and 1s it contains.

// That’s its “cost” in terms of available zeros and ones.

// Example

// "0001" → 3 zeros, 1 one
// "10" → 1 zero, 1 one

// 3️⃣ Update the DP Table — in Reverse
// for (let i = m; i >= zeros; i--) {
//   for (let j = n; j >= ones; j--) {
//     dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
//   }
// }


// This is the heart of the solution.

// Let’s unpack it carefully.

// 🧠 Meaning of the Formula
// dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);


// This means:

// We’re deciding whether to include the current string or not.

// We have two choices for each string:

// Skip the string → dp[i][j] remains unchanged.

// Include the string →

// We “spend” some zeros (zeros) and ones (ones),

// So we look at what we could achieve before spending those:
// dp[i - zeros][j - ones],

// and we add 1 (for this new string we’re adding).

// We take the maximum of the two options.

// 🚫 Why We Loop in Reverse (Downward)

// Notice we loop:

// for (let i = m; i >= zeros; i--)
// for (let j = n; j >= ones; j--)


// We go backwards (from large → small) to ensure that:

// Each string is only used once.

// If we looped forward (0 → m), we’d accidentally reuse the same string multiple times in the same iteration, inflating results.

// This is a standard trick from 0/1 knapsack problems.

// 🧾 Visual Example

// Let’s take:

// strs = ["10", "0001", "1", "0"]
// m = 5, n = 3

// Step 1: Process "10" → (1 zero, 1 one)

// We can add this to any dp[i][j] where i ≥ 1 and j ≥ 1.

// So dp[1][1] = 1.

// Step 2: Process "0001" → (3 zeros, 1 one)

// We check all positions (i, j) where we have at least 3 zeros and 1 one.

// Now we can form subsets like {"10", "0001"} → total = 2.

// Step 3: Process "1" → (0 zeros, 1 one)

// Now we can add this string if we still have at least 1 one remaining.

// Step 4: Process "0" → (1 zero, 0 ones)

// Adds another valid combination if space allows.

// At the end, the maximum subset size (for 5 zeros, 3 ones) is 4.

// 4️⃣ Return the Result
// return dp[m][n];


// The value in the bottom-right corner of the DP table (dp[m][n]) represents:

// The maximum number of strings you can form with at most m zeros and n ones.

// ✅ Example Outputs
// console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)); 
// // Output: 4

// console.log(findMaxForm(["10", "0", "1"], 1, 1)); 
// // Output: 2

// 📊 Visualization of the DP Update

// For str = "10" (zeros=1, ones=1):

// i\j	0	1	2	3
// 0	0	0	0	0
// 1	0	1	1	1
// 2	0	1	1	1
// 3	0	1	1	1
// 4	0	1	1	1
// 5	0	1	1	1

// Each number means: maximum subset size possible with that many zeros and ones.

// 🧠 Time and Space Complexity
// Aspect	Complexity	Explanation
// Time	O(L * m * n)	L = number of strings. For each string, we update a DP grid of size m * n.
// Space	O(m * n)	2D DP array with dimensions (m+1) x (n+1).
// 🧠 Key Takeaways
// Concept	Explanation
// Dynamic Programming (DP)	We use previously computed results to build the answer efficiently.
// 2D Knapsack	Two constraints: zeros (m) and ones (n).
// Reverse Iteration	Prevents reusing a string multiple times (0/1 knapsack logic).
// Optimization	Each dp[i][j] stores the max number of strings possible under those constraints.
// 💬 In Simple Terms

// You’re basically saying:

// “For each string, can I fit it into my limited supply of zeros and ones?
// If yes, does adding it make my collection larger than before?
// Keep track of the best possible collection in a 2D table.

function findMaxForm(strs, m, n) {
  // Create a 2D DP array (m+1) x (n+1)
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Process each string
  for (let str of strs) {
    const zeros = str.split('').filter(ch => ch === '0').length;
    const ones = str.length - zeros;

    // Update DP table in reverse (to avoid overwriting)
    for (let i = m; i >= zeros; i--) {
      for (let j = n; j >= ones; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
      }
    }
  }

  return dp[m][n];
}

// ✅ Example 1
console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)); // Output: 4

// ✅ Example 2
console.log(findMaxForm(["10", "0", "1"], 1, 1)); // Output: 2
