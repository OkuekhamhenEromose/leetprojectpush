// 🧠 Core Idea (High-Level)

// For each number n in nums, we want the smallest integer x such that:

// x OR (x + 1) == n


// This is a bitwise construction problem, not brute force.

// 🔑 Critical Bitwise Observations
// 1️⃣ Why even numbers are impossible

// x OR (x + 1) is always odd

// Reason: x and x + 1 differ at the lowest zero bit, which becomes 1

// Therefore:

// If n is even → ❌ no solution

// We return -1

// if ((n & 1) === 0) {
//     ans.push(-1);
// }

// 2️⃣ How x OR (x + 1) behaves

// When you add 1 to a number:

// All trailing 1s flip to 0

// The first 0 flips to 1

// Example:

// x     =  100111
// x + 1 =  101000
// OR    =  101111


// ➡️ The OR result is just x with one extra bit set

// 🎯 Strategy to Minimize x

// To get the smallest possible x:

// We reverse the OR effect

// That means:

// Unset the lowest 1 bit in n that was created by x + 1

// 🔍 How the Code Finds That Bit
// let bit = 1;
// while (n & bit) {
//     bit <<= 1;
// }


// What this does:

// Starts from the least significant bit

// Skips all trailing 1s

// Stops at the first 0 bit

// At that point:

// bit >> 1 is the lowest contributing 1

// Subtracting it gives the smallest valid x


var minBitwiseArray = function(nums) {
    const ans = [];

    for (const n of nums) {
        // If n is even, it's impossible
        if ((n & 1) === 0) {
            ans.push(-1);
            continue;
        }

        // Find the first 0 bit after trailing 1s
        let bit = 1;
        while (n & bit) {
            bit <<= 1;
        }

        // Unset the lowest contributing 1-bit
        ans.push(n - (bit >> 1));
    }

    return ans;
};