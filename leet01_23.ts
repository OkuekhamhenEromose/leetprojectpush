// Minimum Operations to Make Array Non-Decreasing by Merging Adjacent Elements" (titled "Minimum Pair Removal to Sort Array II" in the query). This is a hard-level problem requiring us to make an array nums non-decreasing (each element >= the previous one) by repeatedly merging the adjacent pair with the smallest sum (choosing the leftmost in case of ties), replacing the pair with their sum, and returning the minimum number of such operations.
// The code implements an efficient greedy algorithm using:

// Doubly Linked List Simulation: For fast merges/removals without resizing arrays.
// Min-Heap (Priority Queue): To efficiently select the next merge candidate, with custom comparison for tie-breaking.
// Decrease Count Tracking: To monitor violations (adjacent pairs where left > right) and stop when the array is sorted.
// Lazy Deletion: To handle invalid heap entries after merges without expensive removals.

// The TypeScript version adds type safety (e.g., number[], boolean[], custom HeapEntry type) while preserving the JavaScript logic. It modifies nums in place for merged sums and ensures O(n log n) time complexity.
// I'll break it down section by section, line by line, with explanations, reasoning, TypeScript-specific notes (e.g., types, non-null assertions), and examples using nums = [5,2,3,1] (expected output: 2). Assume nums contains non-negative integers, as per examples.
// Step 1: Function Signature and Edge Cases
// TypeScriptfunction minimumPairRemoval(nums: number[]): number {
//     const n: number = nums.length;
//     if (n <= 1) return 0;

// Explanation: Defines a function taking a number[] (array of numbers) and returning a number (operations count).
// n is typed as number and caches length for efficiency.
// If n <= 1, the array is trivially non-decreasing → return 0.

// TypeScript Notes: Explicit types ensure compile-time checks (e.g., nums must be numbers). No implicit any.
// Why? Handles empty or single-element arrays immediately.
// Example: nums = [7] → Returns 0.

// Step 2: Setting Up the Doubly Linked List
// TypeScript// Doubly linked list simulation using indices
//     const prev: number[] = new Array(n).fill(-1);
//     const next: number[] = new Array(n).fill(-1);
//     const alive: boolean[] = new Array(n).fill(true);

//     for (let i = 0; i < n; i++) {
//         if (i > 0) prev[i] = i - 1;
//         if (i < n - 1) next[i] = i + 1;
//     }

// Explanation: Creates arrays to simulate a doubly linked list:
// prev: Stores previous alive index (-1 if none).
// next: Stores next alive index (-1 if none).
// alive: Flags if an index is active (not merged).
// Loop initializes a linear chain: First element has prev = -1, last has next = -1.

// TypeScript Notes: Arrays typed as number[] or boolean[] for safety. new Array(n).fill() is type-safe here.
// Why? Merges "remove" elements by updating links (O(1)), avoiding costly array splices. nums holds values/sums.
// Example: For [5,2,3,1]:
// prev = [-1, 0, 1, 2]
// next = [1, 2, 3, -1]
// alive = [true, true, true, true]
// Represents: 0(5) ↔ 1(2) ↔ 2(3) ↔ 3(1)


// Step 3: Counting Initial Strictly Decreasing Pairs
// TypeScript// Count number of strictly decreasing adjacent pairs
//     let decreaseCount: number = 0;
//     for (let i = 0; i < n - 1; i++) {
//         if (nums[i] > nums[i + 1]) decreaseCount++;
//     }

//     if (decreaseCount === 0) return 0;

// Explanation: Loops through adjacent pairs; increments if nums[i] > nums[i+1] (strict decrease).
// If zero, array is already non-decreasing → return 0.

// TypeScript Notes: decreaseCount typed as number; loop uses implicit number indices.
// Why? Tracks violations efficiently. Updated incrementally later (no full rescans).
// Example: 5>2 (yes), 2>3 (no), 3>1 (yes) → decreaseCount = 2.

// Step 4: Min-Heap Setup and Helper Functions
// TypeScript// ────────────────────────────────────────────────────────
//     // Min-Heap (priority queue) — stores [sum, leftIndex]
//     // ────────────────────────────────────────────────────────
//     type HeapEntry = [number, number]; // [sum, index]

//     const heap: HeapEntry[] = [];

//     const compare = (a: HeapEntry, b: HeapEntry): number => {
//         if (a[0] !== b[0]) return a[0] - b[0];
//         return a[1] - b[1]; // smaller index wins (leftmost pair)
//     };

//     const siftUp = (idx: number): void => {
//         while (idx > 0) {
//             const parent = (idx - 1) >> 1;
//             if (compare(heap[parent], heap[idx]) <= 0) break;
//             [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
//             idx = parent;
//         }
//     };

