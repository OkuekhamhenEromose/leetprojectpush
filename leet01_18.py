# 1895. Largest Magic Square
# Medium
# Topics
# premium lock icon
# Companies
# Hint
# A k x k magic square is a k x k grid filled with integers such that every row sum, every column sum, and both diagonal sums are all equal. The integers in the magic square do not have to be distinct. Every 1 x 1 grid is trivially a magic square.

# Given an m x n integer grid, return the size (i.e., the side length k) of the largest magic square that can be found within this grid.

 

# Example 1:


# Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
# Output: 3
# Explanation: The largest magic square has a size of 3.
# Every row sum, column sum, and diagonal sum of this magic square is equal to 12.
# - Row sums: 5+1+6 = 5+4+3 = 2+7+3 = 12
# - Column sums: 5+5+2 = 1+4+7 = 6+3+3 = 12
# - Diagonal sums: 5+4+3 = 6+4+2 = 12
# Example 2:


# Input: grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
# Output: 2


# ::::::::::::::::::::  PYTHON  :::::::::::::::::::::::::::::::

# This is a medium-level problem where you're given an m x n grid of integers, and you need to find the largest side length k for a k x k subgrid that forms a "magic square". A magic square means all row sums, column sums, and both diagonal sums are equal (numbers can repeat, and 1x1 is always magic).
# Key concepts:

# Magic Square: kxk grid with equal sums for rows, columns, main diagonal, and anti-diagonal.
# Approach: Use prefix sums for fast row/column sum queries. Start from largest possible k down to 2, check all possible subgrids, verify if magic.
# Efficiency: O(m * n * min(m,n)^2) time — for each k, check O((m-k+1)*(n-k+1)) positions, each verifying O(k) sums. With m,n <=50, it's ~50^4 = 6.25M operations, acceptable.
# Always Return at Least 1: Every single cell is a trivial magic square.

# The code precomputes row and column prefix sums, defines helpers for sum queries, then brute-forces from large k to small, checking conditions. If found, return k; else 1.
# Let's break it down section by section, line by line, with explanations, reasoning, TypeScript notes (wait, Python here), examples using Example 1 (grid 4x5, output 3), and edge cases.
# Step 1: Class and Function Signature
# Pythonclass Solution(object):
#     def largestMagicSquare(self, grid):

# Explanation: Standard LeetCode class. Method takes grid: List of lists (m rows, n columns of integers).
# Why? LeetCode instantiates Solution and calls this.
# Assumptions: grid non-empty, rectangular, integers (positive/negative per constraints).
# Example: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]] → m=4, n=5.

# Step 2: Get Grid Dimensions
# Pythonm, n = len(grid), len(grid[0])

# Explanation: m = rows, n = columns.
# Why? Used for loops and bounds.
# Example: m=4, n=5.

# Step 3: Build Prefix Sum Arrays
# Python# Prefix sums for rows and columns
#         rowPrefix = [[0] * (n + 1) for _ in range(m)]
#         colPrefix = [[0] * n for _ in range(m + 1)]

#         for i in range(m):
#             for j in range(n):
#                 rowPrefix[i][j + 1] = rowPrefix[i][j] + grid[i][j]
#                 colPrefix[i + 1][j] = colPrefix[i][j] + grid[i][j]

# Explanation:
# rowPrefix[i][j+1] = sum of grid[i][0..j] (inclusive prefix).
# colPrefix[i+1][j] = sum of grid[0..i][j].
# Nested loop fills them cumulatively.

# Why? Allows O(1) range sums: row sum from c1 to c2-1 = rowPrefix[r][c2] - rowPrefix[r][c1].
# Efficiency: O(m*n) precompute.
# Example (partial): For row 0: rowPrefix[0] = [0,7,8,12,17,23]
# Pitfall: Extra column/row for 0-prefix (handles edge c1=0).

# Step 4: Define Helper Functions for Sums
# Python# Helper functions
#         def rowSum(r, c1, c2):
#             return rowPrefix[r][c2] - rowPrefix[r][c1]

#         def colSum(c, r1, r2):
#             return colPrefix[r2][c] - colPrefix[r1][c]

# Explanation:
# rowSum(r, c1, c2): Sum grid[r][c1 .. c2-1]
# colSum(c, r1, r2): Sum grid[r1 .. r2-1][c]

