async function main(): Promise<void> {
  console.log("Hi");
}

// Since main function is an async function
// we need then, catch
main()
  // on successful execution we exit the process with 0
  .then(() => {
    console.log("Deployment completed");
    process.exit(0);
  })
  // on error we exit the process with 1
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
