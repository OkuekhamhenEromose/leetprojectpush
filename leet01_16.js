
// ==================================  JAVASCRIPT  ==================================
// 📚 COMPREHENSIVE LINE-BY-LINE EXPLANATION
// 1️⃣ Modulo as BigInt
// const MOD = 1000000007n;


// The n suffix makes this a BigInt

// BigInt cannot mix with normal numbers

// Required for safe modulo operations

// 2️⃣ Add boundary fences
// hFences.push(1, m);
// vFences.push(1, n);


// Why?

// The field is always bounded

// These fences cannot be removed

// We must include them so distance calculations are correct

// Example:

// Top fence → 1
// Bottom fence → m

// 3️⃣ Sort fences
// hFences.sort((a, b) => a - b);
// vFences.sort((a, b) => a - b);


// Sorting ensures:

// Distances are computed correctly

// hFences[j] - hFences[i] is always positive

// 4️⃣ Compute ALL horizontal distances
// const hDistances = new Set();


// Why a Set?

// Fast lookup → O(1)

// Avoid duplicate distances

// Nested loop
// for (let i = 0; i < hFences.length; i++) {
//     for (let j = i + 1; j < hFences.length; j++) {
//         hDistances.add(BigInt(hFences[j] - hFences[i]));
//     }
// }


// What this does:

// Considers every possible pair of horizontal fences

// Computes distance between them

// Stores the distance as BigInt

// 📌 These distances represent possible square heights

// 5️⃣ Search for matching vertical distances
// let maxArea = -1n;


// -1n means “square not found yet”

// BigInt again for safety

// Nested loop over vertical fences
// for (let i = 0; i < vFences.length; i++) {
//     for (let j = i + 1; j < vFences.length; j++) {
//         const d = BigInt(vFences[j] - vFences[i]);


// Each d represents a possible square width

// 6️⃣ Check if square is possible
// if (hDistances.has(d)) {


// If:

// Same distance exists horizontally and vertically

// ➡️ A square of side d is possible

// 7️⃣ Compute area safely
// const area = d * d;


// Why BigInt?

// d may be up to 1e9

// d² may be up to 1e18

// JS number would fail here ❌

// 8️⃣ Track maximum area
// if (area > maxArea) maxArea = area;


// Keep only the largest square

// 9️⃣ Final return
// return maxArea === -1n ? -1 : Number(maxArea % MOD);


// If no square found → -1

// Else:

// Apply modulo (BigInt safe)

// Convert back to number (LeetCode expects number)

var maximizeSquareArea = function (m, n, hFences, vFences) {
    const MOD = 1000000007n;

    hFences.push(1, m);
    vFences.push(1, n);

    hFences.sort((a, b) => a - b);
    vFences.sort((a, b) => a - b);

    // Store horizontal distances as BigInt
    const hDistances = new Set();
    for (let i = 0; i < hFences.length; i++) {
        for (let j = i + 1; j < hFences.length; j++) {
            hDistances.add(BigInt(hFences[j] - hFences[i]));
        }
    }

    let maxArea = -1n;

    for (let i = 0; i < vFences.length; i++) {
        for (let j = i + 1; j < vFences.length; j++) {
            const d = BigInt(vFences[j] - vFences[i]);
            if (hDistances.has(d)) {
                const area = d * d;
                if (area > maxArea) maxArea = area;
            }
        }
    }

    return maxArea === -1n ? -1 : Number(maxArea % MOD);
};
