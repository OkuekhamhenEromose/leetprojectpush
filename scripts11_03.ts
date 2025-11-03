function minCost(colors: string, neededTime: number[]): number {
    let totalTime = 0;      // To store total removal time
    let maxTime = neededTime[0]; // Track the highest removal time in the current group

    // Loop from the second balloon to the end
    for (let i = 1; i < colors.length; i++) {
        if (colors[i] === colors[i - 1]) {
            // Same color → must remove one of them
            totalTime += Math.min(maxTime, neededTime[i]); // Remove the smaller cost
            maxTime = Math.max(maxTime, neededTime[i]);    // Keep the bigger cost
        } else {
            // New color → reset maxTime
            maxTime = neededTime[i];
        }
    }

    return totalTime;
}
