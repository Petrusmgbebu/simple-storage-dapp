````markdown
# SimpleStorage dApp

A beginner-friendly full-stack Solidity project — a smart contract that stores a number, complete with tests, a deploy script, and a browser-based frontend.

Built to learn the complete Web3 development loop: **write → compile → test → deploy → interact**.

## Stack

- **Solidity** `^0.8.0` — the smart contract
- **Hardhat 3** — compile, test, and run
- **ethers.js v6** — talk to the contract from JavaScript
- **Vanilla HTML/CSS/JS** — no framework, just the essentials

## Structure

```text
contracts/       Solidity source code
  SimpleStorage.sol
test/            Solidity tests (incl. a fuzz test)
  SimpleStorage.t.sol
scripts/         Deploy & interaction scripts
  deploy.ts
  interact.ts
frontend/        Browser UI
  index.html
hardhat.config.ts
```
````

## Run Locally

**1. Install dependencies**

```bash
npm install
```

**2. Start a local blockchain** (keep this terminal open)

```bash
npx hardhat node
```

**3. In a second terminal, deploy the contract**

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

Copy the printed `CONTRACT_ADDRESS`.

**4. Configure the frontend**
Open `frontend/index.html` and paste:

- The `CONTRACT_ADDRESS` you just copied.
- The `PRIVATE_KEY` of **Account #0** from the `npx hardhat node` output.
  _(Note: This is a publicly known, fake test key. Never use a real private key in frontend code.)_

**5. Open `frontend/index.html` in your browser**

Type a number, click **Set**, and watch the value change — powered by a real blockchain transaction.

## Run Tests

```bash
npx hardhat test
```

You'll see tests for initial state, set/get, overwrite, and a fuzz test that runs with 256 random inputs.

## Lesson

- Writing and structuring a Solidity contract
- The difference between **transactions** (write, cost gas, async) and **calls** (read, free, instant)
- Testing with `require` and fuzz tests
- Deploying to a local node
- Connecting a frontend to a contract with ethers.js
- How `msg.sender`, state variables, and events work

## License

MIT

````

---


```markdown
## 👤 Author
**Petrus Mgbebu**
- GitHub: [@Petrusmgbebu](https://github.com/Petrusmgbebu)
````
