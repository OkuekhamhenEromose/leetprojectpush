# 3318. Find X-Sum of All K-Long Subarrays I
# Solved
# Easy
# Topics
# premium lock icon
# Companies
# Hint
# You are given an array nums of n integers and two integers k and x.

# The x-sum of an array is calculated by the following procedure:

# Count the occurrences of all elements in the array.
# Keep only the occurrences of the top x most frequent elements. If two elements have the same number of occurrences, the element with the bigger value is considered more frequent.
# Calculate the sum of the resulting array.
# Note that if an array has less than x distinct elements, its x-sum is the sum of the array.

# Return an integer array answer of length n - k + 1 where answer[i] is the x-sum of the subarray nums[i..i + k - 1].

 

# Example 1:

# Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2

# Output: [6,10,12]

# Explanation:

# For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
# For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
# For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.
# Example 2:

# Input: nums = [3,8,7,8,7,5], k = 2, x = 2

# Output: [11,15,15,15,12]

# Explanation:

# Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1]

# ✅ Step 1: Setup
# from collections import Counter


# Counter is a Python tool that counts how many times each element appears in a list.

# n = len(nums)
# result = []


# n stores how many numbers are in nums.

# result will store the final x-sum values for each window.

# ✅ Step 2: Loop Through All Subarrays of Size k
# for i in range(n - k + 1):
#     subarr = nums[i:i + k]


# range(n - k + 1) ensures we only take complete windows.

# subarr is the subarray from index i to i + k - 1.

# Example:
# If nums = [1,2,3,4] and k = 3, subarrays are:

# [1,2,3] (i = 0)

# [2,3,4] (i = 1)

# ✅ Step 3: Count Frequencies
# freq = Counter(subarr)


# Creates a dictionary like {number: count}

# Example: [1,1,2,2,3] → {1:2, 2:2, 3:1}

# ✅ Step 4: Sort Based on Problem Rules
# sorted_items = sorted(freq.items(), key=lambda item: (-item[1], -item[0]))


# This is very important:

# freq.items() gives pairs like (number, frequency)

# We sort:

# First by highest frequency → -item[1]

# If frequency is same, by largest number first → -item[0]

# Example: {1:2, 2:2, 3:1} becomes:

# [(2,2), (1,2), (3,1)]

# ✅ Step 5: Take Top x Numbers and Calculate Sum
# x_sum = 0
# count = 0

# for num, f in sorted_items:
#     if count == x:
#         break
#     x_sum += num * f
#     count += 1


# We pick only the first x elements from sorted items.

# For each (num, f), we add num * frequency to the sum.

# For example:

# (2,3) → 2 appears 3 times → contributes 2*3 = 6

# (4,1) → 4 appears 1 time → contributes 4*1 = 4

# ✅ Step 6: Save to Output List
# result.append(x_sum)


# After processing each subarray, we store its x-sum.

# ✅ Final Line
# return result


class Solution(object):
    def findXSum(self, nums, k, x):
        """
        :type nums: List[int]
        :type k: int
        :type x: int
        :rtype: List[int]
        """
        from collections import Counter
        
        n = len(nums)
        result = []
        
        # Step 1: Traverse each subarray of length k
        for i in range(n - k + 1):
            subarr = nums[i:i + k]
            
            # Step 2: Count frequencies using Counter
            freq = Counter(subarr)
            
            # Step 3: Sort by:
            #   1. Higher frequency
            #   2. If equal frequency, larger value first
            sorted_items = sorted(freq.items(), key=lambda item: (-item[1], -item[0]))
            
            # Step 4: Keep top x most frequent elements
            x_sum = 0
            count = 0
            
            for num, f in sorted_items:
                if count == x:
                    break
                x_sum += num * f
                count += 1
            
            result.append(x_sum)
        
        return result
