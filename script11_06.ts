// 3607. Power Grid Maintenance
// Solved
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// You are given an integer c representing c power stations, each with a unique identifier id from 1 to c (1‑based indexing).

// These stations are interconnected via n bidirectional cables, represented by a 2D array connections, where each element connections[i] = [ui, vi] indicates a connection between station ui and station vi. Stations that are directly or indirectly connected form a power grid.

// Initially, all stations are online (operational).

// You are also given a 2D array queries, where each query is one of the following two types:

// [1, x]: A maintenance check is requested for station x. If station x is online, it resolves the check by itself. If station x is offline, the check is resolved by the operational station with the smallest id in the same power grid as x. If no operational station exists in that grid, return -1.

// [2, x]: Station x goes offline (i.e., it becomes non-operational).

// Return an array of integers representing the results of each query of type [1, x] in the order they appear.

// Note: The power grid preserves its structure; an offline (non‑operational) node remains part of its grid and taking it offline does not alter connectivity.

 

// Example 1:

// Input: c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries = [[1,3],[2,1],[1,1],[2,2],[1,2]]

// Output: [3,2,3]

// Explanation:



// Initially, all stations {1, 2, 3, 4, 5} are online and form a single power grid.
// Query [1,3]: Station 3 is online, so the maintenance check is resolved by station 3.
// Query [2,1]: Station 1 goes offline. The remaining online stations are {2, 3, 4, 5}.
// Query [1,1]: Station 1 is offline, so the check is resolved by the operational station with the smallest id among {2, 3, 4, 5}, which is station 2.
// Query [2,2]: Station 2 goes offline. The remaining online stations are {3, 4, 5}.
// Query [1,2]: Station 2 is offline, so the check is resolved by the operational station with the smallest id among {3, 4, 5}, which is station 3.
// Example 2:

// Input: c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]

// Output: [1,-1]

// Explanation:

// There are no connections, so each station is its own isolated grid.
// Query [1,1]: Station 1 is online in its isolated grid, so the maintenance check is resolved by station 1.
// Query [2,1]: Station 1 goes offline.
// Query [1,1]: Station 1 is offline and there are no other stations in its grid, so the result is -1

// ✅ Step-by-Step Explanation of Code
// 1️⃣ Union-Find Class: Group Stations
// class UnionFind {
//     parent: number[];
//     rank: number[];

//     constructor(n: number) {
//         this.parent = Array.from({ length: n + 1 }, (_, i) => i);
//         this.rank = new Array(n + 1).fill(0);
//     }


// Each station is its own parent initially → each one is its own group

// rank is used for optimization, making union operations faster

// 🔹 find() – Find group leader with Path Compression
// find(x: number): number {
//     if (this.parent[x] !== x) {
//         this.parent[x] = this.find(this.parent[x]); // Path compression
//     }
//     return this.parent[x];
// }


// This returns the root (leader) of station x

// Uses path compression to flatten the structure and speed up future lookups

// 🔹 union() – Merge Two Groups
// union(x: number, y: number) {
//     let rootX = this.find(x);
//     let rootY = this.find(y);
//     if (rootX === rootY) return;
//     if (this.rank[rootX] < this.rank[rootY]) {
//         this.parent[rootX] = rootY;
//     } else if (this.rank[rootX] > this.rank[rootY]) {
//         this.parent[rootY] = rootX;
//     } else {
//         this.parent[rootY] = rootX;
//         this.rank[rootX]++;
//     }
// }


// If two stations are connected → put them in the same group

// Uses union by rank to keep the tree depth small

// 2️⃣ MinHeap (Renamed to Avoid Conflict)
// class MyMinHeap {
//     heap: number[] = [];


// This stores each group's stations so that we can always retrieve the smallest active station quickly.

// 🔹 Inserting into heap
// push(val: number) {
//     this.heap.push(val);
//     this.bubbleUp();
// }


// Add to end of array

// Move it upward to maintain min-heap property

// 🔹 Removing smallest number
// pop(): number | undefined {
//     if (this.heap.length === 0) return undefined;
//     const min = this.heap[0];
//     const end = this.heap.pop();
//     if (this.heap.length > 0 && end !== undefined) {
//         this.heap[0] = end;
//         this.bubbleDown();
//     }
//     return min;
// }

