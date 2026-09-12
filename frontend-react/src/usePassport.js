import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, PRIVATE_KEY, RPC_URL, ABI } from "./passportConfig";

export function usePassport() {
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState({ text: "Connecting…", kind: "" });

  const [state, setState] = useState({
    registered: false,
    profile: null,
    eduPoints: "0",
    healthPoints: "0",
    creditScore: "0",
    loanLimit: "0",
    borrowed: "0",
    available: "0",
    certificates: [],
    attestations: [],
  });

  // ---------- log helper ----------
  const log = useCallback((msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { time, msg }]);
  }, []);

  // ---------- connect once on mount ----------
  useEffect(() => {
    (async () => {
      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const w = new ethers.Wallet(PRIVATE_KEY, provider);
        const c = new ethers.Contract(CONTRACT_ADDRESS, ABI, w);
        setWallet(w);
        setContract(c);
        log(`Connected as ${w.address.slice(0, 6)}…`);
        setStatus({ text: "Connected ✅", kind: "ok" });
      } catch (err) {
        log("Connect failed: " + err.message);
        setStatus({
          text: "Cannot reach node. Run `npx hardhat node`.",
          kind: "err",
        });
      }
    })();
  }, [log]);

  // ---------- refresh all state from the chain ----------
  const refresh = useCallback(async () => {
    if (!contract || !wallet) return;
    try {
      const addr = wallet.address;
      const isReg = await contract.isRegistered(addr);

      if (!isReg) {
        setState((s) => ({ ...s, registered: false }));
        return;
      }

      const [
        profile,
        eduPoints,
        healthPoints,
        creditScore,
        loanLimit,
        borrowed,
        available,
        certificates,
        attestations,
      ] = await Promise.all([
        contract.profiles(addr),
        contract.educationPoints(addr),
        contract.healthPoints(addr),
        contract.creditScore(addr),
        contract.loanLimit(addr),
        contract.totalBorrowed(addr),
        contract.availableCredit(addr),
        contract.getCertificates(addr),
        contract.getAttestations(addr),
      ]);

      setState({
        registered: true,
        profile,
        eduPoints: eduPoints.toString(),
        healthPoints: healthPoints.toString(),
        creditScore: creditScore.toString(),
        loanLimit: ethers.formatEther(loanLimit),
        borrowed: ethers.formatEther(borrowed),
        available: ethers.formatEther(available),
        certificates,
        attestations,
      });
    } catch (err) {
      log("Refresh failed: " + (err.shortMessage || err.message));
    }
  }, [contract, wallet, log]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ---------- generic transaction wrapper ----------
  const run = useCallback(
    async (label, fn) => {
      try {
        setStatus({ text: `${label}…`, kind: "" });
        const tx = await fn();
        await tx.wait();
        log(`${label} ✅`);
        setStatus({ text: `${label} ✅`, kind: "ok" });
        await refresh();
      } catch (err) {
        const msg = err.shortMessage || err.message;
        log(`${label} failed: ${msg}`);
        setStatus({ text: `${label} failed ❌`, kind: "err" });
      }
    },
    [refresh, log],
  );

  // ---------- actions ----------
  const register = useCallback(
    (name) => run("Registering", () => contract.register(name)),
    [contract, run],
  );

  const issueCertificate = useCallback(
    (course) =>
      run("Adding certificate", () =>
        contract.issueCertificate(wallet.address, course),
      ),
    [contract, wallet, run],
  );

  const attestHealth = useCallback(
    (kind) =>
      run("Adding attestation", () =>
        contract.attestHealth(wallet.address, kind),
      ),
    [contract, wallet, run],
  );

  const requestLoan = useCallback(
    (amountEth) =>
      run("Requesting loan", () =>
        contract.requestLoan(ethers.parseEther(amountEth)),
      ),
    [contract, run],
  );

  const repayLoan = useCallback(
    (amountEth) =>
      run("Repaying loan", () =>
        contract.repayLoan(ethers.parseEther(amountEth)),
      ),
    [contract, run],
  );

  return {
    wallet,
    state,
    logs,
    status,
    register,
    issueCertificate,
    attestHealth,
    requestLoan,
    repayLoan,
  };
}
