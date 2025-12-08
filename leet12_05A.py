# 3432. Count Partitions with Even Sum Difference
# Solved
# Easy
# Topics
# premium lock icon
# Companies
# Hint
# You are given an integer array nums of length n.

# A partition is defined as an index i where 0 <= i < n - 1, splitting the array into two non-empty subarrays such that:

# Left subarray contains indices [0, i].
# Right subarray contains indices [i + 1, n - 1].
# Return the number of partitions where the difference between the sum of the left and right subarrays is even.


# Example 1:

# Input: nums = [10,10,3,7,6]

# Output: 4

# Explanation:

# The 4 partitions are:

# [10], [10, 3, 7, 6] with a sum difference of 10 - 26 = -16, which is even.
# [10, 10], [3, 7, 6] with a sum difference of 20 - 16 = 4, which is even.
# [10, 10, 3], [7, 6] with a sum difference of 23 - 13 = 10, which is even.
# [10, 10, 3, 7], [6] with a sum difference of 30 - 6 = 24, which is even.
# Example 2:

# Input: nums = [1,2,2]

# Output: 0

# Explanation:

# No partition results in an even sum difference

# :::::::::::::::::::::::::::  PYTHON  ::::::::::::::::::

# 🧠 FULL PYTHON INSTRUCTOR EXPLANATION

# Let’s break down the reasoning step-by-step exactly like you’re learning Python and algorithm design.

# 📌 1. Understand What a Partition Means

# A valid partition index i splits the array into:

# Left: nums[0…i]

# Right: nums[i+1…n-1]

# Both sides must contain at least one element, so i goes from 0 to n-2.

# 📌 2. Compute Total Sum First
# total = sum(nums)


# This is important because instead of recalculating the right sum every time:

# right_sum = sum(nums[i+1:])


# —which is slow (O(n) each time)—
# we do:

# right_sum = total - left_sum


# This gives us O(1) per iteration.

# 📌 3. Running Left Sum
# left_sum = 0


# As we iterate, we keep adding one element at a time:

# left_sum += nums[i]


# This gives an efficient running prefix sum.

# 📌 4. Loop Through Partition Indices
# for i in range(n - 1):


# We must stop at n-2 because:

# if i = n-1, right subarray would be empty → invalid.

# 📌 5. Compute the Right Sum
# right_sum = total - left_sum


# This is mathematically correct because:

# left_sum + right_sum = total


# So:

# right_sum = total - left_sum

# 📌 6. Check If the Difference Is Even

# We want:

# (left_sum - right_sum) is even


# In Python, a number is even if:

# number % 2 == 0


# So we do:

# if (left_sum - right_sum) % 2 == 0:
#     count += 1

# 📌 7. Return the Final Count

# After checking all valid i, we return:

# return count

# :::::::::::::::::::::::::::::::::  CODE STRUCTURE  ::::::::::::::::
# (1) class Solution(p){
# (1a) funct countPartitions(2p){
# (1b) =len,=sum,2v,forin{++,=-,if(-%==){++}}
# (1c) return}}

class Solution(object):
    def countPartitions(self, nums):
        n = len(nums)

        # Compute the total sum of the array once
        total = sum(nums)

        left_sum = 0
        count = 0

        # Loop from index 0 to n-2 (to ensure both sides are non-empty)
        for i in range(n - 1):
            left_sum += nums[i]
            right_sum = total - left_sum

            # Check if the difference is even
            if (left_sum - right_sum) % 2 == 0:
                count += 1

        return count