// 3️⃣ Main Function – processQueries()
// ✅ Step 1: Connect the stations
// const uf = new UnionFind(c);
// for (const [u, v] of connections) {
//     uf.union(u, v);
// }


// Now groups are formed (connected components)

// ✅ Step 2: Put each station in its group’s heap
// const heaps = new Map<number, MyMinHeap>();
// for (let i = 1; i <= c; i++) {
//     const root = uf.find(i);
//     if (!heaps.has(root)) heaps.set(root, new MyMinHeap());
//     heaps.get(root)!.push(i);
// }

// ✅ Step 3: Handle Queries
// const offline = new Set<number>();
// const result: number[] = [];

// for (const [type, x] of queries) {
//     const root = uf.find(x);

//     if (type === 1) {
//         if (!offline.has(x)) {
//             result.push(x);  // If x is active, return x
//         } else {
//             const heap = heaps.get(root)!;
//             // Remove offline stations lazily:
//             while (heap.peek() !== undefined && offline.has(heap.peek()!)) {
//                 heap.pop();
//             }
//             result.push(heap.peek() ?? -1); // Return smallest or -1 if none left
//         }
//     } else {
//         offline.add(x); // Mark x as not active
//     }
// }

// ✅ Final Output

// Returns an array with answers to all Type 1 queries.

// ==============================  CODE STRUCTURE  =================================
// (1a) class UnionFind{2:,const(p){this..from(p,funct)this.new().fill()}
// (1b) find(p){if(p){this.this.(this,[])} return}
// (1c) union(p){2vthis,if(p)return,if(p){this.}elseif(p){this.}else{this.,this.++}}
// }
// (2a) class MyMinHeap{:,push(p){this.push(),this.bubbleup},pop:{if(p===)return,Vthis.[],Vthis..pop,if(p&!==){this.[],this.}return}peek:{returnthis.[]}
// (2b) privatebubbleup(){vthis..length,while(p){V.floor(),if(this.[]<=)br,[this.,this[]]=,=}}
// (2c) privatebubbledown(){v,Vthis..length,while(p){2v*,v,2if(p>&this.<this.[]){=}if(p===)br,[this.[],this[]]=,=}}
// (3a)functionprocessQueries(4p){Vnew(),forof(p){.union()},Vnew<p>(),for(p){V.find(),if(!.has()).set(pcall).get()!.push()}Vnew<p>(),V:[]}
// (3b)forof(p[]){V.find(),if(===){if(!.has()).push()}else{V.get()!,while(.peek!==&.has(.peek!){.pop}.push(.peek??-1)}}else{.add}}return}





class UnionFind {
    parent: number[];
    rank: number[];

    constructor(n: number) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.rank = new Array(n + 1).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x: number, y: number) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX === rootY) return;
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
    }
}

// ✅ Renamed MinHeap to avoid conflict
class MyMinHeap {
    heap: number[] = [];

    push(val: number) {
        this.heap.push(val);
        this.bubbleUp();
    }

    pop(): number | undefined {
        if (this.heap.length === 0) return undefined;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0 && end !== undefined) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return min;
    }

    peek(): number | undefined {
        return this.heap[0];
    }

    private bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.heap[parent] <= this.heap[idx]) break;
            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }

    private bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = idx;

            if (left < length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest === idx) break;

            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

function processQueries(c: number, connections: number[][], queries: number[][]): number[] {
    const uf = new UnionFind(c);

    // Step 1: Build components using union-find
    for (const [u, v] of connections) {
        uf.union(u, v);
    }

    // Step 2: Assign each station to a heap (component-wise)
    const heaps = new Map<number, MyMinHeap>();
    for (let i = 1; i <= c; i++) {
        const root = uf.find(i);
        if (!heaps.has(root)) heaps.set(root, new MyMinHeap());
        heaps.get(root)!.push(i);
    }

    const offline = new Set<number>();
    const result: number[] = [];

    // Step 3: Process queries
    for (const [type, x] of queries) {
        const root = uf.find(x);

        if (type === 1) {
            if (!offline.has(x)) {
                result.push(x);
            } else {
                const heap = heaps.get(root)!;
                // Lazy removal of offline stations
                while (heap.peek() !== undefined && offline.has(heap.peek()!)) {
                    heap.pop();
                }
                result.push(heap.peek() ?? -1);
            }
        } else {
            offline.add(x);
        }
    }

    return result;
}
