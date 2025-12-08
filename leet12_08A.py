# 1925. Count Square Sum Triples
# Solved
# Easy
# Topics
# premium lock icon
# Companies
# Hint
# A square triple (a,b,c) is a triple where a, b, and c are integers and a2 + b2 = c2.

# Given an integer n, return the number of square triples such that 1 <= a, b, c <= n.

 

# Example 1:

# Input: n = 5
# Output: 2
# Explanation: The square triples are (3,4,5) and (4,3,5).
# Example 2:

# Input: n = 10
# Output: 4
# Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).

# :::::::::::::::::::::::::::::  PYTHON  ::::::::::::::::::::::::::

# 🧠 Comprehensive Explanation (as a Python instructor)

# The problem asks us to count square triples:

# A square triple is a set of integers (a, b, c) such that
# a² + b² = c² and 1 ≤ a, b, c ≤ n.

# This is the classic Pythagorean triple definition.

# ✅ Step-by-Step Breakdown of the Logic
# 1. Initialize a counter
# count = 0


# We will increase count every time we find a valid triple (a, b, c).

# 2. Loop over all possible values of a and b
# for a in range(1, n + 1):
#     for b in range(1, n + 1):


# Both a and b can independently go from 1 to n.

# This covers all possible pairs (a, b).

# 3. Compute a² + b²
# c2 = a*a + b*b


# This gives us the value of c².

# 4. Take the square root to find c
# c = int(c2**0.5)


# c2**0.5 gives the square root.

# int(...) truncates it into an integer.

# But we must still confirm it's a perfect square.

# 5. Check if c is a perfect square and within bounds
# if c * c == c2 and c <= n:
#     count += 1

# This checks two things:
# ✔ Condition 1: Is c an integer?

# c * c == c2

# Example:
# If c2 = 25, c = 5, and 5*5 = 25 → valid.
# If c2 = 26, c = 5, but 5*5 = 25 → not valid.

# This prevents invalid square roots like:

# c = sqrt(26) = 5.099...

# ✔ Condition 2: Is c ≤ n?

# All values must respect the rule:

# 1 ≤ a, b, c ≤ n


# So if c > n, that triple is invalid.

# 6. Return the total number of valid triples
# return count

class Solution(object):
    def countTriples(self, n):
        """
        :type n: int
        :rtype: int
        """
        count = 0

        # Loop over all values of a and b
        for a in range(1, n + 1):
            for b in range(1, n + 1):
                c2 = a*a + b*b      # compute a² + b²
                c = int(c2**0.5)    # square root of c²

                # Check if c is an integer AND c <= n
                if c * c == c2 and c <= n:
                    count += 1

        return count
  