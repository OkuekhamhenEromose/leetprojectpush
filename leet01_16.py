# 2975. Maximum Square Area by Removing Fences From a Field
# Solved
# Medium
# Topics
# premium lock icon
# Companies
# Hint
# There is a large (m - 1) x (n - 1) rectangular field with corners at (1, 1) and (m, n) containing some horizontal and vertical fences given in arrays hFences and vFences respectively.

# Horizontal fences are from the coordinates (hFences[i], 1) to (hFences[i], n) and vertical fences are from the coordinates (1, vFences[i]) to (m, vFences[i]).

# Return the maximum area of a square field that can be formed by removing some fences (possibly none) or -1 if it is impossible to make a square field.

# Since the answer may be large, return it modulo 109 + 7.

# Note: The field is surrounded by two horizontal fences from the coordinates (1, 1) to (1, n) and (m, 1) to (m, n) and two vertical fences from the coordinates (1, 1) to (m, 1) and (1, n) to (m, n). These fences cannot be removed.

 

# Example 1:



# Input: m = 4, n = 3, hFences = [2,3], vFences = [2]
# Output: 4
# Explanation: Removing the horizontal fence at 2 and the vertical fence at 2 will give a square field of area 4.
# Example 2:



# Input: m = 6, n = 7, hFences = [2], vFences = [4]
# Output: -1
# Explanation: It can be proved that there is no way to create a square field by removing fences.

# :::::::::::::::::::::::::  PYTHON  :::::::::::::::::::::::::::
# Maximum Square Area by Removing Fences From a Field". This is a medium-level problem that involves geometry and set-based optimization. The goal is to find the largest square area you can create in a grid-like field by removing some (or none) of the given horizontal and vertical fences, while keeping the boundary fences intact. If no square is possible, return -1; otherwise, return the area modulo 10^9 + 7.
# The code uses a clever approach:

# It calculates all possible "gaps" (distances) between horizontal fences (including boundaries).
# Stores these gaps in a set for O(1) lookups.
# Then, for vertical fences, it checks which gaps match those from horizontals—the largest matching gap d allows a square of side d (area d * d).
# This works because a square requires equal side lengths in both directions, and removing fences effectively "connects" regions by choosing subsets of fences to keep.

# Why this works: The square's sides must align with the remaining fences, but since we can remove inner fences, the possible square sizes are determined by the differences between fence positions (the spans between kept fences). We need matching spans in both horizontal and vertical directions.
# The code is efficient: O(h^2 + v^2) time (where h and v are lengths of hFences and vFences, up to 200 per constraints), which is fine since n,m <= 10^9 but fence counts are small.
# Now, let's break it down section by section, line by line, with explanations, reasoning, examples, and potential pitfalls. I'll use the first example: m=4, n=3, hFences=[2,3], vFences=[2].
# Step 1: Class and Function Signature
# Pythonclass Solution(object):
#     def maximizeSquareArea(self, m, n, hFences, vFences):

# Explanation: This is a standard LeetCode class structure. The method takes:
# m: Number of rows (1 to m).
# n: Number of columns (1 to n).
# hFences: List of horizontal fence rows (between 1 and m, exclusive? No, can be any, but sorted later).
# vFences: List of vertical fence columns (between 1 and n).

# Why? LeetCode expects this format for submissions.
# Type Notes: In Python, no explicit types, but assume integers and lists of integers.
# Example: m=4, n=3, hFences=[2,3], vFences=[2].

# Step 2: Define Modulo Constant
# PythonMOD = 10**9 + 7

# Explanation: Sets the modulo value (1000000007) for large results.
# Why? Area can be up to (10^9)^2 = 10^18, but we return % MOD to fit in 32-bit int.
# Pitfall: Always apply % MOD at the end to avoid overflow (Python ints are arbitrary precision, but good habit).

# Step 3: Add Boundary Fences and Sort
# Python# Add boundary fences
#         h = sorted(hFences + [1, m])
#         v = sorted(vFences + [1, n])

# Explanation:
# Append boundaries (1 and m for horizontals, 1 and n for verticals) because they can't be removed and define the field's edges.
# Sort the lists: Ensures we can compute differences in order.

