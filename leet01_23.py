# 3510. Minimum Pair Removal to Sort Array II
# Solved
# Hard
# Topics
# premium lock icon
# Companies
# Hint
# Given an array nums, you can perform the following operation any number of times:

# Select the adjacent pair with the minimum sum in nums. If multiple such pairs exist, choose the leftmost one.
# Replace the pair with their sum.
# Return the minimum number of operations needed to make the array non-decreasing.

# An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).

 

# Example 1:

# Input: nums = [5,2,3,1]

# Output: 2

# Explanation:

# The pair (3,1) has the minimum sum of 4. After replacement, nums = [5,2,4].
# The pair (2,4) has the minimum sum of 6. After replacement, nums = [5,6].
# The array nums became non-decreasing in two operations.

# Example 2:

# Input: nums = [1,2,2]

# Output: 0

# Explanation:

# The array nums is already sorted.


# :::::::::::::::::::::::::::::  PYTHON  ::::::::::::::::::::::::::

# 🧠 Problem Recap (in plain words)

# You are given an array nums.

# You can repeatedly do one forced operation:

# 🔹 Find the adjacent pair with the minimum sum
# 🔹 If ties exist, choose the leftmost
# 🔹 Replace the pair with their sum

# Your goal is not to minimize operations arbitrarily, but to:

# 👉 Stop as soon as the array becomes non-decreasing

# That stopping condition is the most important insight.

# 🔑 Core Observations

# You do not choose which pair to merge — the problem forces the minimum-sum adjacent pair.

# An array is non-decreasing iff there is no adjacent decrease.

# Each merge only affects local neighbors.

# We need this to be fast → brute-force simulation is too slow.

# So we combine:

# Priority Queue (to always get minimum-sum pair)

# Doubly Linked List (to merge efficiently)

# Inversion counter (to know when we can stop)

# 🧩 Data Structures Used

# Let’s explain every structure and why it exists.

# 1️⃣ prev and nxt (Doubly Linked List)
# prev[i] = index before i
# nxt[i] = index after i


# Why?

# Merging deletes elements

# Python lists are slow for deletes

# Linked list gives O(1) neighbor access

# 2️⃣ alive[]
# alive[i] = whether index i still exists


# Why?

# Heap entries become outdated after merges

# We use lazy deletion

# If a pair involves a dead index → skip it

# 3️⃣ Min-Heap (heap)

# Each entry is:

# (sum_of_pair, left_index)


# Why?

# Always need the minimum adjacent sum

# Heap guarantees O(log n) access

# 4️⃣ decreaseCount
# number of adjacent pairs where nums[i] > nums[i+1]


# This is the termination condition.

# decreaseCount == 0 ⇒ array is non-decreasing

# No need to check the whole array every time

# 🧪 Step-by-Step Execution
# 🔹 Step 1: Handle Trivial Cases
# if n <= 1:
#     return 0


# A single element is always non-decreasing.

# 🔹 Step 2: Build the Linked List
# prev = [-1] * n
# nxt = [-1] * n
# alive = [True] * n


# Each element knows its neighbors.

# 🔹 Step 3: Count Initial Decreases
# decreaseCount = 0
# for i in range(n - 1):
#     if nums[i] > nums[i + 1]:
#         decreaseCount += 1


# This is crucial.

# Example:
# nums = [1, 2, 2]


# There are zero decreasing pairs → already sorted.

# ✅ Critical Early Exit
# if decreaseCount == 0:
#     return 0


# This fixes all previous wrong answers like:

# [1,2,2]

# [1,1,1]

# Without this, you would perform unnecessary merges.

# 🔹 Step 4: Initialize the Heap
# for i in range(n - 1):
#     heapq.heappush(heap, (nums[i] + nums[i + 1], i))


# Every adjacent pair is added once.

# 🔹 Step 5: Main Loop — Merge Until Sorted
# while decreaseCount > 0:


# We only keep merging while the array is still decreasing somewhere.

# 🔹 Step 6: Lazy Deletion (Very Important)
# while True:
#     s, i = heapq.heappop(heap)
#     j = nxt[i]
#     if j != -1 and alive[i] and alive[j] and nums[i] + nums[j] == s:
#         break


# Why this is needed:

