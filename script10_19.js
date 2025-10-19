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