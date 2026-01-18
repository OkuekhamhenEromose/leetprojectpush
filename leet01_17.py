
# 🧩 Problem Recap (in simple words)

# You are given several rectangles on a 2D plane.

# Each rectangle is defined by:

# a bottom-left corner

# a top-right corner

# Your task:
# 👉 Find the largest square that can fit inside the overlapping area of at least two rectangles.

# If no two rectangles overlap, return 0.

# 🧠 Core Idea of the Solution

# A square can only fit inside an intersection of rectangles.

# So the strategy is:

# Check every pair of rectangles

# Compute their intersection

# If they overlap:

# Find the largest square that fits inside that overlap

# Keep track of the maximum square area

# 📘 Line-by-Line Explanation
# 🔹 Step 1: Number of rectangles
# n = len(bottomLeft)


# n is the number of rectangles.

# Each rectangle has:

# bottom-left → bottomLeft[i]

# top-right → topRight[i]

# 🔹 Step 2: Track the largest square area
# max_area = 0


# This will store the maximum square area found so far.

# If no valid square exists, it will remain 0.

# 🔹 Step 3: Compare every pair of rectangles
# for i in range(n):
#     for j in range(i + 1, n):


# We check all unique rectangle pairs

# (i, j) ensures:

# No duplicate checks

# No rectangle compared with itself

# 🔹 Step 4: Find intersection boundaries
# left = max(bottomLeft[i][0], bottomLeft[j][0])
# right = min(topRight[i][0], topRight[j][0])
# bottom = max(bottomLeft[i][1], bottomLeft[j][1])
# top = min(topRight[i][1], topRight[j][1])


# These lines compute the overlapping rectangle:

# Boundary	Meaning
# left	Rightmost left edge
# right	Leftmost right edge
# bottom	Highest bottom edge
# top	Lowest top edge

# 📌 This is the standard rectangle intersection formula.

# 🔹 Step 5: Check if intersection exists
# if left < right and bottom < top:


# Why this works:

# left < right → positive width

# bottom < top → positive height

# If either fails → rectangles do not overlap

# 🔹 Step 6: Compute overlap dimensions
# width = right - left
# height = top - bottom


# This gives:

# Width of the overlapping region

# Height of the overlapping region

# 🔹 Step 7: Largest square inside the overlap
# side = min(width, height)


# Why min?

# A square must fit both horizontally and vertically

# The smaller dimension limits the square size

# 📐 Largest square side = min(width, height)

# 🔹 Step 8: Update maximum area
# max_area = max(max_area, side * side)


# Compute square area

# Compare with current maximum

# Keep the larger one

# 🔹 Step 9: Return the result
# return max_area


# If no overlap ever occurred → returns 0

# Otherwise → returns the largest square area found

class Solution(object):
    def largestSquareArea(self, bottomLeft, topRight):
        n = len(bottomLeft)
        max_area = 0

        for i in range(n):
            for j in range(i + 1, n):
                # Overlapping rectangle boundaries
                left = max(bottomLeft[i][0], bottomLeft[j][0])
                right = min(topRight[i][0], topRight[j][0])
                bottom = max(bottomLeft[i][1], bottomLeft[j][1])
                top = min(topRight[i][1], topRight[j][1])

                # Check if rectangles intersect
                if left < right and bottom < top:
                    width = right - left
                    height = top - bottom
                    side = min(width, height)
                    max_area = max(max_area, side * side)

        return max_area
