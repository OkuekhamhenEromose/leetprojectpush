# 2943. Maximize Area of Square Hole in Grid
# Solved
# Medium
# Topics
# premium lock icon
# Companies
# Hint
# You are given the two integers, n and m and two integer arrays, hBars and vBars. The grid has n + 2 horizontal and m + 2 vertical bars, creating 1 x 1 unit cells. The bars are indexed starting from 1.

# You can remove some of the bars in hBars from horizontal bars and some of the bars in vBars from vertical bars. Note that other bars are fixed and cannot be removed.

# Return an integer denoting the maximum area of a square-shaped hole in the grid, after removing some bars (possibly none).

# :::::::::::::::::::::::::::::::::  PYTHON  :::::::::::::::::::::::::::::::::::
# 🧠 Conceptual Explanation (Tutor Style)

# Let’s break the problem down logically.

# 🔲 Understanding the Grid

# The grid has:

# n + 2 horizontal bars

# m + 2 vertical bars

# Bars create 1 × 1 cells

# You are allowed to remove only specific bars (hBars, vBars)

# Removing consecutive bars creates larger gaps

# 💡 A square hole is formed when:

# You remove k consecutive horizontal bars

# AND remove k consecutive vertical bars

# Resulting hole size = (k + 1) × (k + 1)

# 🔍 Key Insight

# The largest square is determined by the longest consecutive removals in both directions.

# So we must:

# Find the longest consecutive sequence in hBars

# Find the longest consecutive sequence in vBars

# The square side = min(horizontal, vertical) + 1

# Area = side × side

# 🧩 Step-by-Step Logic
# 1️⃣ Sort the Bars
# hBars.sort()
# vBars.sort()


# Sorting helps us detect consecutive indices easily.

# 2️⃣ Find Longest Consecutive Sequence
# def longest_consecutive(arr):


# This function:

# Walks through the sorted list

# Counts how many bars appear back-to-back

# Tracks the maximum streak

# Example:

# [2, 3, 4, 7] → longest = 3

# 3️⃣ Handle Edge Case (No Bars Removed)
# max_h = longest_consecutive(hBars) if hBars else 0
# max_v = longest_consecutive(vBars) if vBars else 0


# If no bars are removable, no expansion occurs.

# 4️⃣ Compute Square Side
# side = min(max_h, max_v) + 1


# Why +1?

# Removing k bars creates k+1 cells

# 5️⃣ Return the Area
# return side * side

# ::::::::::::::::::::::::::::  CODE STRUCTURE  :::::::::::::::::::
# (1) class Solution(p){
# (1a) def maximizeSquareHoleArea(3p){2.sort,
# (1a1) def longest_consecutive(p){2v,forin(2v){if(==){++,=max}else{=}}return}
# (1a2) 2=call,if,else
# (1a3) =min++
# return}
# }


class Solution(object):
    def maximizeSquareHoleArea(self, hBars, vBars):
        hBars.sort()
        vBars.sort()
        def longest_consecutive(arr):
            current = 1
            longest = 1
            for i in range(1, arr[i - 1]):
                if arr[i] == arr[i - 1] + 1:
                    current += 1
                    longest = max(longest, current)

                else:
                    current = 1

            return longest
        max_h = longest_consecutive(hBars) if hBars else 0
        max_v = longest_consecutive(vBars) if vBars else 0
        side = min(max_h, max_v) + 1
        return side * side 



















































# class Solution(object):
#     def maximizeSquareHoleArea(self, hBars, vBars):

#         # Sort the removable bars
#         hBars.sort()
#         vBars.sort()

#         # Function to find the longest consecutive sequence
#         def longest_consecutive(arr):
#             longest = 1
#             current = 1

#             for i in range(1, len(arr)):
#                 if arr[i] == arr[i - 1] + 1:
#                     current += 1
#                     longest = max(longest, current)
#                 else:
#                     current = 1

#             return longest

#         # Longest streak of removable bars in each direction
#         max_h = longest_consecutive(hBars) if hBars else 0
#         max_v = longest_consecutive(vBars) if vBars else 0

#         # The side of the square is limited by the smaller dimension
#         side = min(max_h, max_v) + 1

#         return side * side
