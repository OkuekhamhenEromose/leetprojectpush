// 2211. Count Collisions on a Road
// Solved
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// There are n cars on an infinitely long road. The cars are numbered from 0 to n - 1 from left to right and each car is present at a unique point.

// You are given a 0-indexed string directions of length n. directions[i] can be either 'L', 'R', or 'S' denoting whether the ith car is moving towards the left, towards the right, or staying at its current point respectively. Each moving car has the same speed.

// The number of collisions can be calculated as follows:

// When two cars moving in opposite directions collide with each other, the number of collisions increases by 2.
// When a moving car collides with a stationary car, the number of collisions increases by 1.
// After a collision, the cars involved can no longer move and will stay at the point where they collided. Other than that, cars cannot change their state or direction of motion.

// Return the total number of collisions that will happen on the road.

 

// Example 1:

// Input: directions = "RLRSLL"
// Output: 5
// Explanation:
// The collisions that will happen on the road are:
// - Cars 0 and 1 will collide with each other. Since they are moving in opposite directions, the number of collisions becomes 0 + 2 = 2.
// - Cars 2 and 3 will collide with each other. Since car 3 is stationary, the number of collisions becomes 2 + 1 = 3.
// - Cars 3 and 4 will collide with each other. Since car 3 is stationary, the number of collisions becomes 3 + 1 = 4.
// - Cars 4 and 5 will collide with each other. After car 4 collides with car 3, it will stay at the point of collision and get hit by car 5. The number of collisions becomes 4 + 1 = 5.
// Thus, the total number of collisions that will happen on the road is 5. 
// Example 2:

// Input: directions = "LLRR"
// Output: 0
// Explanation:
// No cars will collide with each other. Thus, the total number of collisions that will happen on the road is 0.
 

// Constraints:

// 1 <= directions.length <= 105
// directions[i] is either 'L', 'R', or 'S'


// 🚗 Comprehensive Explanation of the Logic

// This solution solves the LeetCode problem “2211. Count Collisions on a Road” in the most optimal way — without simulating car movement.

// The key idea:
// 👉 Only certain parts of the road cause collisions, and the rest can be ignored.

// Let's break down the code step-by-step like a JavaScript expert instructor.

// ✅ Step 1 — Remove leading 'L' cars
// let i = 0;
// while (i < directions.length && directions[i] === 'L') {
//     i++;
// }

// Why remove leading 'L'?

// Cars at the far left moving left (L) will drive off the road.

// They never touch any other car.

// Thus, they can never cause collisions.

// Example:

// LLLRSRL
// ^^^ cars here move off-road


// So we move the pointer i forward until we reach a character that is NOT L.

// After this loop:
// → i points to the first car that might cause a collision.

// ✅ Step 2 — Remove trailing 'R' cars
// let j = directions.length - 1;
// while (j >= 0 && directions[j] === 'R') {
//     j--;
// }

// Why remove trailing 'R'?

// Cars at the far right that move right (R) go into infinity.

// They never meet another car.

// So they cannot collide.

// Example:

// RLLRSRRRR
//         ^^^^ go off-road


// After the loop:
// → j points to the last car that might collide.

// 🚧 Now we have the “collision core”

// The string is now logically trimmed to:

// directions[i ... j]


// Inside this segment:

// There are no leading “L” cars escaping left

// There are no trailing “R” cars escaping right

// Every remaining moving car will eventually hit something and collide.

// ✅ Step 3 — Count collisions inside the core
// let collisions = 0;
// for (let k = i; k <= j; k++) {
//     if (directions[k] !== 'S') collisions++;
// }

// Why count only cars that are NOT 'S'?

// Inside the core:

// 'L' (moving left)

// 'R' (moving right)

// These cars must collide eventually, because:

// They are bounded by the trimmed region

// No car inside the core escapes

// Moving cars collide into stationary or incoming cars → become stationary

// Once stationary, they form a barrier for others

// Thus:

// Every L contributes 1 collision

// Every R contributes 1 collision

// S (already stationary) does not add itself to collisions

// So the rule is simple:

// 👉 Inside the core, every moving car = one collision.

// This matches the collision rules because:

// R → L = 2 collisions (both eventually counted)

// R → S = 1 collision

// L → S = 1 collision

// Across the trimmed region, the counting matches the behavior perfectly.

// ✅ Step 4 — Return the total
// return collisions;


// This is the final result.

// 🧠 Why this solution works (Intuition)

// The clever strategy is avoiding full simulation.
// You only focus on cars that cannot escape.

// Cars that escape:

// Leading Ls → fall off the left end

// Trailing Rs → fall off the right end

// Remove them.

// Cars that remain inside:

// All moving cars here must collide because they are trapped.

// Therefore:
// 👉 Count all moving cars inside the middle.

// ========================  CODE STRUCTURE  ==================
// (1) funct countCollisions(p){
// (1a) v,while(<.length===){}
// (1b) v,while(>=.length===){}
// (1c) v,for(p){if(!==){}}
// (1d) return}



// NB = we are looking for or creating possible cases of  collisions
/**
 * @param {string} directions
 * @return {number}
 * 
 */
// var countCollisions = function(directions) {
//     // 1. Remove leading L's — they move left off the road (no collision)
//     let i = 0;
//     while (i < directions.length && directions[i] === 'L') {
//         i++;
//     }

//     // 2. Remove trailing R's — they move right off the road (no collision)
//     let j = directions.length - 1;
//     while (j >= 0 && directions[j] === 'R') {
//         j--;
//     }

//     // 3. Count all moving cars (L or R) inside the trimmed middle.
//     // Every moving car inside the core will eventually collide.
//     let collisions = 0;
//     for (let k = i; k <= j; k++) {
//         if (directions[k] !== 'S') collisions++;
//     }

//     return collisions;
// };


