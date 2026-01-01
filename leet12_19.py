# 2092. Find All People With Secret
# Solved
# Hard
# Topics
# premium lock icon
# Companies
# Hint
# You are given an integer n indicating there are n people numbered from 0 to n - 1. You are also given a 0-indexed 2D integer array meetings where meetings[i] = [xi, yi, timei] indicates that person xi and person yi have a meeting at timei. A person may attend multiple meetings at the same time. Finally, you are given an integer firstPerson.

# Person 0 has a secret and initially shares the secret with a person firstPerson at time 0. This secret is then shared every time a meeting takes place with a person that has the secret. More formally, for every meeting, if a person xi has the secret at timei, then they will share the secret with person yi, and vice versa.

# The secrets are shared instantaneously. That is, a person may receive the secret and share it with people in other meetings within the same time frame.

# Return a list of all the people that have the secret after all the meetings have taken place. You may return the answer in any order.

 

# Example 1:

# Input: n = 6, meetings = [[1,2,5],[2,3,8],[1,5,10]], firstPerson = 1
# Output: [0,1,2,3,5]
# Explanation:
# At time 0, person 0 shares the secret with person 1.
# At time 5, person 1 shares the secret with person 2.
# At time 8, person 2 shares the secret with person 3.
# At time 10, person 1 shares the secret with person 5.​​​​
# Thus, people 0, 1, 2, 3, and 5 know the secret after all the meetings.
# Example 2:

# Input: n = 4, meetings = [[3,1,3],[1,2,2],[0,3,3]], firstPerson = 3
# Output: [0,1,3]
# Explanation:
# At time 0, person 0 shares the secret with person 3.
# At time 2, neither person 1 nor person 2 know the secret.
# At time 3, person 3 shares the secret with person 0 and person 1.
# Thus, people 0, 1, and 3 know the secret after all the meetings.
# Example 3:

# Input: n = 5, meetings = [[3,4,2],[1,2,1],[2,3,1]], firstPerson = 1
# Output: [0,1,2,3,4]
# Explanation:
# At time 0, person 0 shares the secret with person 1.
# At time 1, person 1 shares the secret with person 2, and person 2 shares the secret with person 3.
# Note that person 2 can share the secret at the same time as receiving it.
# At time 2, person 3 shares the secret with person 4.
# Thus, people 0, 1, 2, 3, and 4 know the secret after all the meetings

# :::::::::::::::::::::::::  PYTHON  :::::::::::::::::::::::::
# 🧠 Comprehensive Explanation (Tutor Style)
# 1️⃣ Why Union-Find?

# Union-Find lets us:

# Group people who meet

# Quickly check if two people are connected

# Efficiently manage large input sizes (up to 100,000 people)

# 2️⃣ Initial Secret Sharing
# union(0, firstPerson)


# At time 0, person 0 shares the secret with firstPerson.
# They are immediately connected.

# 3️⃣ Sort Meetings by Time
# meetings.sort(key=lambda x: x[2])


# Why?

# Because:

# Secrets cannot travel backward in time

# Meetings at the same time must be processed together

# Meetings at different times must be isolated

# 4️⃣ Process Meetings Time by Time
# while i < len(meetings):
#     time = meetings[i][2]


# We process all meetings with the same timestamp together.

# 5️⃣ Temporary Union at Same Time
# union(x, y)
# temp_people.add(x)
# temp_people.add(y)


# Everyone meeting at the same time is temporarily connected

# This allows instant spreading within the same time frame

# 6️⃣ Critical Step: Reset Invalid Connections
# secret_root = find(0)
# for p in temp_people:
#     if find(p) != secret_root:
#         parent[p] = p


# 💡 This is the heart of the solution.

# If someone did NOT connect to the secret, their connections are invalid

# We reset them so they don’t carry connections into the future

# This prevents fake secret spreading

# 7️⃣ Final Result
# if find(i) == find(0):
#     result.append(i)


# Anyone still connected to person 0 knows the secret.

# ⏱️ Time & Space Complexity
# Aspect	Complexity
# Sorting meetings	O(m log m)
# Union-Find operations	O(m α(n))
# Total Time	O(m log m)
# Space	O(n)

# (α(n) is inverse Ackermann, effectively constant)

# 🧪 Why This Works for All Edge Cases

# ✔ Instant sharing at same time
# ✔ Prevents future contamination
# ✔ Handles isolated meetings
# ✔ Works for large inputs
# ✔ Matches all sample outputs

# 🎯 Final Takeaway

# This problem is not a graph BFS problem — it’s a time-aware union-find problem.

# The reset step is what separates a correct solution from a wrong one.


class Solution(object):
    def findAllPeople(self, n, meetings, firstPerson):
        # Union-Find helpers
        parent = list(range(n))

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x, y):
            px, py = find(x), find(y)
            if px != py:
                parent[py] = px

        # Person 0 shares secret with firstPerson at time 0
        union(0, firstPerson)

        # Sort meetings by time
        meetings.sort(key=lambda x: x[2])

        i = 0
        while i < len(meetings):
            time = meetings[i][2]
            temp_people = set()

            # Process all meetings at the same time
            while i < len(meetings) and meetings[i][2] == time:
                x, y, _ = meetings[i]
                union(x, y)
                temp_people.add(x)
                temp_people.add(y)
                i += 1

            # After unions, check who knows the secret
            secret_root = find(0)
            for p in temp_people:
                if find(p) != secret_root:
                    parent[p] = p  # reset connection

        # Collect all people connected to person 0
        result = []
        for i in range(n):
            if find(i) == find(0):
                result.append(i)

        return result
