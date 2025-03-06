// Setup movie night

// Cook popcorn
// Pour drinks
// Start Movie

// utility function
// returns a promise that resolves after the specified time
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// async functions are allowed to perform
// asynchronous executions
async function setupMovieNight(): Promise<void> {
  // await keyword tells the program to wait for the promise
  // to resolve or reject before moving on to the next line of code
  // to ensure that the popcorn is cooked before pouring drinks
  await cookPopcorn();
  await pourDrinks();
  startMovie();
}

// this returns a promise with string as value
// promise is either resolve or reject
// promise are used to handle rejections/grants in
// asynchronous operations
// Async function to simulate cooking popcorn
async function cookPopcorn(): Promise<string> {
  console.log("Cooking popcorn...");

  for (let i = 4; i >= 0; i--) {
    console.log(`Time remaining: ${i} seconds`);
    await sleep(1000); // Properly await sleep
  }

  // Simulating success or failure
  const success = Math.random() > 0.1; // 90% success rate
  if (success) {
    console.log("Popcorn is ready!");
    return "Popcorn is ready!";
  } else {
    throw new Error("Popcorn machine malfunctioned!");
  }
}

// Async function to simulate pouring drinks
async function pourDrinks(): Promise<string> {
  console.log("Pouring drinks...");
  await sleep(2000);

  const success = Math.random() > 0.1; // 90% success rate
  if (success) {
    console.log("Drinks are poured!");
    return "Drinks are poured!";
  } else {
    throw new Error("Sorry ran out of drinks!");
  }
}

// Function to start the movie
function startMovie(): void {
  console.log("Starting the movie... Enjoy!");
}

setupMovieNight();
