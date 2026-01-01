# 1970. Last Day Where You Can Still Cross
# Solved
# Hard
# Topics
# premium lock icon
# Companies
# Hint
# There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.

# Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).

# You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).

# Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

 

# Example 1:


# Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
# Output: 2
# Explanation: The above image depicts how the matrix changes each day starting from day 0.
# The last day where it is possible to cross from top to bottom is on day 2.
# Example 2:


# Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
# Output: 1
# Explanation: The above image depicts how the matrix changes each day starting from day 0.
# The last day where it is possible to cross from top to bottom is on day 1.
# Example 3:


# Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
# Output: 3
# Explanation: The above image depicts how the matrix changes each day starting from day 0.
# The last day where it is possible to cross from top to bottom is on day 3.

# ::::::::::::::::::::::::::::::::  PYTHON  :::::::::::::::::::::::
# 🧠 Comprehensive Explanation (Python Tutor Style)

# This problem combines graphs, BFS, and binary search.

# 🔍 Problem Breakdown

# Grid starts fully land

# Each day, one cell turns into water

# You can move up, down, left, right

# Goal: last day you can walk from top row → bottom row using only land

# Brute force day-by-day simulation would be too slow.

# 💡 Key Insight

# If you cannot cross on day D,
# then you also cannot cross on any day after D

# This creates a monotonic condition, which is perfect for binary search.

# 🚀 Strategy Overview
# Step 1: Binary Search on the Day

# We search for the maximum day d where crossing is still possible.

# left = 1

# right = total number of days

# Try mid day

# Check if crossing is possible

# Step 2: Check If Crossing Is Possible (BFS)

# For a given day:

# Build the grid

# Flood all cells from day 1 to day

# Start BFS from all land cells in the top row

# Move only through land

# If we reach bottom row → crossing is possible

# 🧩 Why BFS?

# We are checking connectivity

# BFS efficiently explores all reachable land

# Time complexity per check: O(row × col)

# 🔄 Binary Search + BFS Flow
# Day range: 1 → N
#       ↓
# Pick mid day
#       ↓
# Flood grid up to that day
#       ↓
# BFS from top
#       ↓
# Can reach bottom?
#       ↓
# Yes → search right
# No  → search left

# 📌 Why This Is Efficient
# Component	Complexity
# BFS	O(row × col)
# Binary search	O(log(row × col))
# Total	O(row × col × log(row × col))

# ✔ Works for large inputs
# ✔ Passes all constraints

# 🧠 Example Walkthrough (Example 1)
# row = 2, col = 2
# cells = [[1,1],[2,1],[1,2],[2,2]]


# Day 1 → still path

# Day 2 → still path

# Day 3 → no path

# ➡ Answer = 2

from collections import deque

class Solution(object):
    def latestDayToCross(self, row, col, cells):
        """
        :type row: int
        :type col: int
        :type cells: List[List[int]]
        :rtype: int
        """

        # Helper function: can we cross on `day`?
        def can_cross(day):
            # Build grid: 0 = land, 1 = water
            grid = [[0] * col for _ in range(row)]
            for i in range(day):
                r, c = cells[i]
                grid[r - 1][c - 1] = 1

            queue = deque()

            # Start BFS from all land cells in top row
            for c in range(col):
                if grid[0][c] == 0:
                    queue.append((0, c))
                    grid[0][c] = 1  # mark visited

            directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

            while queue:
                r, c = queue.popleft()

                # Reached bottom row
                if r == row - 1:
                    return True

                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < row and 0 <= nc < col and grid[nr][nc] == 0:
                        grid[nr][nc] = 1
                        queue.append((nr, nc))

            return False

        # Binary search on days
        left, right = 1, len(cells)
        answer = 0

        while left <= right:
            mid = (left + right) // 2
            if can_cross(mid):
                answer = mid
                left = mid + 1
            else:
                right = mid - 1

        return answer
