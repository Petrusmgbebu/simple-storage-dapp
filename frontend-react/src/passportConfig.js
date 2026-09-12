// ============================================================
// CONFIG — update after deploying
// ============================================================
export const CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
export const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
export const RPC_URL = "http://127.0.0.1:8545";

// ============================================================
// ABI — the contract's interface
// ============================================================
export const ABI = [
  "function register(string name)",
  "function isRegistered(address user) view returns (bool)",
  "function profiles(address) view returns (string name, bool registered, uint256 registeredAt)",
  "function educationPoints(address) view returns (uint256)",
  "function healthPoints(address) view returns (uint256)",
  "function creditScore(address) view returns (uint256)",
  "function loanLimit(address) view returns (uint256)",
  "function availableCredit(address) view returns (uint256)",
  "function totalBorrowed(address) view returns (uint256)",
  "function issueCertificate(address student, string courseName)",
  "function attestHealth(address patient, string kind)",
  "function requestLoan(uint256 amount)",
  "function repayLoan(uint256 amount)",
  "function certificateCount(address) view returns (uint256)",
  "function getCertificates(address) view returns (tuple(string courseName, address issuer, uint256 issuedAt)[])",
  "function getAttestations(address) view returns (tuple(string kind, address issuer, uint256 issuedAt)[])",
];