# Why? Boundaries are fixed, so all possible gaps include them. Sorting allows easy iteration for differences (e.g., h[j] - h[i] for i < j).
# Example:
# hFences=[2,3] + [1,4] → [1,2,3,4] (sorted).
# vFences=[2] + [1,3] → [1,2,3] (sorted).

# Pitfall: If duplicates exist (e.g., fence at boundary), sorting handles them, but differences would be 0 (invalid for area).

# Step 4: Collect All Horizontal Distances
# Python# Collect all horizontal distances
#         h_dist = set()
#         for i in range(len(h)):
#             for j in range(i + 1, len(h)):
#                 h_dist.add(h[j] - h[i])

# Explanation:
# Nested loop: For every pair (i,j) where i < j, compute distance h[j] - h[i].
# Add to a set h_dist for unique distances and fast lookup.

# Why? These distances represent possible "heights" of regions (spans between kept horizontal fences). For a square, the side length must be a distance that appears in both horizontal and vertical gaps.
# Efficiency: O(h^2) where h = len(hFences) + 2 <= 202, so ~40k operations max.
# Example: h=[1,2,3,4]
# Pairs: (1,2)=1, (1,3)=2, (1,4)=3, (2,3)=1, (2,4)=2, (3,4)=1
# h_dist = {1,2,3}


# Step 5: Initialize Max Area and Check Vertical Distances
# Pythonmax_area = -1

#         # Check vertical distances and match with horizontal
#         for i in range(len(v)):
#             for j in range(i + 1, len(v)):
#                 d = v[j] - v[i]
#                 if d in h_dist:
#                     max_area = max(max_area, d * d)

# Explanation:
# Similar nested loop for verticals: Compute d = v[j] - v[i].
# If d exists in h_dist, it's a possible square side → compute area d * d, update max_area.

# Why? Square requires equal side lengths, so only matching d works. We take the max such area.
# Efficiency: O(v^2) <= 40k operations.
# Example: v=[1,2,3]
# Pairs: (1,2)=1, (1,3)=2, (2,3)=1
# Check: 1 in {1,2,3}? Yes → area=1
# 2 in set? Yes → area=4 (max)
# 1 again → ignored
# max_area=4


# Step 6: Return the Result with Modulo
# Pythonreturn max_area % MOD if max_area != -1 else -1

# Explanation: If max_area updated, return it % MOD; else -1.
# Why? Handles no-square case (e.g., no matching d > 0).
# Example: 4 % 1000000007 = 4 (matches output).
# Pitfall: d=0 possible if duplicates, but since fences are distinct (per constraints?), and d= h[j]-h[i] with j>i, d>=1.

# Step 7: Overall Code Insights and Edge Cases

# Time/Space: Time O((len(hFences)^2 + len(vFences)^2)), Space O(len(hFences)^2) worst-case for set.
# Edge Cases:
# No inner fences: hFences=[], vFences=[] → h=[1,m], dist={m-1}; v=[1,n], dist={n-1}. If m-1 == n-1, area=(m-1)^2; else -1 if no match.
# m=2, n=2: Field 1x1, dist=1 both → area=1.
# Unequal dist: Example 2, m=6,n=7, hFences=[2], vFences=[4] → h=[1,2,6], dist={1,5,1+4=5? Wait: 2-1=1,6-1=5,6-2=4} = {1,4,5}; v=[1,4,7], dist={3,6,3}={3,6} → no match → -1.

# ::::::::::::::::::::::::  CODE STRUCTURE  ::::::::::::::::::::::::::
# class Solution(p){
# def maximizeSquareArea(5p){=,2sorted,set,forin(len){forin(2p){.add}}=,forin(len){forin(2p){=,ifin(p){max}}}return%ifelse}


class Solution(object):
    def maximizeSquareArea(self, m, n, hFences, vFences):
        MOD = 10**9 + 7

        # Add boundary fences
        h = sorted(hFences + [1, m])
        v = sorted(vFences + [1, n])

        # Collect all horizontal distances
        h_dist = set()
        for i in range(len(h)):
            for j in range(i + 1, len(h)):
                h_dist.add(h[j] - h[i])

        max_area = -1

        # Check vertical distances and match with horizontal
        for i in range(len(v)):
            for j in range(i + 1, len(v)):
                d = v[j] - v[i]
                if d in h_dist:
                    max_area = max(max_area, d * d)

        return max_area % MOD if max_area != -1 else -1

