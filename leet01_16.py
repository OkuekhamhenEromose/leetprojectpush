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
    


# 📘 Tutor-Style Explanation
# 📌 Step 1: Understand the Field

# The field is bounded by fixed fences

# Internal fences may be removed

# Removing fences merges smaller rectangles into larger ones

# 📌 Step 2: What Makes a Square?

# A square requires:

# height == width


# So we must find:

# A vertical distance

# A horizontal distance

# That are equal

# 📌 Step 3: Why Add Boundary Fences?

# Even if no internal fence is removed, the outer boundary still defines valid fields.

# Example:

# Horizontal fences: [1, 2, 4]
# Distances: 1, 2, 3

# 📌 Step 4: Generate All Possible Distances

# For each pair of fences:

# distance = fence[j] - fence[i]


# We store:

# All horizontal distances in a set

# Compare vertical distances against it

# 📌 Step 5: Track the Largest Square

# Whenever a matching distance is found:

# area = distance × distance


# Keep the maximum.

# 📌 Step 6: Final Answer

# If no square found → -1

# Else → area % (10⁹ + 7)

# ⏱️ Complexity Analysis
# Component	Complexity
# Distance generation	O(H² + V²)
# Set lookup	O(1)
# Space	O(H²)

# Safe within constraints.

# 🎯 Interview-Ready Summary

# “I convert the problem into finding common distances between horizontal and vertical fences. The largest matching distance defines the side of the biggest square.”
