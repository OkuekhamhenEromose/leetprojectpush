# 🧠 Tutor-Style Explanation
# 🔹 What Is a Magic Square?

# A k × k magic square satisfies:

# All row sums are equal

# All column sums are equal

# Both diagonal sums are equal
# ✔ A 1×1 grid is always magic

# 🧩 Strategy Overview

# We want the largest possible k, so we:

# Try square sizes from largest → smallest

# For each k×k subgrid:

# Compare row sums

# Compare column sums

# Compare both diagonals

# Return the first valid k

# 🚀 Optimization with Prefix Sums

# Instead of recomputing sums repeatedly (slow), we precompute prefix sums:

# Row prefix sum
# rowPrefix[i][j] = sum of grid[i][0..j-1]

# Column prefix sum
# colPrefix[i][j] = sum of grid[0..i-1][j]


# This allows O(1) row/column sum queries.

# 🔧 Helper Functions
# def rowSum(r, c1, c2):
#     return rowPrefix[r][c2] - rowPrefix[r][c1]

# def colSum(c, r1, r2):
#     return colPrefix[r2][c] - colPrefix[r1][c]


# These return the sum of any row segment or column segment instantly.

# 🔁 Main Loop Breakdown
# 1️⃣ Try all square sizes (largest first)
# for k in range(maxSize, 1, -1):

# 2️⃣ Slide the k×k window across the grid
# for i in range(m - k + 1):
#     for j in range(n - k + 1):

# 3️⃣ Set the target sum (first row)
# target = rowSum(i, j, j + k)

# 4️⃣ Validate rows
# if any(rowSum(i + r, j, j + k) != target for r in range(k)):
#     continue

# 5️⃣ Validate columns
# if any(colSum(j + c, i, i + k) != target for c in range(k)):
#     continue

# 6️⃣ Validate diagonals
# sum(grid[i + d][j + d] for d in range(k))        # main diagonal
# sum(grid[i + d][j + k - 1 - d] for d in range(k)) # anti-diagonal

# 7️⃣ Success → return k
# return k

# ⏱️ Time & Space Complexity
# Time

# Worst case: O(min(m,n) × m × n × k)

# Efficient enough since m,n ≤ 50

# Space

# Prefix sums: O(m × n)

class Solution(object):
    def largestMagicSquare(self, grid):
        m, n = len(grid), len(grid[0])

        # Prefix sums for rows and columns
        rowPrefix = [[0] * (n + 1) for _ in range(m)]
        colPrefix = [[0] * n for _ in range(m + 1)]

        for i in range(m):
            for j in range(n):
                rowPrefix[i][j + 1] = rowPrefix[i][j] + grid[i][j]
                colPrefix[i + 1][j] = colPrefix[i][j] + grid[i][j]

        # Helper functions
        def rowSum(r, c1, c2):
            return rowPrefix[r][c2] - rowPrefix[r][c1]

        def colSum(c, r1, r2):
            return colPrefix[r2][c] - colPrefix[r1][c]

        # Try sizes from largest to smallest
        maxSize = min(m, n)
        for k in range(maxSize, 1, -1):
            for i in range(m - k + 1):
                for j in range(n - k + 1):

                    target = rowSum(i, j, j + k)

                    # Check all rows
                    if any(rowSum(i + r, j, j + k) != target for r in range(k)):
                        continue

                    # Check all columns
                    if any(colSum(j + c, i, i + k) != target for c in range(k)):
                        continue

                    # Check main diagonal
                    if sum(grid[i + d][j + d] for d in range(k)) != target:
                        continue

                    # Check anti-diagonal
                    if sum(grid[i + d][j + k - 1 - d] for d in range(k)) != target:
                        continue

                    return k

        return 1
