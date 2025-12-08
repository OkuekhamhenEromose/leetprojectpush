# // 3607. Power Grid Maintenance
# // Solved
# // Medium
# // Topics
# // premium lock icon
# // Companies
# // Hint
# // You are given an integer c representing c power stations, each with a unique identifier id from 1 to c (1‑based indexing).

# // These stations are interconnected via n bidirectional cables, represented by a 2D array connections, where each element connections[i] = [ui, vi] indicates a connection between station ui and station vi. Stations that are directly or indirectly connected form a power grid.

# // Initially, all stations are online (operational).

# // You are also given a 2D array queries, where each query is one of the following two types:

# // [1, x]: A maintenance check is requested for station x. If station x is online, it resolves the check by itself. If station x is offline, the check is resolved by the operational station with the smallest id in the same power grid as x. If no operational station exists in that grid, return -1.

# // [2, x]: Station x goes offline (i.e., it becomes non-operational).

# // Return an array of integers representing the results of each query of type [1, x] in the order they appear.

# // Note: The power grid preserves its structure; an offline (non‑operational) node remains part of its grid and taking it offline does not alter connectivity.








import heapq

class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n + 1))
        self.rank = [0] * (n + 1)

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)
        if rootX == rootY:
            return
        if self.rank[rootX] < self.rank[rootY]:
            self.parent[rootX] = rootY
        elif self.rank[rootX] > self.rank[rootY]:
            self.parent[rootY] = rootX
        else:
            self.parent[rootY] = rootX
            self.rank[rootX] += 1


class Solution(object):
    def processQueries(self, c, connections, queries):
        uf = UnionFind(c)

        # Step 1: Build components
        for u, v in connections:
            uf.union(u, v)

        # Step 2: Build heaps per component
        heaps = {}
        for station in range(1, c + 1):
            root = uf.find(station)
            if root not in heaps:
                heaps[root] = []
            heapq.heappush(heaps[root], station)

        offline = set()
        results = []

        # Step 3: Process queries
        for qtype, x in queries:
            root = uf.find(x)

            if qtype == 1:
                if x not in offline:
                    # Station x is online → resolves its own query
                    results.append(x)
                else:
                    heap = heaps[root]
                    # Lazy deletion: remove offline stations
                    while heap and heap[0] in offline:
                        heapq.heappop(heap)

                    results.append(heap[0] if heap else -1)

            else:  # type 2
                offline.add(x)

        return results
