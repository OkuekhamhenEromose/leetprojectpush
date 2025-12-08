// 1925. Count Square Sum Triples
// Solved
// Easy
// Topics
// premium lock icon
// Companies
// Hint
// A square triple (a,b,c) is a triple where a, b, and c are integers and a2 + b2 = c2.

// Given an integer n, return the number of square triples such that 1 <= a, b, c <= n.

 

// Example 1:

// Input: n = 5
// Output: 2
// Explanation: The square triples are (3,4,5) and (4,3,5).
// Example 2:

// Input: n = 10
// Output: 4
// Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).

// ==============================  TYPESCRIPT  ====================

// 🧠 Comprehensive Explanation (as a TypeScript instructor)

// We are given an integer n, and we must count the number of triples:

// (a, b, c) such that 1 ≤ a, b, c ≤ n
// AND a² + b² = c²


// These are Pythagorean triples, but we must count both (a, b, c) AND (b, a, c), as shown in the examples.

// 🧩 Step-by-Step Explanation of the Logic
// 1. Start with a counter
// let count = 0;


// We increase this counter every time we find a valid square triple.

// 2. Loop over all possible values of a and b
// for (let a = 1; a <= n; a++) {
//     for (let b = 1; b <= n; b++) {


// Both a and b independently range from 1 to n.

// This ensures we check every possible pair (a, b).

// This is acceptable because the constraints of the problem are small.

// 3. Compute a² + b² (this gives c²)
// const c2 = a * a + b * b;


// Example:

// If a = 3, b = 4,
// c2 = 9 + 16 = 25.

// 4. Compute the integer value of c
// const c = Math.floor(Math.sqrt(c2));


// Math.sqrt(c2) computes √(a² + b²).

// Math.floor(...) ensures we get the integer part.

// But just because we get an integer doesn't mean it’s valid —
// we must check if it matches exactly.

// 5. Check if c is valid
// if (c * c === c2 && c <= n) {
//     count++;
// }


// This checks two important constraints:

// ✔ Condition 1: c must be a perfect square

// c * c === c2

// Example:

// If c = 5 and c2 = 25, ✓ valid

// If c = 5 but c2 = 26, ✗ invalid

// ✔ Condition 2: c must be between 1 and n

// c <= n

// The problem requires all values a, b, c to be within [1, n].

// If both conditions are satisfied, we count it as a valid square triple.

// 6. Return the total count
// return count;

function countTriples(n: number): number {
    let count = 0;

    for (let a = 1; a <= n; a++) {
        for (let b = 1; b <= n; b++) {

            const c2 = a * a + b * b;   // a² + b²
            const c = Math.floor(Math.sqrt(c2)); // integer square root

            // Check if c is a perfect square AND c ≤ n
            if (c * c === c2 && c <= n) {
                count++;
            }
        }
    }

    return count;
}
