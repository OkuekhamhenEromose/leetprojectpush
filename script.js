// 1039. Minimum Score Triangulation of Polygon 10/10/2025
// https://leetcode.com/problems/minimum-score-triangulation-of-polygon/

// ================= LOGIC EXPLANATION =================
// 🔍 Code Explanation Line-by-Line
// const n = values.length;
// const dp = Array.from({ length: n }, () => Array(n).fill(0));


// We create a 2D dp array of size n x n.
// dp[i][j] will store the minimum score for triangulating the sub-polygon from vertex i to j.

// Initially, all values are 0 because the smallest polygons (with < 3 vertices) have no triangles.

// for (let gap = 2; gap < n; gap++) {


// We start from smaller sub-polygons and build up.
// The variable gap represents how far apart the vertices i and j are:

// gap = 2 → 3 vertices (smallest possible triangle)

// gap = 3 → 4 vertices (can form two triangles)

// ...

// gap = n-1 → full polygon

// for (let i = 0; i + gap < n; i++) {
//     const j = i + gap;
//     dp[i][j] = Infinity;


// For each possible sub-polygon (i ... j),
// we initialize dp[i][j] as Infinity (we’ll find the minimum later).
// j is the right endpoint of the sub-polygon.

// for (let k = i + 1; k < j; k++) {
//     const score = dp[i][k] + dp[k][j] + values[i] * values[j] * values[k];
//     dp[i][j] = Math.min(dp[i][j], score);
// }


// We try placing a “cut” at every possible middle vertex k (between i and j).

// dp[i][k] = min score for the left part

// dp[k][j] = min score for the right part

// values[i]*values[j]*values[k] = score of the triangle formed with these 3 vertices

// We take the minimum of all such possibilities.

// return dp[0][n - 1];


// Finally, the entire polygon goes from vertex 0 to vertex n-1.
// So dp[0][n-1] holds the minimum triangulation score for the whole polygon.

// 🧮 Example Walkthrough

// For values = [3,7,4,5]:

// Start with gap = 2 → compute base triangles

// Then gap = 3 → consider entire polygon

// Possible triangulations:

// (3,7,5) and (7,4,5) → 3*7*5 + 7*4*5 = 245

// (3,4,5) and (3,7,4) → 3*4*5 + 3*7*4 = 60 + 84 = 144

// ✅ The minimum is 144, so dp[0][3] = 144.

// ================= END OF EXPLANATION =================

// ================ CODE-STRUCTURE =================
// (1) funct minScoreTriangulation(values) {V.length,V.from(.fill),for(gap){for(i){v,VInfinity,for(k){V,Math.min}}}return}

/**
 * @param {number[]} values
 * @return {number}
 */
var minScoreTriangulation = function(values) {
    const n = values.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // gap is the length of sub-polygon
    for (let gap = 2; gap < n; gap++) {
        for (let i = 0; i + gap < n; i++) {
            const j = i + gap;
            dp[i][j] = Infinity;
            for (let k = i + 1; k < j; k++) {
                const score = dp[i][k] + dp[k][j] + values[i] * values[j] * values[k];
                dp[i][j] = Math.min(dp[i][j], score);
            }
        }
    }

    return dp[0][n - 1];
};
