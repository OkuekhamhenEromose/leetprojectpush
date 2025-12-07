# 3578. Count Partitions With Max-Min Difference at Most K
# Solved
# Medium
# Topics
# premium lock icon
# Companies
# Hint
# You are given an integer array nums and an integer k. Your task is to partition nums into one or more non-empty contiguous segments such that in each segment, the difference between its maximum and minimum elements is at most k.

# Return the total number of ways to partition nums under this condition.

# Since the answer may be too large, return it modulo 109 + 7.

 

# Example 1:

# Input: nums = [9,4,1,3,7], k = 4

# Output: 6

# Explanation:

# There are 6 valid partitions where the difference between the maximum and minimum elements in each segment is at most k = 4:

# [[9], [4], [1], [3], [7]]
# [[9], [4], [1], [3, 7]]
# [[9], [4], [1, 3], [7]]
# [[9], [4, 1], [3], [7]]
# [[9], [4, 1], [3, 7]]
# [[9], [4, 1, 3], [7]]
# Example 2:

# Input: nums = [3,3,4], k = 0

# Output: 2

# Explanation:

# There are 2 valid partitions that satisfy the given conditions:

# [[3], [3], [4]]
# [[3, 3], [4]]

# 🧠 Goal of the Problem (Restated Simply)

# You must divide the array nums into contiguous segments.
# Every segment must satisfy:

# max(segment) - min(segment) <= k


# You must count how many ways the array can be partitioned this way.

# Example:

# [9 | 4,1,3,7]


# is valid because:

# segment1 = [9] → max-min = 0

# segment2 = [4,1,3,7] → max-min = 7–1 = 6? ❌ >4 (invalid)

# but:

# [9] [4,1,3] [7]


# is valid because each segment satisfies max-min ≤ 4.

# 🧩 DP Definition

# We define:

# dp[i] = number of valid ways to partition nums[0 : i]


# dp[0] = 1 (one way to partition an empty prefix)

# answer = dp[n]

# To compute dp[i] we consider all possible previous cuts j < i:

# if nums[j:i] is a valid segment:
#     dp[i] += dp[j]


# But checking every possible segment is too slow (O(n²)).

# 🚀 Optimization: Sliding Window + Monotonic Queues

# We use a window [left, right] that represents a segment ending at right.

# For each right, we:

# Expand window to include nums[right]

# Shrink window from the left until it becomes valid

# All valid left positions contribute:

# dp[right+1] = dp[left] + dp[left+1] + ... + dp[right]


# This is where the running sum (window_sum) is used.

# 🧱 Max & Min of Current Window (Using Monotonic Queues)

# We use:

# max_q: a decreasing deque → front is maximum

# min_q: an increasing deque → front is minimum

# These allow us to get:

# curr_max = nums[max_q[0]]
# curr_min = nums[min_q[0]]


# in O(1) time.

# This is crucial because we must always check:

# curr_max - curr_min <= k

# 🧮 Now let’s explain the code step by step
# 1. Setup
# MOD = 10**9 + 7
# n = len(nums)
# dp = [0] * (n + 1)
# dp[0] = 1


# We use modulo to keep numbers small.

# dp[0] = 1 because there's exactly one way to partition an empty array.

# 2. Monotonic Queues
# from collections import deque
# max_q = deque()
# min_q = deque()


# These track the sliding-window maximum and minimum.

# 3. Sliding Window Variables
# left = 0
# window_sum = 0


# left: the left boundary of the window

# window_sum: sum of dp[left:right+1], representing all possible valid partitions that can end at right

# 4. Loop over all possible right endpoints
# for right in range(n):


# For each right, we will expand the window and maintain validity.

# 5. Insert nums[right] into max deque
# while max_q and nums[max_q[-1]] < nums[right]:
#     max_q.pop()
# max_q.append(right)


# We remove smaller elements from the back

# Ensures max_q is always decreasing

# Front holds index of largest element → O(1) max lookup

# 6. Insert nums[right] into min deque
# while min_q and nums[min_q[-1]] > nums[right]:
#     min_q.pop()
# min_q.append(right)


# We remove larger elements from the back

# Ensures min_q is increasing

# Front holds index of smallest element → O(1) min lookup

# 7. Shrink the window if invalid
# while nums[max_q[0]] - nums[min_q[0]] > k:


# If difference exceeds k, we must shrink the window:

# Remove dp[left] from the running window sum:
# window_sum = (window_sum - dp[left]) % MOD

# Remove left index from the queues if it’s leaving window:
# if max_q[0] == left:
#     max_q.popleft()
# if min_q[0] == left:
#     min_q.popleft()

# Move window left pointer
# left += 1


# This continues until the window [left, right] becomes valid.

# 8. Add dp[right] to window_sum
# window_sum = (window_sum + dp[right]) % MOD


# This means:

# All partitions ending before right can now start a new segment ending at right.

# 9. Set dp[right+1]
# dp[right + 1] = window_sum


# Meaning:

# The number of valid partitions for prefix ending at index right
# = sum of all dp[left] values where segment [left, right] is valid.

# 10. Return the final answer
# return dp[n] % MOD


class Solution(object):
    def countPartitions(self, nums, k):
        MOD = 10**9 + 7
        n = len(nums)

        # dp[i] = number of valid ways to partition nums[:i]
        dp = [0] * (n + 1)
        dp[0] = 1  

        from collections import deque

        max_q = deque()  # decreasing queue (max at front)
        min_q = deque()  # increasing queue (min at front)

        left = 0
        window_sum = 0  # sum of dp[left:right]

        for right in range(n):

            # Maintain max queue
            while max_q and nums[max_q[-1]] < nums[right]:
                max_q.pop()
            max_q.append(right)

            # Maintain min queue
            while min_q and nums[min_q[-1]] > nums[right]:
                min_q.pop()
            min_q.append(right)

            # Shrink window from left until valid
            while nums[max_q[0]] - nums[min_q[0]] > k:
                # remove dp[left] from window sum
                window_sum = (window_sum - dp[left]) % MOD

                # move left pointer
                if max_q[0] == left:
                    max_q.popleft()
                if min_q[0] == left:
                    min_q.popleft()

                left += 1

            # Add dp[right] to window sum
            window_sum = (window_sum + dp[right]) % MOD

            # dp[right+1] = all valid partitions ending at right
            dp[right + 1] = window_sum

        return dp[n] % MOD
