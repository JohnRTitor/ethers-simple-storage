### Steps beforehand
1. We installed `@types/fs-extra` and `@types/node`
2. We have a `tsconfig.json` file
3. We have to compile our ts code and then run our js code
4. Or we can just run `deno` by using `deno deploy.ts`

### Commands to run
1. `devenv init`
2. Enable stuff in devenv.nix, mainly you need corepack, yarn, npm, typescript, javascript. You can use this project's devenv.nix as well.
3. You can get deno too. Deno has native support for JavaScript and TypeScript, making it a great choice for building web applications and APIs.
4. Moreover with deno, you can directly run `deno deploy.ts` :)
5. `devenv shell` need to be run every time you open the project in your shell, or your can setup direnv
6. `yarn add @types/node -D` for `process` modules
7. `yarn add solc@0.8.15` for solc - Solidity compiler


Last but not the least, follow [Patrick's typescript repo](https://github.com/PatrickAlphaC/ethers-simple-storage-fcc/tree/typescript) for this project.
