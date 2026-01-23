
// "Minimum Operations to Make Array Non-Decreasing by Merging Adjacent Elements" (titled "Minimum Pair Removal to Sort Array II" in the query). This is a hard-level problem where we need to make an array nums non-decreasing (each element >= previous) by repeatedly merging the adjacent pair with the smallest sum (leftmost in case of ties), replacing them with their sum, and counting the minimum operations (merges) required.
// The code uses an efficient greedy simulation:

// Doubly Linked List: To handle merges/removals without array shifting.
// Min-Heap (Priority Queue): To always find the smallest-sum pair quickly, with tie-breaking for leftmost.
// Decrease Count: Tracks violations (adjacent pairs where left > right) to know when the array is sorted.
// Lazy Deletion: Handles stale heap entries efficiently.

// This approach ensures O(n log n) time complexity, making it suitable for typical constraints (e.g., n up to 10^5).
// The code is self-contained (no classes, just functions inside the main function) and modifies nums in place for merged sums. I'll break it down section by section, with line-by-line explanations, reasoning, and examples using nums = [5,2,3,1] (output: 2).
// Step 1: Function Signature and Edge Cases
// JavaScriptvar minimumPairRemoval = function(nums) {
//     const n = nums.length;
//     if (n <= 1) return 0;

// Explanation: Defines the function taking an array nums (assumed non-negative integers).
// n caches the length for efficiency.
// If n <= 1, no pairs exist, so it's already non-decreasing → return 0 operations.
// Why? Single element or empty array needs no merges.
// Example: [ ] or [7] → 0.

// Step 2: Setting Up the Doubly Linked List
// JavaScript// Doubly linked list simulation using indices
//     const prev = new Array(n).fill(-1);
//     const next = new Array(n).fill(-1);
//     const alive = new Array(n).fill(true);
//     for (let i = 0; i < n; i++) {
//         if (i > 0) prev[i] = i - 1;
//         if (i < n - 1) next[i] = i + 1;
//     }

// Explanation: Simulates the array as a doubly linked list via indices:
// prev[i]: Previous alive element's index (-1 if none).
// next[i]: Next alive element's index (-1 if none).
// alive[i]: True if index i is still active (not merged away).

// Loop chains them: Element 0 has prev=-1, next=1; last has next=-1.
// Why? Merging "removes" elements by skipping them (update links), avoiding O(n) array shifts. nums stores original/merged values.
// Example[5,2,3,1]:
// prev: [-1, 0, 1, 2]
// next: [1, 2, 3, -1]
// alive: [true, true, true, true]

// Effective list: 0(5) ↔ 1(2) ↔ 2(3) ↔ 3(1)

// Step 3: Counting Initial Decreasing Pairs
// JavaScript// Count number of decreasing adjacent pairs
//     let decreaseCount = 0;
//     for (let i = 0; i < n - 1; i++) {
//         if (nums[i] > nums[i + 1]) decreaseCount++;
//     }
//     if (decreaseCount === 0) return 0;

// Explanation: Scans adjacent pairs; if nums[i] > nums[i+1], it's a violation → increment decreaseCount.
// If zero, array is already non-decreasing → return 0.
// Why?decreaseCount is the loop condition (stop when 0). Updated incrementally for efficiency (no full rescan after merges).
// Example: Pairs 5>2 (yes), 2>3 (no), 3>1 (yes) → decreaseCount = 2.

// Step 4: Min-Heap Implementation (Priority Queue)
// JavaScript// ────────────────────────────────────────────────────────
//     // Min-Heap (priority queue) implementation - function style
//     // We store [sum, leftIndex]
//     // We break ties by smaller index (leftmost pair)
//     // ────────────────────────────────────────────────────────
//     const heap = [];
//     const heapPush = (item) => {
//         heap.push(item);
//         siftUp(heap.length - 1);
//     };
//     const heapPop = () => {
//         if (heap.length === 0) return null;
//         const top = heap[0];
//         const last = heap.pop();
//         if (heap.length > 0) {
//             heap[0] = last;
//             siftDown(0);
//         }
//         return top;
//     };
//     const siftUp = (i) => {
//         while (i > 0) {
//             const p = (i - 1) >> 1;
//             // Compare: smaller sum OR same sum + smaller index
//             if (compare(heap[p], heap[i]) <= 0) break;
//             [heap[p], heap[i]] = [heap[i], heap[p]];
//             i = p;
//         }
//     };
//     const siftDown = (i) => {
//         const len = heap.length;
//         while (true) {
//             let smallest = i;
//             const left = i * 2 + 1;
//             const right = i * 2 + 2;
//             if (left < len && compare(heap[left], heap[smallest]) < 0) {
//                 smallest = left;
//             }
//             if (right < len && compare(heap[right], heap[smallest]) < 0) {
//                 smallest = right;
//             }
//             if (smallest === i) break;
//             [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
//             i = smallest;
//         }
//     };
//     // Compare two entries: [sum, index]
//     // Returns negative if a < b, 0 if equal, positive if a > b
//     const compare = (a, b) => {
//         if (a[0] !== b[0]) return a[0] - b[0];
//         return a[1] - b[1]; // smaller index wins (leftmost)
//     };

