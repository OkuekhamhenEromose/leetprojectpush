# 1458. Max Dot Product of Two Subsequences
# Solved
# Hard
# Topics
# premium lock icon
# Companies
# Hint
# Given two arrays nums1 and nums2.

# Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

# A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

 

# Example 1:

# Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
# Output: 18
# Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
# Their dot product is (2*3 + (-2)*(-6)) = 18.
# Example 2:

# Input: nums1 = [3,-2], nums2 = [2,-6,7]
# Output: 21
# Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
# Their dot product is (3*7) = 21.
# Example 3:

# Input: nums1 = [-1,-1], nums2 = [1,1]
# Output: -1
# Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
# Their dot product is -1.

# 🧠 Instructor-Level Explanation
# 🔍 Understanding the Problem

# You are given two arrays:

# You must select non-empty subsequences

# The subsequences must have the same length

# You want to maximize the dot product

# 👉 This is not a simple subsequence problem because:

# Numbers can be negative

# Selecting more elements can reduce the result

# We must force at least one multiplication

# ❌ Why Greedy Fails

# Example:

# nums1 = [-1, -1]
# nums2 = [1, 1]


# Greedy would return 0 (choosing nothing), but:
# 👉 Empty subsequences are not allowed

# Correct answer:

# -1 * 1 = -1


# So we must use DP.

# 🧮 DP State Definition
# dp[i][j]


# 👉 The maximum dot product using:

# nums1[0..i-1]

# nums2[0..j-1]

# at least one pair selected

# 🚨 Why Initialize with -∞?
# dp = [[-inf] * (m + 1) for _ in range(n + 1)]


# This prevents:

# Choosing empty subsequences

# Accidentally returning 0 when all results are negative

# 🔁 Transition Logic (Core Idea)

# At each (i, j):

# product = nums1[i - 1] * nums2[j - 1]


# We consider 4 choices:

# 1️⃣ Start a new subsequence
# product


# Useful when previous subsequences are harmful (negative).

# 2️⃣ Extend an existing subsequence
# dp[i - 1][j - 1] + product


# Classic DP continuation.

# 3️⃣ Skip element from nums1
# dp[i - 1][j]

# 4️⃣ Skip element from nums2
# dp[i][j - 1]

# ✅ Final transition
# dp[i][j] = max(
#     product,
#     dp[i - 1][j - 1] + product,
#     dp[i - 1][j],
#     dp[i][j - 1]
# )


# This ensures:
# ✔ Non-empty subsequence
# ✔ Negative values handled
# ✔ Optimal dot product

# 📊 Example Walkthrough
# Example 1
# nums1 = [2,1,-2,5]
# nums2 = [3,0,-6]


# Best subsequence:

# [2, -2] · [3, -6] = 6 + 12 = 18


# DP explores all valid combinations and finds 18.

# ⏱️ Complexity Analysis
# Metric	Value
# Time	O(n × m)
# Space	O(n × m)
# Constraints	Efficient for limits
# 🧠 Key Interview Takeaways

# ✔ Enforces non-empty subsequences
# ✔ Handles negative values correctly
# ✔ Proper DP state design
# ✔ Clean, extensible logic

# 🏁 Final Result
# return dp[n][m]

# :::::::::::::::::::::::::::  CODE STRUCTURE  :::::::::::::
# (1) class Solution(p){
# (1a) def maxDotProduct(3p){3v,forin(p){forin(p){v,2[]max(4)}}return } 
# }
class Solution (object):
    def maxDotProduct(self, nums1, nums2):
        n = len(nums1)
        m = len(nums2)
        dp = [[float('-inf')] (n + 1) for _ in range (m + 1)]
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                product = nums1(i - 1) * nums2( j - 1)
                dp[i][j] = max(
                    product,
                    dp[i - 1][j - 1] + product,
                    dp[i - 1][j],
                    dp[i][j - 1]

                )
        return dp[n][m]






























# class Solution(object):
#     def maxDotProduct(self, nums1, nums2):
#         """
#         :type nums1: List[int]
#         :type nums2: List[int]
#         :rtype: int
#         """
#         n, m = len(nums1), len(nums2)

#         # dp[i][j] = maximum dot product using
#         # nums1[0..i-1] and nums2[0..j-1] with NON-empty subsequences
#         dp = [[float('-inf')] * (m + 1) for _ in range(n + 1)]

#         for i in range(1, n + 1):
#             for j in range(1, m + 1):
#                 product = nums1[i - 1] * nums2[j - 1]

#                 dp[i][j] = max(
#                     product,                  # start new subsequence
#                     dp[i - 1][j - 1] + product,  # extend existing subsequence
#                     dp[i - 1][j],               # skip nums1[i-1]
#                     dp[i][j - 1]                # skip nums2[j-1]
#                 )

#         return dp[n][m]