# Why? Clean O(1) queries for row/column sums in subgrid.
# Note: c2/r2 exclusive (standard prefix).

# Step 5: Loop Over Possible Sizes k (Largest to Smallest)
# Python# Try sizes from largest to smallest
#         maxSize = min(m, n)
#         for k in range(maxSize, 1, -1):

# Explanation: maxSize = max possible k. Loop k from max to 2 (step -1).
# Why? Find largest first; return immediately when found. Skip 1 (always possible, returned later).
# Example: maxSize=4 (min(4,5)), loop k=4,3,2.

# Step 6: Nested Loops Over Subgrid Positions
# Pythonfor i in range(m - k + 1):
#                 for j in range(n - k + 1):

# Explanation: For each k, try all top-left positions (i,j) where subgrid fits: i up to m-k+1, j up to n-k+1.
# Why? Brute-check all possible kxk subgrids.
# Example (k=3): i=0 to 1 (4-3+1=2), j=0 to 2 (5-3+1=3) → positions like (0,0), (0,1), etc.

# Step 7: Set Target Sum and Check Rows
# Pythontarget = rowSum(i, j, j + k)

#                     # Check all rows
#                     if any(rowSum(i + r, j, j + k) != target for r in range(k)):
#                         continue

# Explanation:
# target = sum of first row in subgrid (as reference).
# any(...): If any row r=0 to k-1 sum != target, skip (continue).

# Why? All rows must == target for magic.
# Example (subgrid at i=1,j=1, k=3): Subgrid [[5,1,6],[5,4,3],[2,7,3]]
# target = rowSum(1,1,4) = 5+1+6=12
# Row 2 (i+1=2): 5+4+3=12
# Row 3 (i+2=3): 2+7+3=12 → all match.


# Step 8: Check All Columns
# Python# Check all columns
#                     if any(colSum(j + c, i, i + k) != target for c in range(k)):
#                         continue

# Explanation: Similar: Check each column c=0 to k-1 sum == target.
# Why? Columns must match.
# Example: Col 0 (j=1,c=0): colSum(1,1,4) = grid[1][1]+[2][1]+[3][1] =5+5+2=12
# Similarly others=12 → pass.


# Step 9: Check Main Diagonal
# Python# Check main diagonal
#                     if sum(grid[i + d][j + d] for d in range(k)) != target:
#                         continue

# Explanation: Sum top-left to bottom-right: grid[i+d][j+d] for d=0 to k-1.
# Why? Main diagonal must == target.
# Example: 5 (1,1) +4 (2,2) +3 (3,3) =12 → pass.

# Step 10: Check Anti-Diagonal
# Python# Check anti-diagonal
#                     if sum(grid[i + d][j + k - 1 - d] for d in range(k)) != target:
#                         continue

# Explanation: Sum top-right to bottom-left: grid[i+d][j+k-1-d].
# Why? Anti-diagonal must match.
# Example: 6 (1,3) +4 (2,2) +2 (3,1) =12 → pass.
# If all pass: Return k (here 3).

# Step 11: Default Return for 1x1
# Pythonreturn 1

# Explanation: If no k>=2 found, return 1 (always possible).
# Example: If no larger, but here 3 found earlier.

# Summary and Key Insights

# Correctness: Prefix + brute-check ensures all conditions.
# Efficiency: O(mnmin(m,n)^2), fine for m,n<=50.
# Edge Cases:
# 1x1 grid: Return 1.
# No magic >1 (Example 2): Return 2 (found), or 1 if none.
# Negative numbers: Handled (sums can be negative).
# k= min(m,n): Checks full grid if magic.

# Optimizations: Diagonals O(k), not prefix (rarely bottleneck).
# Tutor Tip: Prefix sums key for range queries. Visualize subgrids!

# :::::::::::::::::::::::::::  CODE STRUCTURE  :::::::::::::::::::::
# (1) class Solution(p){
# (1a) def largestMagicSquare(2p){
# (1b) 2vlen,2vforin,forin(p){forin(p){2=+}}
# (1c) def rowSum(3p){return-},def colSum(p){return-},vmin
# (1d) forin(3p){forin(-+){forin(-+){vcall,2ifany(call)!=,2ifsumforin,return}}}
# return
# }


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
