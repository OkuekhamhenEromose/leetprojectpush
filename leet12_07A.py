# 1523. Count Odd Numbers in an Interval Range
# Solved
# Easy
# Topics
# premium lock icon
# Companies
# Hint
# Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).

 

# Example 1:

# Input: low = 3, high = 7
# Output: 3
# Explanation: The odd numbers between 3 and 7 are [3,5,7].
# Example 2:

# Input: low = 8, high = 10
# Output: 1
# Explanation: The odd numbers between 8 and 10 are [9]

# 🧠 COMPREHENSIVE EXPLANATION (as your Python tutor)

# This problem asks:

# How many odd numbers exist between low and high (inclusive)?

# Examples:

# Input: low=3, high=7
# Odds = [3, 5, 7] → 3

# Input: low=8, high=10
# Odds = [9] → 1

# Let’s break down the thinking step-by-step.

# ⭐ Step 1 — Understand Odd Numbers

# A number is odd if:

# number % 2 == 1


# Examples: 1, 3, 5, 7, 9 …

# ⭐ Step 2 — Make the low value odd

# If low is even, then the first odd number is:

# low + 1


# If low is already odd, we don’t change it.

# The code:

# if low % 2 == 0:
#     low += 1


# Example:

# low = 8 → becomes 9

# low = 3 → stays 3

# Now low is guaranteed to be an odd starting point.

# ⭐ Step 3 — If low becomes larger than high, return 0

# Example:

# low = 10, high = 10
# low becomes 11 (but 11 > 10) → no odd numbers exist

# if low > high:
#     return 0

# ⭐ Step 4 — Count odd numbers using arithmetic

# Now both ends are:

# low → an odd number

# high → any number

# The odd numbers will look like:

# low, low+2, low+4, ..., ≤ high


# This is an arithmetic sequence with:

# first term = low

# step = 2

# last term ≤ high

# Number of terms in such a sequence is:

# ((high - low) // 2) + 1

class Solution(object):
    def countOdds(self, low, high):
        """
        :type low: int
        :type high: int
        :rtype: int
        """

        # If low is even, the first odd number is low + 1
        # If low is odd, the first odd number is low
        if low % 2 == 0:
            low += 1

        # Now low is guaranteed to be odd.
        # If low > high, then no odd numbers exist.
        if low > high:
            return 0

        # Count how many odd numbers exist between low and high (inclusive)
        return ((high - low) // 2) + 1