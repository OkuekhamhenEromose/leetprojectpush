// ===========================  LOGIC EXPLANATION  ==========================
// 🧩 The Problem (In Simple Terms)

// We start with:

// A string of digits (like "5525").

// Two operations we can do as many times as we want:

// Add Operation – Add a number a to all digits in odd positions (1, 3, 5, …).

// Rotate Operation – Rotate the string right by b positions.

// Our goal is to keep doing these until we find the smallest string possible when compared alphabetically (“lexicographically”).

// 🎯 Example

// Let’s say:

// s = "5525"
// a = 9
// b = 2


// We can rotate, add, or repeat operations — but instead of guessing endlessly, we want a smart way to explore all possible outcomes until we find the smallest string.

// 🧠 Step 1: Think in Terms of States

// Each unique string (like "5525", "2555", "2050", etc.) is a state.
// We can move from one state to another by applying an operation.

// That means this is like exploring paths in a graph:

// Each string = a node.

// Each operation = an edge connecting to another node.

// We just need to visit every unique string once and record the smallest one.

// ⚙️ Step 2: Representing Our Search (BFS/DFS)

// We’ll use a queue (for BFS — breadth-first search).
// Why? Because BFS systematically explores all reachable states without missing any.

// We’ll also need a Set called visited so we don’t repeat the same string forever.

// 💡 Step 3: Build Helper Functions

// Let’s define two mini functions — one for each operation.

// 🧮 Add Operation
// function addOperation(str, a) {
//   const arr = str.split('');        // turn string into an array of characters
//   for (let i = 1; i < arr.length; i += 2) {
//     arr[i] = ((+arr[i] + a) % 10).toString();  // add 'a' and wrap around 0-9
//   }
//   return arr.join('');              // convert back to string
// }


// ✅ Explanation:

// We loop through odd indices only (i = 1, 3, 5, …).

// We convert each digit (a string) to a number with +arr[i].

// We add a, and % 10 ensures if it passes 9, it wraps back to 0.

// Convert it back to a string.

// Join all digits back together.

// 🔁 Rotate Operation
// function rotateOperation(str, b) {
//   const n = str.length;
//   return str.slice(n - b) + str.slice(0, n - b);
// }


// ✅ Explanation:

// slice(n - b) grabs the last b characters.

// slice(0, n - b) grabs the rest at the start.

// We join them to get a right rotation.

// For example:

// "3456" rotated by 1 → "6345"

// 🚀 Step 4: The Main Algorithm

// Now let’s put it all together:

// var findLexSmallestString = function(s, a, b) {
//   const visited = new Set();   // keep track of already seen strings
//   const queue = [s];           // start exploring from original string
//   let smallest = s;            // assume s is the smallest initially
//   const n = s.length;

//   const addOperation = (str) => {
//     const arr = str.split('');
//     for (let i = 1; i < n; i += 2) {
//       arr[i] = ((+arr[i] + a) % 10).toString();
//     }
//     return arr.join('');
//   };

//   const rotateOperation = (str) => {
//     return str.slice(n - b) + str.slice(0, n - b);
//   };

//   while (queue.length > 0) {
//     const curr = queue.shift();      // take one string out
//     if (visited.has(curr)) continue; // skip if already seen
//     visited.add(curr);               // mark as visited

//     // keep track of the smallest string found
//     if (curr < smallest) smallest = curr;

//     // create two new strings from current one
//     const added = addOperation(curr);
//     const rotated = rotateOperation(curr);

//     // explore them if we haven’t already
//     if (!visited.has(added)) queue.push(added);
//     if (!visited.has(rotated)) queue.push(rotated);
//   }

//   return smallest;
// };

// 🧭 Step 5: Understanding the Flow

// Let’s dry-run this with a small example:

// s = "74", a = 5, b = 1

// Step	Current String	Operation	Result	Added to Queue
// 1	"74"	rotate(1)	"47"	✅
// 1	"74"	add(5)	"74" (no change on odd index?)	
// 2	"47"	add(5)	"42"	✅
// 3	"42"	rotate(1)	"24"	✅
// 4	Compare all: smallest = "24"		✅	

// ✅ Final answer: "24"

// 🧩 Step 6: Why It Works

// Because:

// We explore every unique possible state the string can transform into.

// We don’t repeat states (thanks to visited).

// We always compare strings lexicographically (just normal string comparison).

// Finally, we return the smallest string found.

// 🧠 Step 7: Core JavaScript Concepts You Learn Here
// Concept	Meaning
// String vs Array	Use .split() to manipulate characters easily
// Set	Efficient way to track unique values
// Queue (Array)	Use .push() and .shift() for BFS
// Modular arithmetic %	Keeps numbers between 0–9
// Lexicographic comparison	Simple string comparison: "2050" < "5525"
// Function decomposition	Break a big problem into small helper functions
// ✅ Final Takeaway

// When solving algorithm problems in JavaScript:

// Think in terms of states and transitions.

// Use data structures like Set, Queue, and String methods effectively.

// Always test small examples to verify your logic.

// ============================  CODE STRUCTURE  =============================
// (1) funct findLexSmallestString(3p){VnewSet,2V,v,
// (1a) functaddOperation(p){Vsplit,for(p){[i]toString}return.join}
// (1b) functrotateOperation(p){return.slice+.slice()}
// (1c) while(p){V.shift,if(p)continue,.add,if(p)=,2V,2if(p).push}
// (1d) return
// }

var findLexSmallestString = function(s, a, b) {
  const visited = new Set();
  const queue = [s];
  let smallest = s;
  const n = s.length;

  const addOperation = (str) => {
    const arr = str.split('');
    for (let i = 1; i < n; i += 2) {
      arr[i] = ((+arr[i] + a) % 10).toString();
    }
    return arr.join('');
  };

  const rotateOperation = (str) => {
    return str.slice(n - b) + str.slice(0, n - b);
  };

  while (queue.length > 0) {
    const curr = queue.shift();
    if (visited.has(curr)) continue;
    visited.add(curr);

    if (curr < smallest) smallest = curr;

    // Apply both operations
    const added = addOperation(curr);
    const rotated = rotateOperation(curr);

    if (!visited.has(added)) queue.push(added);
    if (!visited.has(rotated)) queue.push(rotated);
  }

  return smallest;
};