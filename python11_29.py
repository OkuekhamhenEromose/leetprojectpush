# 3512. Minimum Operations to Make Array Sum Divisible by K
# Solved
# Easy
# Topics
# premium lock icon
# Companies
# Hint
# You are given an integer array nums and an integer k. You can perform the following operation any number of times:

# Select an index i and replace nums[i] with nums[i] - 1.
# Return the minimum number of operations required to make the sum of the array divisible by k.

 

# Example 1:

# Input: nums = [3,9,7], k = 5

# Output: 4

# Explanation:

# Perform 4 operations on nums[1] = 9. Now, nums = [3, 5, 7].
# The sum is 15, which is divisible by 5.
# Example 2:

# Input: nums = [4,1,3], k = 4

# Output: 0

# Explanation:

# The sum is 8, which is already divisible by 4. Hence, no operations are needed.
# Example 3:

# Input: nums = [3,2], k = 6

# Output: 5

# Explanation:

# Perform 3 operations on nums[0] = 3 and 2 operations on nums[1] = 2. Now, nums = [0, 0].
# The sum is 0, which is divisible by 6

# 🔍 Understanding the Problem First

# You are allowed only one type of operation:

# Pick any index i and replace nums[i] with nums[i] - 1.

# That means each operation decreases the total sum of the array by exactly 1,
# because when you subtract 1 from one element, the sum reduces by 1.

# So the question becomes:

# “How many times do we need to subtract 1 from the total sum so that the total becomes divisible by k?”

# 🧠 Step-by-Step Explanation of the Code
# ### 1️⃣ Compute the sum of the array
# total = sum(nums)


# This adds all numbers in nums.

# This is important because every operation changes only the total sum, not the structure of the array.

# ### 2️⃣ Compute the remainder when the sum is divided by k
# remainder = total % k


# Why do this?

# If the sum is divisible by k, the remainder is 0.

# If not divisible, the remainder tells us how far away the sum is from being divisible.

# Example:
# If total = 17 and k = 5:

# 17 % 5 = 2


# This remainder means:

# The sum is 2 units above the nearest divisible number (15).
# So we need 2 operations to reduce the sum from 17 to 15.

# ### 3️⃣ If remainder is 0 → no work needed
# if remainder == 0:
#     return 0


# If the sum already divides perfectly by k, we don’t need any operations.

# ### 4️⃣ Otherwise return the remainder
# return remainder


# Because:

# Each operation decreases the total sum by 1

# We need to reduce the sum until it hits a number divisible by k

# So the number of operations needed is exactly the remainder.

# 📌 Why this works mathematically

# Let:

# total = sum(nums)
# k = divisor
# r = total % k


# We want:

# total - ops ≡ 0 (mod k)


# Solving for ops:

# ops = r


# That’s why the answer is simply:

# 0 if already divisible

# otherwise remainder

# 🎯 Final Insight

# The comment you wrote:

# # the operations = nums[i] - 1.


# Means:

# Each time you reduce a number by 1, the sum decreases by 1.

# Therefore, the entire problem reduces to a simple modulo arithmetic check.


#::::::::::::::::::::::::::  CODE STRUCTURE  :::::::::::::::::::
# (1) class Solution(p)
# (1a) def minOperations(3p){=sum,=,if(==){return}return}

class Solution(object):
    def minOperations(self, nums, k):
        total = sum(nums)
        remainder = total % k
        
        if remainder == 0:
            return 0
        
        return remainder

        # the operations = nums[i] - 1.

