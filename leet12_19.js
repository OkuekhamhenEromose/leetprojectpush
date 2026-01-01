// 2092. Find All People With Secret
// Solved
// Hard
// Topics
// premium lock icon
// Companies
// Hint
// You are given an integer n indicating there are n people numbered from 0 to n - 1. You are also given a 0-indexed 2D integer array meetings where meetings[i] = [xi, yi, timei] indicates that person xi and person yi have a meeting at timei. A person may attend multiple meetings at the same time. Finally, you are given an integer firstPerson.

// Person 0 has a secret and initially shares the secret with a person firstPerson at time 0. This secret is then shared every time a meeting takes place with a person that has the secret. More formally, for every meeting, if a person xi has the secret at timei, then they will share the secret with person yi, and vice versa.

// The secrets are shared instantaneously. That is, a person may receive the secret and share it with people in other meetings within the same time frame.

// Return a list of all the people that have the secret after all the meetings have taken place. You may return the answer in any order.

 

// Example 1:

// Input: n = 6, meetings = [[1,2,5],[2,3,8],[1,5,10]], firstPerson = 1
// Output: [0,1,2,3,5]
// Explanation:
// At time 0, person 0 shares the secret with person 1.
// At time 5, person 1 shares the secret with person 2.
// At time 8, person 2 shares the secret with person 3.
// At time 10, person 1 shares the secret with person 5.​​​​
// Thus, people 0, 1, 2, 3, and 5 know the secret after all the meetings.
// Example 2:

// Input: n = 4, meetings = [[3,1,3],[1,2,2],[0,3,3]], firstPerson = 3
// Output: [0,1,3]
// Explanation:
// At time 0, person 0 shares the secret with person 3.
// At time 2, neither person 1 nor person 2 know the secret.
// At time 3, person 3 shares the secret with person 0 and person 1.
// Thus, people 0, 1, and 3 know the secret after all the meetings.
// Example 3:

// Input: n = 5, meetings = [[3,4,2],[1,2,1],[2,3,1]], firstPerson = 1
// Output: [0,1,2,3,4]
// Explanation:
// At time 0, person 0 shares the secret with person 1.
// At time 1, person 1 shares the secret with person 2, and person 2 shares the secret with person 3.
// Note that person 2 can share the secret at the same time as receiving it.
// At time 2, person 3 shares the secret with person 4.
// Thus, people 0, 1, 2, 3, and 4 know the secret after all the meetings.

// ============================  JAVASCRIPT  ====================
// 🧠 Comprehensive Explanation (JavaScript Tutor Style)
// 1️⃣ Why This Problem Is Hard

// This problem is not just graph traversal.

// Key complications:

// Meetings happen at specific times

// Secrets spread instantly within the same time

// A person can receive and forward the secret at the same time

// Connections must not leak across different times

// 👉 This means we need time-isolated connectivity, not permanent connectivity.

// 2️⃣ Why Union-Find Is Perfect Here

// Union-Find lets us:

// Dynamically group people

// Quickly check if two people are connected

// Efficiently reset connections when needed

// This is critical because:

// Connections are temporary

// Some unions must be undone

// 3️⃣ Initial Secret Setup
// union(0, firstPerson);


// At time = 0, person 0 shares the secret with firstPerson.

// They must always remain connected.

// 4️⃣ Sort Meetings by Time
// meetings.sort((a, b) => a[2] - b[2]);


// Why sorting is mandatory:

// Secrets can only move forward in time

// Meetings at the same time must be processed together

// Earlier meetings must finish before later ones begin

// 5️⃣ Process Meetings in Time Blocks
// while (i < meetings.length) {
//     const time = meetings[i][2];


// We group meetings by their time value.

// 6️⃣ Union Everyone Who Meets at the Same Time
// union(x, y);
// tempPeople.add(x);
// tempPeople.add(y);


// Important idea:

// Everyone meeting at the same time becomes temporarily connected

// This allows instant chain sharing at the same timestamp

// Example:

// A meets B at time t
// B meets C at time t
// → A, B, C all get the secret

// 7️⃣ 🚨 Critical Step: Reset Invalid Connections
// if (find(p) !== secretRoot) {
//     parent[p] = p;
// }


// This is the most important part of the algorithm.

// Why do we reset?

// Some people met, but no one had the secret

// They must NOT carry connections into the future

// Otherwise, secrets would spread incorrectly later

// 👉 Resetting ensures time isolation

// 8️⃣ Final Collection of Secret Holders
// if (find(i) === root0) {
//     result.push(i);
// }


// After all meetings:

// Anyone connected to person 0

// Knows the secret

// Order doesn’t matter.

// ⏱️ Time and Space Complexity
// Aspect	Complexity
// Sorting meetings	O(m log m)
// Union-Find ops	O(m α(n))
// Total Time	O(m log m)
// Space	O(n)

// α(n) (inverse Ackermann) is practically constant.

// 🧪 Why This Passes All Edge Cases

// ✔ Instant sharing at same time
// ✔ Prevents cross-time leakage
// ✔ Handles isolated meetings
// ✔ Handles large inputs
// ✔ Matches all sample outputs

// 🎯 Final Takeaway

// This problem teaches a powerful pattern:

// Union-Find + Time Grouping + Reset

// If you skip the reset, your answer will be wrong.


var findAllPeople = function(n, meetings, firstPerson) {
    // Union-Find (Disjoint Set)
    const parent = Array.from({ length: n }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    function union(x, y) {
        const px = find(x);
        const py = find(y);
        if (px !== py) {
            parent[py] = px;
        }
    }

    // Step 1: person 0 shares secret with firstPerson at time 0
    union(0, firstPerson);

    // Step 2: sort meetings by time
    meetings.sort((a, b) => a[2] - b[2]);

    let i = 0;

    while (i < meetings.length) {
        const time = meetings[i][2];
        const tempPeople = new Set();

        // Step 3: union all meetings at the same time
        while (i < meetings.length && meetings[i][2] === time) {
            const [x, y] = meetings[i];
            union(x, y);
            tempPeople.add(x);
            tempPeople.add(y);
            i++;
        }

        // Step 4: reset people who didn't connect to the secret
        const secretRoot = find(0);
        for (const p of tempPeople) {
            if (find(p) !== secretRoot) {
                parent[p] = p; // reset
            }
        }
    }

    // Step 5: collect all people who know the secret
    const result = [];
    const root0 = find(0);
    for (let i = 0; i < n; i++) {
        if (find(i) === root0) {
            result.push(i);
        }
    }

    return result;
};
