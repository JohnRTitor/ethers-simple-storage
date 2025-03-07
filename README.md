### Steps beforehand
1. We installed `@types/fs-extra` and `@types/node`
2. We have a `tsconfig.json` file
3. We have to compile our ts code and then run our js code
4. ~~Or we can just run `deno` by using `deno deploy.ts`~~

### Commands to run
1. `devenv init`
2. Enable stuff in devenv.nix, mainly you need corepack, yarn, npm, typescript, javascript. You can use this project's devenv.nix as well.
3. ~You can get deno too. Deno has native support for JavaScript and TypeScript, making it a great choice for building web applications and APIs.~
4. ~Moreover with deno, you can directly run `deno deploy.ts` :)~
  Just use `tsnode deploy.ts`, deno has issues with Ethers.js
5. `devenv shell` need to be run every time you open the project in your shell, or your can setup direnv
6. `yarn add @types/node -D` for `process` modules
7. `yarn add solc@0.8.16 -D` for solc - Solidity compiler
8. `yarn add fs-extra` for file system operations
9. `yarn add ethers` for Ethers.js
10. `yarn add dotenv` for environment variables

### Compilation
```shell
solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
```
### Starting a blockchain server


```shell
ganache -d
```

The `-d` flag makes ganache deterministic, so each time same set of accounts and same set of private keys will be generated.
This is ideal as we don't have to update the private keys in `.env` everytime we start our server.

You can get the RPC_URL, private keys and accounts from ganache-cli output.
It's a good idea to export your PRIVATE_KEY in a `.env` file (with `chmod 600` permissions), instead of hardcoding it.
Make sure to have `.env` in your `.gitignore` file to avoid committing sensitive information.

### Notes
- Don't use `deno` with Ethers.js, it will fail, as it's made for Node.js. To make it
  work with Deno, you might need to make additional adjustments, which is out of scope
  for this project.

Last but not the least, follow [Patrick's typescript repo](https://github.com/PatrickAlphaC/ethers-simple-storage-fcc/tree/typescript)
for this project. But that repo is outdated and not in sync with Ethers.js 6.0. You might need to make some adjustments
