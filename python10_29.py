# Step 1: Initialize x = 1

# We start from 1, whose binary representation is:

# 1  →  (binary) 1


# This is our starting point.

# Step 2: The while loop condition — x < n

# We keep expanding x until it becomes greater than or equal to n.

# So the loop keeps doubling x and filling it with 1s at each step.

# Step 3: Bit manipulation — (x << 1) | 1

# Here’s where the magic happens.
# Let’s dissect it carefully:

# ➤ x << 1 means left shift by 1 bit

# Left shifting by 1 is equivalent to multiplying by 2 in binary terms.

# Example:

# x = 1   → binary: 1
# x << 1  → binary: 10   (which is 2)

# ➤ Then we do | 1

# The | is the bitwise OR operator.
# It sets the last bit to 1, no matter what it was.

# So:

# (x << 1) | 1


# means:

# Shift x left (add one bit to the right)

# Then fill that new rightmost bit with 1

# Step 4: How this builds all-1 binary numbers

# Let’s simulate:

# Iteration	x (decimal)	x (binary)	Description
# Start	1	1	Initial value
# 1	`(1 << 1)	1` = 3	11
# 2	`(3 << 1)	1` = 7	111
# 3	`(7 << 1)	1` = 15	1111
# 4	`(15 << 1)	1` = 31	11111

# You can see the pattern —
# each time you left-shift and OR with 1, you create a longer chain of 1s in binary.

# Step 5: Stop when x >= n

# We stop as soon as the new x is greater than or equal to n.

# ::::::::::::::::::::  CODE STRUCTURE ::::::::::::::::::::
# (1) class Solution(p)
#  (1a) def smallestNumber(2p){v,while(p){v<<|},return}

class Solution(object):
    def smallestNumber(self, n):
        """
        :type n: int
        :rtype: int
        """
        x = 1
        while x < n:
            x = (x << 1) | 1
        return x
