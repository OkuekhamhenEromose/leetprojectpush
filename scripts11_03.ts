// 1578. Minimum Time to Make Rope Colorful
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// Alice has n balloons arranged on a rope. You are given a 0-indexed string colors where colors[i] is the color of the ith balloon.

// Alice wants the rope to be colorful. She does not want two consecutive balloons to be of the same color, so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful. You are given a 0-indexed integer array neededTime where neededTime[i] is the time (in seconds) that Bob needs to remove the ith balloon from the rope.

// Return the minimum time Bob needs to make the rope colorful.

 

// Example 1:


// Input: colors = "abaac", neededTime = [1,2,3,4,5]
// Output: 3
// Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
// Bob can remove the blue balloon at index 2. This takes 3 seconds.
// There are no longer two consecutive balloons of the same color. Total time = 3.
// Example 2:


// Input: colors = "abc", neededTime = [1,2,3]
// Output: 0
// Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.
// Example 3:


// Input: colors = "aabaa", neededTime = [1,2,3,4,1]
// Output: 2
// Explanation: Bob will remove the balloons at indices 0 and 4. Each balloons takes 1 second to remove.
// There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.

// ✅ Problem Summary (in plain words)

// You’re given:

// A string colors, where each character represents a balloon's color.

// An array neededTime, where each value represents the time needed to remove that balloon.

// Goal:
// Make the string of balloons colorful — no two adjacent balloons should have the same color.

// To do this, if two or more same-color balloons are next to each other, you must remove some of them.
// But removing a balloon costs time equal to neededTime[i].

// Your task is to compute the minimum total time to make the string colorful.

// ✅ Code with Explanation
// function minCost(colors: string, neededTime: number[]): number {
//     let totalTime = 0;      // Stores the total time spent removing balloons
//     let maxTime = neededTime[0]; // Keeps the highest cost in the current group of same colors

//     // We start checking from the second balloon (index 1)
//     for (let i = 1; i < colors.length; i++) {

//         if (colors[i] === colors[i - 1]) {
//             // Case 1: Same color as previous → we must remove one of them

//             // We always want to REMOVE the balloon with the smaller neededTime
//             totalTime += Math.min(maxTime, neededTime[i]);

//             // And we KEEP the larger time value for comparison with the next balloon
//             // This means we pretend the more expensive balloon is still there
//             maxTime = Math.max(maxTime, neededTime[i]);
//         } else {
//             // Case 2: Different color → no removal needed
//             // Reset maxTime because this is a new color group
//             maxTime = neededTime[i];
//         }
//     }

//     return totalTime;
// }

// ✅ Concept Breakdown
// Variable	Purpose
// totalTime	Accumulates the total time spent removing balloons
// maxTime	Tracks the most expensive (max removal time) balloon in a group of same-colored balloons
// 🔹 How does the logic work?
// 1. Start with the first balloon

// Assume we keep the first balloon.

// Set maxTime = neededTime[0].

// 2. Loop through each next balloon

// At each step, compare the current balloon's color with the previous one.

// ✅ Case 1: Same color (colors[i] === colors[i - 1])

// Now we have a group of repeating colors.

// To avoid duplicates side-by-side, we remove one.

// Which one? Always remove the cheaper one, keep the more expensive.

// So we:

// Add to totalTime: Math.min(maxTime, neededTime[i])

// Update maxTime to keep the higher of the two values

// ✅ Case 2: Different color

// Reset maxTime = neededTime[i] since this is a fresh group.

// ✅ Example Walkthrough

// Let’s say:

// colors = "aabaa"
// neededTime = [1,2,3,4,1]

// Index	Balloon	Cost	Action	totalTime	maxTime
// 0	a	1	Start	0	1
// 1	a	2	Same → remove 1	1	2
// 2	b	3	Different	1	3
// 3	a	4	Different	1	4
// 4	a	1	Same → remove 1	2	4

// ✅ Final totalTime = 2

// ================================  CODE STRUCTURE  ===============================
// (1) funct minCost(2p){2v}
// (1a) for(p){if(===){++.min(),.max()}else{=}}
// (1b) return

function minCost(colors: string, neededTime: number[]): number {
    let totalTime = 0;      // To store total removal time
    let maxTime = neededTime[0]; // Track the highest removal time in the current group

    // Loop from the second balloon to the end
    for (let i = 1; i < colors.length; i++) {
        if (colors[i] === colors[i - 1]) {
            // Same color → must remove one of them
            totalTime += Math.min(maxTime, neededTime[i]); // Remove the smaller cost
            maxTime = Math.max(maxTime, neededTime[i]);    // Keep the bigger cost
        } else {
            // New color → reset maxTime
            maxTime = neededTime[i];
        }
    }

    return totalTime;
}
