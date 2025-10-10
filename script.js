// 1039. Minimum Score Triangulation of Polygon 10/10/2025
// https://leetcode.com/problems/minimum-score-triangulation-of-polygon/

// ================= LOGIC EXPLANATION =================

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