//     const siftDown = (idx: number): void => {
//         const len: number = heap.length;
//         while (true) {
//             let smallest: number = idx;
//             const left: number = idx * 2 + 1;
//             const right: number = idx * 2 + 2;

//             if (left < len && compare(heap[left], heap[smallest]) < 0) {
//                 smallest = left;
//             }
//             if (right < len && compare(heap[right], heap[smallest]) < 0) {
//                 smallest = right;
//             }
//             if (smallest === idx) break;

//             [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
//             idx = smallest;
//         }
//     };

//     const heapPush = (item: HeapEntry): void => {
//         heap.push(item);
//         siftUp(heap.length - 1);
//     };

//     const heapPop = (): HeapEntry | null => {
//         if (heap.length === 0) return null;

//         const top: HeapEntry = heap[0];
//         const last: HeapEntry = heap.pop()!;

//         if (heap.length > 0) {
//             heap[0] = last;
//             siftDown(0);
//         }

//         return top;
//     };

// Explanation: Implements a binary min-heap storing [sum, index] tuples.
// HeapEntry: Alias for tuple type.
// compare: Returns <0 if a < b (smaller sum first; tie by smaller index for leftmost).
// siftUp: Bubbles new item up if smaller than parent.
// siftDown: Bubbles root down after pop.
// heapPush: Add to end, sift up (O(log n)).
// heapPop: Remove/return min, replace with last, sift down (O(log n)).

// TypeScript Notes: Tuple types, function return types (void, HeapEntry | null), and non-null ! (safe after pop() check) ensure safety.
// Why? Priority queue for min-sum pair. Custom compare handles ties per problem.

// Step 5: Initializing the Heap
// TypeScript// Initialize heap with all adjacent pairs
//     for (let i = 0; i < n - 1; i++) {
//         heapPush([nums[i] + nums[i + 1], i]);
//     }

// Explanation: Pushes initial pairs [sum, leftIndex].
// TypeScript Notes: [number, number] matches HeapEntry.
// Example: Pushes [7,0], [5,1], [4,2] → Heap min: [4,2].

// Step 6: Operations Counter
// TypeScriptlet operations: number = 0;

// Explanation: Counts merges.

// Step 7: Main Loop - Performing Merges
// TypeScriptwhile (decreaseCount > 0) {
//         let sum: number;
//         let i: number;
//         let j: number;

//         // Lazy deletion: find the first valid minimum pair
//         while (true) {
//             const entry = heapPop();
//             if (!entry) {
//                 // This should never happen in a correct implementation
//                 break;
//             }

//             [sum, i] = entry;
//             j = next[i];

//             if (
//                 j !== -1 &&
//                 alive[i] &&
//                 alive[j] &&
//                 nums[i] + nums[j] === sum
//             ) {
//                 break;
//             }
//             // else → stale entry → discard
//         }

// Explanation: Loop until no decreases.
// Inner: Pop min entry; destructure to sum, i; get j.
// Validate pair; if invalid (stale), discard and repeat.

// TypeScript Notes: Destructuring typed safely; !entry checks null.
// Why? Lazy deletion skips outdated entries.
// Example (1st): Pop [4,2], valid.

// Step 8: Removing Old Decreasing Effects
// TypeScript// Remove effect of old decreasing relations
//         if (prev[i] !== -1 && nums[prev[i]] > nums[i]) decreaseCount--;
//         if (nums[i] > nums[j]) decreaseCount--;
//         if (next[j] !== -1 && nums[j] > nums[next[j]]) decreaseCount--;

// Explanation: Decrement for old edges' violations.
// Example: Middle yes → decreaseCount=1.

// Step 9: Merging the Pair
// TypeScript// Merge: add j into i, remove j
//         nums[i] += nums[j];
//         alive[j] = false;
//         operations++;

//         const r: number = next[j];
//         next[i] = r;
//         if (r !== -1) prev[r] = i;

// Explanation: Sum into i, deactivate j, update links.
// Example: nums[2]=4, operations=1.

// Step 10: Adding New Decreasing Effects
// TypeScript// Add effect of new decreasing relations
//         if (prev[i] !== -1 && nums[prev[i]] > nums[i]) decreaseCount++;
//         if (next[i] !== -1 && nums[i] > nums[next[i]]) decreaseCount++;

// Explanation: Increment for new edges' violations.

// Step 11: Pushing New Candidates
// TypeScript// Insert new possible merge candidates
//         if (prev[i] !== -1) {
//             heapPush([nums[prev[i]] + nums[i], prev[i]]);
//         }
//         if (next[i] !== -1) {
//             heapPush([nums[i] + nums[next[i]], i]);
//         }
//     }