// Explanation: Implements a binary min-heap storing [sum, leftIndex] for adjacent pairs.
// heap: Array holding heap elements.
// heapPush(item): Adds to end, bubbles up via siftUp (O(log n)).
// heapPop(): Removes/returns min, moves last to root, bubbles down via siftDown (O(log n)).
// siftUp/siftDown: Restore heap property using compare.
// compare(a, b): Prioritizes smaller sum; on tie, smaller index (leftmost pair).

// Why? Efficiently finds min-sum pair. Custom compare ensures problem's tie rule.
// Binary Heap Basics: Parent at (i-1)>>1, children at 2i+1/2i+2. Min-heap: parent <= children.
// Example: For [5,2,3,1], we'll push later.

// Step 5: Initializing the Heap
// JavaScript// Initialize heap with all adjacent pairs
//     for (let i = 0; i < n - 1; i++) {
//         heapPush([nums[i] + nums[i + 1], i]);
//     }

// Explanation: Pushes all initial pairs [sum, i] (i is left index).
// Why? All adjacent pairs are candidates for merging.
// Example: Push [7,0] (5+2), [5,1] (2+3), [4,2] (3+1).
// Heap after pushes (min at root): [4,2] as min (smallest sum).


// Step 6: Operations Counter
// JavaScriptlet operations = 0;

// Explanation: Tracks merge count (returned at end).

// Step 7: Main Loop - Merging Until Sorted
// JavaScriptwhile (decreaseCount > 0) {
//         let sum, i, j;
//         // Find valid minimum pair (lazy deletion)
//         while (true) {
//             const entry = heapPop();
//             if (!entry) break; // should not happen
//             [sum, i] = entry;
//             j = next[i];
//             if (j !== -1 && alive[i] && alive[j] && nums[i] + nums[j] === sum) {
//                 break;
//             }
//             // else → stale → discard
//         }

// Explanation: Loop until no decreases.
// Inner loop: Pop min [sum, i]; compute j = next[i].
// Validate: j exists, both alive, current sum matches stored (not stale post-merge).
// If invalid, discard (lazy deletion) and pop next.

// Why lazy? Merges invalidate heap entries; skipping is cheaper than removing them.
// Example (1st iter): Pop [4,2], i=2, j=3. Valid (3+1=4) → proceed.

// Step 8: Removing Old Decreasing Effects
// JavaScript// Remove effect of old decreasing relations
//         if (prev[i] !== -1 && nums[prev[i]] > nums[i]) decreaseCount--;
//         if (nums[i] > nums[j]) decreaseCount--;
//         if (next[j] !== -1 && nums[j] > nums[next[j]]) decreaseCount--;

// Explanation: Subtract violations from three old "edges":
// Left: prev[i] > i
// Middle: i > j
// Right: j > next[j]

// Why? Merge removes these; update count incrementally.
// Example: i=2(3), j=3(1), prev=1(2), next[j]=-1.
// Left: 2>3? No.
// Middle: 3>1? Yes → -- (decreaseCount=1).
// Right: Skip.


// Step 9: Performing the Merge
// JavaScript// Merge: add j into i, remove j
//         nums[i] += nums[j];
//         alive[j] = false;
//         operations++;
//         const r = next[j];
//         next[i] = r;
//         if (r !== -1) prev[r] = i;

// Explanation: Merge sum into left (i), mark j dead, increment ops.
// Update links: Skip j by setting next[i] = next[j], update prev of next.
// Why left? Arbitrary; preserves indices.
// Example: nums[2]=3+1=4, alive[3]=false, operations=1, next[2]=-1.
// Effective: [5,2,4] (indices 0,1,2 alive).

