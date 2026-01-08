# 961. N-Repeated Element in Size 2N Array
# Solved
# Easy
# Topics
# premium lock icon
# Companies
# You are given an integer array nums with the following properties:

# nums.length == 2 * n.
# nums contains n + 1 unique elements.
# Exactly one element of nums is repeated n times.
# Return the element that is repeated n times.

 

# Example 1:

# Input: nums = [1,2,3,3]
# Output: 3
# Example 2:

# Input: nums = [2,1,2,5,3,2]
# Output: 2
# Example 3:

# Input: nums = [5,1,5,2,5,3,5,4]
# Output: 5

# :::::::::::::::::::::::  PYTHON  ::::::::::::::::::::::::::::::
# 🧠 Explanation (Tutor-Style, Step by Step)
# 🔹 Key Insight

# Because:

# One number is repeated many times

# All other numbers appear only once

# 👉 The first number you see twice must be the answer

# We don’t need to count everything.

# 🔹 Step 1: Use a set
# seen = set()


# A set stores unique values

# Checking if a value exists in a set is O(1) (very fast)

# 🔹 Step 2: Loop Through the Array
# for num in nums:


# We go through each number once.

# 🔹 Step 3: Check If We've Seen It Before
# if num in seen:
#     return num


# If num is already in seen, it means:

# This is the repeated element

# We immediately return it (no need to continue)

# 🔹 Step 4: Otherwise, Store the Number
# seen.add(num)


# If it’s the first time we see the number, store it

# :::::::::::::::::::::::::  CODE STRUCTURE  ::::::::::::::::::
# (1) class Solution(p)
# (1a) def repeatedNTimes(2p){v,forin{if(p){return}.add}}

class Solution(object):
    def repeatedNTimes(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        seen = set()

        for num in nums:
            if num in seen:
                return num
            seen.add(num)
