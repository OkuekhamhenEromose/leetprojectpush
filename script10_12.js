// Step 1: Group total damages by spell power
// for (let dmg of power) {
//   damageMap.set(dmg, (damageMap.get(dmg) || 0) + dmg);
// }
// 🔹 Step 2: Sort the unique power values
// const unique = Array.from(damageMap.keys()).sort((a, b) => a - b);
// 🔹 Step 3: Prepare DP array
// const dp = Array(n).fill(0);
// 🔹 Step 4: Dynamic Programming logic

// We loop through each unique damage:

// for (let i = 0; i < n; i++) {
//   const current = unique[i];
//   const currentSum = damageMap.get(current);
// 🔹 Step 5: Final Answer

// The final answer is:

// return dp[n - 1];


// ======================== LOGIC EXPLANATION =====================
// Step 1: Group total damages by spell power

// 💡 What it does:

// This loop combines all identical power values and sums their total damage.

// If there are multiple spells with the same power, they can all be cast since they don’t violate the “±2” rule relative to themselves.

// Example:

// power = [7,1,6,6]
// damageMap = {
//   1 → 1, 
//   6 → 12,   // (6 + 6)
//   7 → 7
// }


// This simplifies the array — now we only have unique damage values and their total contribution.

// 🔹 Step 2: Sort the unique power values


// We sort so that we can process from smallest to largest — that’s crucial for dynamic programming, since we rely on previous computed states.

// Example:

// unique = [1, 6, 7]

// 🔹 Step 3: Prepare DP array
// const dp = Array(n).fill(0);


// dp[i] means:

// the maximum total damage we can achieve using spells up to unique[i].

// We’ll fill this array iteratively.

// 🔹 Step 4: Dynamic Programming logic

// We loop through each unique damage:

// for (let i = 0; i < n; i++) {
//   const current = unique[i];
//   const currentSum = damageMap.get(current);

// ✅ Option 1: Include the current damage

// If we cast all spells of this current damage, we can’t include any spells with damage:

// current - 1, current - 2


// So, we find the previous damage index (j) that is less than current - 2:

// let j = i - 1;
// while (j >= 0 && unique[j] >= current - 2) j--;


// Then:

// const include = currentSum + (j >= 0 ? dp[j] : 0);


// If j exists (there’s a non-conflicting damage before current),
// we add its dp[j] value — meaning we combine this damage’s score with the best possible total before the conflict boundary.

// Otherwise, we just take currentSum.

// 🚫 Option 2: Exclude the current damage

// We can choose to skip this damage entirely and keep the previous best total:

// const exclude = i > 0 ? dp[i - 1] : 0;

// ⚖️ Compare both choices

// We take the maximum:

// dp[i] = Math.max(include, exclude);


// This ensures at every step we maintain the optimal total damage possible up to that point.

// 🔹 Step 5: Final Answer

// The final answer is:

// return dp[n - 1];


// That’s the best total damage achievable considering all spell powers.

// 🧾 Let’s Walk Through an Example
// Example:
// power = [1, 1, 3, 4]

// Step 1 — Group by damage:
// damageMap = {
//   1 → 2,  // (1 + 1)
//   3 → 3,
//   4 → 4
// }

// Step 2 — Sort unique:
// unique = [1, 3, 4]

// Step 3 — DP table starts as:
// dp = [0, 0, 0]

// Iteration 1 (i = 0, current = 1)

// currentSum = 2

// no previous values, so:

// include = 2

// exclude = 0
// → dp[0] = 2

// Iteration 2 (i = 1, current = 3)

// currentSum = 3

// find previous j such that unique[j] < current - 2 (i.e., 3 - 2 = 1)

// unique[0] = 1 → NOT < 1, so no valid j

// include = 3

// exclude = dp[0] = 2
// → dp[1] = 3

// Iteration 3 (i = 2, current = 4)

// currentSum = 4

// find j such that unique[j] < 4 - 2 = 2

// unique[0] = 1 ✅ so j = 0

// include = 4 + dp[0] = 4 + 2 = 6

// exclude = dp[1] = 3
// → dp[2] = 6

// ✅ Final Answer = dp[2] = 6

// Example Output
// maximumTotalDamage([1,1,3,4]) // Output: 6


// Explanation: Choose spells with powers 1, 1, and 4 → total = 1 + 1 + 4 = 6

// /**
//  * @param {number[]} power
//  * @return {number}
//  */


// =========================== END OF EXPLANATION ====================

// ================== CODE-STRUCTURE ======================
// (1) funct maximumTotalDamage(power){VnewMap,
// (1a) forof(p){.set(dmg(.get(p)||))+}
// (1b) V.from(.keys).sort(f)V.length,V.fill
// (1c) for(p){V[i],V.get(p),v,while(j&)--,V+?:,V>?:,[i]=.max}
// (1d) return
// ======================== CODE-STRUCTURE ENDS ========================

// var maximumTotalDamage = function(power) {
//   const damageMap = new Map(); 
//   // Step 1: group total damages by spell power
//   for (let dmg of power) {
//     damageMap.set(dmg, (damageMap.get(dmg) || 0) + dmg);
//   }
//   // Step 2: sort unique damages
//   const unique = Array.from(damageMap.keys()).sort((a, b) => a - b);
//   const n = unique.length;  
//   // Step 3: initialize DP array
//   const dp = Array(n).fill(0);
//   for (let i = 0; i < n; i++) {
//     const current = unique[i];
//     const currentSum = damageMap.get(current);
//     // find index of last value less than current - 2
//     let j = i - 1;
//     while (j >= 0 && unique[j] >= current - 2) j--;

//     const include = currentSum + (j >= 0 ? dp[j] : 0);
//     const exclude = i > 0 ? dp[i - 1] : 0;

//     dp[i] = Math.max(include, exclude);
//   }

//   return dp[n - 1];
// };
