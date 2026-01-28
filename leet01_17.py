# 3047. Find the Largest Area of Square Inside Two Rectangles
# Solved
# Medium
# Topics
# premium lock icon
# Companies
# Hint
# There exist n rectangles in a 2D plane with edges parallel to the x and y axis. You are given two 2D integer arrays bottomLeft and topRight where bottomLeft[i] = [a_i, b_i] and topRight[i] = [c_i, d_i] represent the bottom-left and top-right coordinates of the ith rectangle, respectively.

# You need to find the maximum area of a square that can fit inside the intersecting region of at least two rectangles. Return 0 if such a square does not exist.

 

# Example 1:


# Input: bottomLeft = [[1,1],[2,2],[3,1]], topRight = [[3,3],[4,4],[6,6]]

# Output: 1

# Explanation:

# A square with side length 1 can fit inside either the intersecting region of rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is 1. It can be shown that a square with a greater side length can not fit inside any intersecting region of two rectangles.

# Example 2:


# Input: bottomLeft = [[1,1],[1,3],[1,5]], topRight = [[5,5],[5,7],[5,9]]

# Output: 4

# Explanation:

# A square with side length 2 can fit inside either the intersecting region of rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is 2 * 2 = 4. It can be shown that a square with a greater side length can not fit inside any intersecting region of two rectangles.

# Example 3:

  
# Input: bottomLeft = [[1,1],[2,2],[1,2]], topRight = [[3,3],[4,4],[3,4]]

# Output: 1

# Explanation:

# A square with side length 1 can fit inside the intersecting region of any two rectangles. Also, no larger square can, so the maximum area is 1. Note that the region can be formed by the intersection of more than 2 rectangles.

# Example 4:

  
# Input: bottomLeft = [[1,1],[3,3],[3,1]], topRight = [[2,2],[4,4],[4,2]]

# Output: 0

# :::::::::::::::::::::::::::  PYTHON  :::::::::::::::::::::::::::::
# This is a medium-level problem involving geometry and intersection calculations in a 2D plane. The goal is to find the maximum area of a square that can fit inside the intersecting region of at least two rectangles (with edges parallel to axes). The rectangles are given by their bottom-left and top-right coordinates. If no such square exists (e.g., no intersections), return 0.
# Key concepts:

# Rectangles: Defined by bottomLeft[i] = [a_i, b_i] (bottom-left x,y) and topRight[i] = [c_i, d_i] (top-right x,y).
# Intersection: For two rectangles to overlap, their projections on x and y axes must overlap.
# Square in Intersection: The largest square fits by taking the minimum of the intersection's width and height, then squaring it.
# At Least Two: We check pairs (brute-force), but intersections can involve more (implicitly covered by pair-wise checks).
# Output: Area (side^2), or 0 if impossible.

# The code uses a brute-force O(n^2) approach: Iterate over all pairs of rectangles, compute their intersection (if any), find the max square side as min(width, height), and track the global max area. Efficient for small n (constraints likely n <= 100, as O(n^2) ~10k operations).
# Now, let's break it down section by section, line by line, with explanations, reasoning, examples (using Example 1: bottomLeft=[[1,1],[2,2],[3,1]], topRight=[[3,3],[4,4],[6,6]] → output 1), and edge cases.
# Step 1: Class and Function Signature
# Pythonclass Solution(object):
#     def largestSquareArea(self, bottomLeft, topRight):

# Explanation: Standard LeetCode structure. The method takes two lists:
# bottomLeft: List of [x,y] lists (bottom-left coords).
# topRight: List of [x,y] lists (top-right coords, corresponding to bottomLeft).

# Why? LeetCode runs it as Solution().largestSquareArea(...).
# Assumptions: Assume valid input (a_i < c_i, b_i < d_i, coords integers).
# Example Setup: n=3 rectangles:
# Rect 0: (1,1) to (3,3)
# Rect 1: (2,2) to (4,4)
# Rect 2: (3,1) to (6,6)


# Step 2: Get Number of Rectangles and Initialize Max Area
# Pythonn = len(bottomLeft)
#         max_area = 0

# Explanation: n caches the number of rectangles (len(bottomLeft) == len(topRight)).
# max_area tracks the largest square area found (starts at 0, as per "return 0 if none").

# Why? We'll loop over pairs, updating if a larger area is found.
# Example: n=3, max_area=0 initially.

# Step 3: Nested Loop Over All Pairs of Rectangles
# Pythonfor i in range(n):
#             for j in range(i + 1, n):

# Explanation: Outer loop i from 0 to n-1; inner j from i+1 to n-1.
# This checks every unique pair (i,j) where i < j, avoiding self-pairs and duplicates.

# Why? We need intersections of at least two rectangles → pairs suffice (if more overlap, their pair-wise intersections cover it).
# Efficiency: O(n^2/2) iterations, fine for small n.
# Example: Pairs: (0,1), (0,2), (1,2).

# Step 4: Compute Intersection Boundaries
# Python# Overlapping rectangle boundaries
#                 left = max(bottomLeft[i][0], bottomLeft[j][0])
#                 right = min(topRight[i][0], topRight[j][0])
#                 bottom = max(bottomLeft[i][1], bottomLeft[j][1])
#                 top = min(topRight[i][1], topRight[j][1])

# Explanation: For pair (i,j), compute intersection:
# X-axis overlap: left = max of left edges, right = min of right edges.
# Y-axis overlap: bottom = max of bottoms, top = min of tops.

# Why? Standard axis-aligned rectangle intersection formula. If left < right and bottom < top, they overlap.
# Example (pair 0,1):
# left = max(1,2)=2
# right = min(3,4)=3
# bottom = max(1,2)=2
# top = min(3,4)=3

# Pitfall: If no overlap, left >= right or bottom >= top (handled next).

# Step 5: Check if Rectangles Intersect
# Python# Check if rectangles intersect
#                 if left < right and bottom < top:

# Explanation: If overlap on both axes (positive width and height), proceed.
# Why? No intersection → no square possible for this pair.
# Example (pair 0,1): 2<3 and 2<3 → yes.
# Example (non-overlap, like in Example 4): If left >= right, skip.

# Step 6: Compute Square Area in Intersection
# Pythonwidth = right - left
#                     height = top - bottom
#                     side = min(width, height)
#                     max_area = max(max_area, side * side)

# Explanation:
# width and height: Dimensions of intersection rectangle.
# side: Largest square side = min(width, height) (square must fit entirely).
# Update max_area with side * side.

# Why? Square requires equal sides; min ensures it fits. We assume integer coords, so side is int (area int).
# Example (pair 0,1): width=3-2=1, height=3-2=1, side=1, area=1 → max_area=1.
# Example (pair 0,2): left=max(1,3)=3, right=min(3,6)=3 → 3<3? No → skip.
# Example (pair 1,2): left=max(2,3)=3, right=min(4,6)=4, bottom=max(2,1)=2, top=min(4,6)=4 → 3<4 and 2<4 → width=1, height=2, side=1, area=1 (max_area remains 1).

# Step 7: Return the Max Area
# Pythonreturn max_area

# Explanation: After all pairs, return the largest area found (0 if none).
# Why? Covers all possible intersections.
# Example: Returns 1.

# ::::::::::::::::::::::::::  CODE STRUCTURE  ::::::::::::::::::::::::::::
# (1) class Solution(object){
# (1a) def largestSquareArea(3p){
# (1a1) vlen,=,for(p){for(p){4=,if(and){4=}}}
# return 



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