// Explanation: Add new adjacent pairs.
// Example: Push [6,1].

// Step 12: Return the Result
// TypeScriptreturn operations;
// }

// Explanation: Returns total operations after loop.
// Full Example Wrap-Up: After 2nd merge, decreaseCount=0 → Return 2.

// Summary and TypeScript Insights

// Correctness: Greedy + heap ensures minimal ops.
// TypeScript Benefits: Types catch errors early (e.g., wrong array access).
// Efficiency: O(n log n).


export function minimumPairRemoval(nums: number[]): number {
  const n: number = nums.length;
  if (n <= 1) return 0;

  // Doubly linked list simulation using indices
  const prev: number[] = new Array(n).fill(-1);
  const next: number[] = new Array(n).fill(-1);
  const alive: boolean[] = new Array(n).fill(true);

  for (let i = 0; i < n; i++) {
    if (i > 0) prev[i] = i - 1;
    if (i < n - 1) next[i] = i + 1;
  }

  // Count number of strictly decreasing adjacent pairs
  let decreaseCount: number = 0;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) decreaseCount++;
  }

  if (decreaseCount === 0) return 0;

  // ────────────────────────────────────────────────────────
  // Min-Heap (priority queue) — stores [sum, leftIndex]
  // ────────────────────────────────────────────────────────
  type HeapEntry = [number, number]; // [sum, index]

  const heap: HeapEntry[] = [];

  const compare = (a: HeapEntry, b: HeapEntry): number => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1]; // smaller index wins (leftmost pair)
  };

  const siftUp = (idx: number): void => {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (compare(heap[parent], heap[idx]) <= 0) break;
      [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
      idx = parent;
    }
  };

  const siftDown = (idx: number): void => {
    const len: number = heap.length;
    while (true) {
      let smallest: number = idx;
      const left: number = idx * 2 + 1;
      const right: number = idx * 2 + 2;

      if (left < len && compare(heap[left], heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < len && compare(heap[right], heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === idx) break;

      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
      idx = smallest;
    }
  };

  const heapPush = (item: HeapEntry): void => {
    heap.push(item);
    siftUp(heap.length - 1);
  };

  const heapPop = (): HeapEntry | null => {
    if (heap.length === 0) return null;

    const top: HeapEntry = heap[0];
    const last: HeapEntry = heap.pop()!;

    if (heap.length > 0) {
      heap[0] = last;
      siftDown(0);
    }

    return top;
  };

  // Initialize heap with all adjacent pairs
  for (let i = 0; i < n - 1; i++) {
    heapPush([nums[i] + nums[i + 1], i]);
  }

  let operations: number = 0;

  while (decreaseCount > 0) {
    // Lazy deletion: find the first valid minimum pair
    let sum: number = 0;
    let i: number = -1;
    let j: number = -1;

    while (true) {
      const entry = heapPop();
      if (!entry) {
        // This should never happen in a correct implementation
        break;
      }

      [sum, i] = entry;
      j = next[i];

      if (j !== -1 && alive[i] && alive[j] && nums[i] + nums[j] === sum) {
        break;
      }
      // else → stale entry → discard
    }

    // Remove effect of old decreasing relations
    if (prev[i] !== -1 && nums[prev[i]] > nums[i]) decreaseCount--;
    if (nums[i] > nums[j]) decreaseCount--;
    if (next[j] !== -1 && nums[j] > nums[next[j]]) decreaseCount--;

    // Merge: add j into i, remove j
    nums[i] += nums[j];
    alive[j] = false;
    operations++;

    const r: number = next[j];
    next[i] = r;
    if (r !== -1) prev[r] = i;

    // Add effect of new decreasing relations
    if (prev[i] !== -1 && nums[prev[i]] > nums[i]) decreaseCount++;
    if (next[i] !== -1 && nums[i] > nums[next[i]]) decreaseCount++;

    // Insert new possible merge candidates
    if (prev[i] !== -1) {
      heapPush([nums[prev[i]] + nums[i], prev[i]]);
    }
    if (next[i] !== -1) {
      heapPush([nums[i] + nums[next[i]], i]);
    }
  }

  return operations;
}


// ====================  PYTHON VS JAVASCRIPT VS TYPESCRIPT COMPARISON ====================

// All three solutions implement the same algorithmic idea from the editorial:

// Priority Queue + Lazy Deletion + Doubly Linked List (via arrays)
// Time: O(n log n), Space: O(n)

// I’ll structure this comparison so it’s easy to follow and useful for interviews, production code, and LeetCode-style reasoning.

// 1️⃣ Algorithmic Parity (What’s Identical Across All 3)

// At a logical level, the three solutions are equivalent:

// Core shared ideas
// Concept	Python	JavaScript	TypeScript
// Doubly linked list	prev, nxt arrays	prev, next arrays	prev, next arrays
// Lazy deletion	alive[] + sum check	alive[] + sum check	alive[] + sum check
// Heap entries	(sum, index) tuple	[sum, index] array	[number, number] tuple
// Termination	decreaseCount == 0	same	same
// Merge direction	always merge right → left	same	same

// ➡️ This is important:
// If one version is logically wrong, all should be wrong.
// Your Python version is correct, so the JS/TS versions must preserve exact semantics, especially around heap ordering and stale-entry checks.

// 2️⃣ Python Solution — Why It’s the Cleanest & Hardest to Break
// Strengths
// ✅ Built-in heapq
// heapq.heappush(heap, (sum, index))
// heapq.heappop(heap)


// Python automatically:

// Orders by sum

// Breaks ties by index

// Handles tuples correctly and consistently

// This guarantees:

// Minimum sum → leftmost index, exactly as the problem demands.

// ✅ Tuples are immutable

// This prevents subtle bugs where heap entries accidentally mutate.

// ✅ Expressive logic

// Python’s clarity makes the algorithm easy to audit:

// if j != -1 and alive[i] and alive[j] and nums[i] + nums[j] == s:


// No extra boilerplate = fewer places for mistakes.

// Weaknesses

// Slightly slower than JS/TS in raw execution

// Less explicit typing (acceptable on LeetCode, risky in production)

// 3️⃣ JavaScript Solution — Most Error-Prone (But Fast)

// Your JS solution is algorithmically correct, but JS introduces extra failure vectors that Python avoids.

// Where JS Is More Fragile
// ⚠️ Manual heap implementation

// JS has no native priority queue, so you wrote:

// compare(a, b) {
//   if (a[0] !== b[0]) return a[0] - b[0];
//   return a[1] - b[1];
// }


// This is correct — but easy to get subtly wrong:

// Forget tie-breaking → wrong “leftmost” behavior

// Incorrect comparator → heap corruption

// Any mutation of heap entries → silent bugs

// This is exactly why your earlier JS versions failed test cases like:

// [0,1,1,2,-1,1]


// Python never had this risk.

// ⚠️ Mutable arrays as heap entries
// [someSum, index]


// JS arrays are mutable. If reused or accidentally modified:

// Heap invariants break

// Lazy deletion logic misfires

// Python tuples prevent this class of bug.

// Strengths of JS

// Faster execution than Python

// Closer to frontend/runtime environments

// More control over heap internals (useful for interviews)

// Verdict for JS

// ✅ Correct but high cognitive load
// ❌ Easy to introduce subtle bugs
// ⚠️ Must be extremely disciplined with heap logic

// 4️⃣ TypeScript — Best Engineering Tradeoff

// TypeScript keeps JS performance while eliminating entire bug classes.

// Key Improvements Over JS
// ✅ Strong typing
// type HeapEntry = [number, number];
// const alive: boolean[];


// This prevents:

// Accidentally pushing malformed heap entries

// Using invalid indices

// Misinterpreting return types (null vs tuple)

// ✅ Compiler-assisted correctness

// TypeScript forces you to handle edge cases:

// const entry = heapPop();
// if (!entry) break;


// In JS, forgetting this causes runtime crashes.
// In TS, you’re forced to think.

// Runtime behavior

// Identical to JS (compiled away)

// No performance penalty

// More readable long-term

// Verdict for TypeScript

// 🏆 Best choice for production-quality solutions

// Same speed as JS

// Almost as concise as Python

// Far safer than JS

// 5️⃣ Side-by-Side Comparison Summary
// Aspect	Python	JavaScript	TypeScript
// Heap support	✅ Built-in	❌ Manual	❌ Manual
// Tie-breaking safety	✅ Automatic	⚠️ Manual	⚠️ Manual
// Type safety	❌ None	❌ None	✅ Strong
// Readability	⭐⭐⭐⭐⭐	⭐⭐⭐	⭐⭐⭐⭐
// Bug resistance	⭐⭐⭐⭐⭐	⭐⭐	⭐⭐⭐⭐
// Runtime speed	⭐⭐⭐	⭐⭐⭐⭐	⭐⭐⭐⭐
// Best use case	LeetCode, teaching	Interviews, browser	Production, large codebases
// 6️⃣ Final Engineering Recommendation

// If I were choosing:

// LeetCode / Algorithm explanation → Python

// Interview in JS-only environment → JavaScript (very careful)

// Real-world system / long-term maintenance → TypeScript

// Your implementations correctly reflect this progression:

// Python → correctness clarity
// JS → performance + verbosity
// TS → correctness + performance + maintainability