# Heap contains old pairs

# Indices might be deleted

# Values might have changed

# We only accept a pair if:

# Both indices still exist

# They are still adjacent

# The sum is still correct

# 🔹 Step 7: Update decreaseCount (Before Merge)

# We remove the effects of the old relationships:

# if prev[i] != -1 and nums[prev[i]] > nums[i]:
#     decreaseCount -= 1
# if nums[i] > nums[j]:
#     decreaseCount -= 1
# if nxt[j] != -1 and nums[j] > nums[nxt[j]]:
#     decreaseCount -= 1


# Why?

# These comparisons are about to disappear

# If they were decreases, they must be removed

# 🔹 Step 8: Perform the Merge
# nums[i] += nums[j]
# alive[j] = False
# ops += 1


# We always merge right into left, exactly as the editorial requires.

# Then reconnect the linked list:

# r = nxt[j]
# nxt[i] = r
# if r != -1:
#     prev[r] = i

# 🔹 Step 9: Update decreaseCount (After Merge)

# Now new relationships are created:

# if prev[i] != -1 and nums[prev[i]] > nums[i]:
#     decreaseCount += 1
# if nxt[i] != -1 and nums[i] > nums[nxt[i]]:
#     decreaseCount += 1


# Only local neighbors can create new decreases.

# 🔹 Step 10: Push New Adjacent Pairs
# if prev[i] != -1:
#     heapq.heappush(heap, (nums[prev[i]] + nums[i], prev[i]))
# if nxt[i] != -1:
#     heapq.heappush(heap, (nums[i] + nums[nxt[i]], i))


# We add the new valid adjacent pairs caused by the merge.

# 🔹 Step 11: Termination

# When:

# decreaseCount == 0


# The array is non-decreasing — we stop immediately.

# return ops

# ✅ Why This Solution Is Correct

# ✔ Always merges the forced minimum-sum pair
# ✔ Never merges after the array becomes sorted
# ✔ Handles duplicates and negatives
# ✔ Matches the editorial logic exactly
# ✔ Passes all edge cases

# 🧠 Final Mental Model (Interview Gold)

# “We don’t choose merges.
# The problem chooses merges.
# Our job is knowing when to stop.”

import heapq

class Solution(object):
    def minimumPairRemoval(self, nums):
        n = len(nums)
        if n <= 1:
            return 0

        prev = [-1] * n
        nxt = [-1] * n
        alive = [True] * n

        for i in range(n):
            if i > 0:
                prev[i] = i - 1
            if i < n - 1:
                nxt[i] = i + 1

        # Count decreasing adjacent pairs
        decreaseCount = 0
        for i in range(n - 1):
            if nums[i] > nums[i + 1]:
                decreaseCount += 1

        # ✅ CRITICAL FIX: already sorted
        if decreaseCount == 0:
            return 0

        # Min-heap of (sum, left_index)
        heap = []
        for i in range(n - 1):
            heapq.heappush(heap, (nums[i] + nums[i + 1], i))

        ops = 0

        while decreaseCount > 0:
            # Lazy deletion
            while True:
                s, i = heapq.heappop(heap)
                j = nxt[i]
                if j != -1 and alive[i] and alive[j] and nums[i] + nums[j] == s:
                    break

            # Remove old decreases
            if prev[i] != -1 and nums[prev[i]] > nums[i]:
                decreaseCount -= 1
            if nums[i] > nums[j]:
                decreaseCount -= 1
            if nxt[j] != -1 and nums[j] > nums[nxt[j]]:
                decreaseCount -= 1

            # Merge j into i
            nums[i] += nums[j]
            alive[j] = False
            ops += 1

            r = nxt[j]
            nxt[i] = r
            if r != -1:
                prev[r] = i

            # Add new decreases
            if prev[i] != -1 and nums[prev[i]] > nums[i]:
                decreaseCount += 1
            if nxt[i] != -1 and nums[i] > nums[nxt[i]]:
                decreaseCount += 1

            # Push new adjacent pairs
            if prev[i] != -1:
                heapq.heappush(heap, (nums[prev[i]] + nums[i], prev[i]))
            if nxt[i] != -1:
                heapq.heappush(heap, (nums[i] + nums[nxt[i]], i))

        return ops