// Step 10: Adding New Decreasing Effects
// JavaScript// Add effect of new decreasing relations
//         if (prev[i] !== -1 && nums[prev[i]] > nums[i]) decreaseCount++;
//         if (next[i] !== -1 && nums[i] > nums[next[i]]) decreaseCount++;

// Explanation: Check two new edges; increment if violations.
// Example: Left: 2>4? No. Right: Skip. decreaseCount=1.

// Step 11: Pushing New Pairs
// JavaScript// Insert new possible merge candidates
//         if (prev[i] !== -1) {
//             heapPush([nums[prev[i]] + nums[i], prev[i]]);
//         }
//         if (next[i] !== -1) {
//             heapPush([nums[i] + nums[next[i]], i]);
//         }
//     }

// Explanation: Push up to two new pairs post-merge.
// Example: Push [2+4=6,1] (prev=1).
// Heap now has [5,1], [7,0], [6,1] → min [5,1] next.

// Step 12: Loop Continuation and Return

// 2nd iter: Pop [5,1], i=1, j=2. Sum 2+4=6 !=5 → stale, discard.
// Pop [6,1], valid (2+4=6).
// Remove old: 5>2? Yes → -- (decreaseCount=0), etc.
// Merge: nums[1]=2+4=6, alive[2]=false, operations=2.
// New: 5>6? No.
// Push [5+6=11,0].
// decreaseCount=0 → end.
// Return 2.

// Summary and Key Insights

// Correctness: Greedy choice (min-sum, leftmost) minimizes ops by merging smallest inversions first.
// Efficiency: Heap ops O(log n), total O(n log n).
// Edge Cases: Already sorted (0), ties (e.g., [10,1,1,10] merges 1+1 first due to leftmost)

var minimumPairRemoval = function(nums) {
    const n = nums.length;
    if (n <= 1) return 0;

    // Doubly linked list simulation using indices
    const prev = new Array(n).fill(-1);
    const next = new Array(n).fill(-1);
    const alive = new Array(n).fill(true);

    for (let i = 0; i < n; i++) {
        if (i > 0) prev[i] = i - 1;
        if (i < n - 1) next[i] = i + 1;
    }

    // Count number of decreasing adjacent pairs
    let decreaseCount = 0;
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] > nums[i + 1]) decreaseCount++;
    }

    if (decreaseCount === 0) return 0;

    // ────────────────────────────────────────────────────────
    // Min-Heap (priority queue) implementation - function style
    // We store [sum, leftIndex]
    // We break ties by smaller index (leftmost pair)
    // ────────────────────────────────────────────────────────
    const heap = [];

    const heapPush = (item) => {
        heap.push(item);
        siftUp(heap.length - 1);
    };

    const heapPop = () => {
        if (heap.length === 0) return null;
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            siftDown(0);
        }
        return top;
    };

    const siftUp = (i) => {
        while (i > 0) {
            const p = (i - 1) >> 1;
            // Compare: smaller sum OR same sum + smaller index
            if (compare(heap[p], heap[i]) <= 0) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };

    const siftDown = (i) => {
        const len = heap.length;
        while (true) {
            let smallest = i;
            const left  = i * 2 + 1;
            const right = i * 2 + 2;

            if (left < len && compare(heap[left], heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < len && compare(heap[right], heap[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === i) break;

            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }
    };

    // Compare two entries: [sum, index]
    // Returns negative if a < b, 0 if equal, positive if a > b
    const compare = (a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];   // smaller index wins (leftmost)
    };

    // Initialize heap with all adjacent pairs
    for (let i = 0; i < n - 1; i++) {
        heapPush([nums[i] + nums[i + 1], i]);
    }

    let operations = 0;

    while (decreaseCount > 0) {
        let sum, i, j;

        // Find valid minimum pair (lazy deletion)
        while (true) {
            const entry = heapPop();
            if (!entry) break; // should not happen

            [sum, i] = entry;
            j = next[i];

            if (j !== -1 && alive[i] && alive[j] && nums[i] + nums[j] === sum) {
                break;
            }
            // else → stale → discard
        }

        // Remove effect of old decreasing relations
        if (prev[i] !== -1 && nums[prev[i]] > nums[i]) decreaseCount--;
        if (nums[i] > nums[j]) decreaseCount--;
        if (next[j] !== -1 && nums[j] > nums[next[j]]) decreaseCount--;

        // Merge: add j into i, remove j
        nums[i] += nums[j];
        alive[j] = false;
        operations++;

        const r = next[j];
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
};


