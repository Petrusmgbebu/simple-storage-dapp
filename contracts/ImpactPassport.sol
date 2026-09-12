// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title ImpactPassport
/// @notice One on-chain identity for education, health, and finance.
/// @dev Demo project. Not audited, not for production use.
contract ImpactPassport {

    // ==========================================================
    // SHARED: User profiles
    // ==========================================================

    struct Profile {
        string  name;
        bool    registered;
        uint256 registeredAt;
    }

    mapping(address => Profile) public profiles;

    event UserRegistered(address indexed user, string name, uint256 timestamp);

    function register(string calldata name) external {
        require(!profiles[msg.sender].registered, "Already registered");
        require(bytes(name).length > 0 && bytes(name).length <= 64, "Invalid name");

        profiles[msg.sender] = Profile({
            name: name,
            registered: true,
            registeredAt: block.timestamp
        });

        emit UserRegistered(msg.sender, name, block.timestamp);
    }

    function isRegistered(address user) public view returns (bool) {
        return profiles[user].registered;
    }

    // ==========================================================
    // EDUCATION: courses & certificates
    // ==========================================================

    struct Certificate {
        string  courseName;
        address issuer;
        uint256 issuedAt;
    }

    mapping(address => Certificate[]) private _certificates;
    mapping(address => uint256) public educationPoints;

    event CertificateIssued(
        address indexed student,
        string  courseName,
        address indexed issuer,
        uint256 timestamp
    );

    /// @notice Demo version — anyone can issue to any registered user.
    ///         In production this would require a verified teacher signature.
    function issueCertificate(address student, string calldata courseName) external {
        require(isRegistered(student), "Student not registered");
        require(bytes(courseName).length > 0, "Course name required");

        _certificates[student].push(Certificate({
            courseName: courseName,
            issuer: msg.sender,
            issuedAt: block.timestamp
        }));

        educationPoints[student] += 10;

        emit CertificateIssued(student, courseName, msg.sender, block.timestamp);
    }

    function getCertificates(address student) external view returns (Certificate[] memory) {
        return _certificates[student];
    }

    function certificateCount(address student) external view returns (uint256) {
        return _certificates[student].length;
    }

    // ==========================================================
    // HEALTHCARE: attestations
    // ==========================================================

    struct HealthAttestation {
        string  kind;      // "vaccination", "checkup", "screening"
        address issuer;
        uint256 issuedAt;
    }

    mapping(address => HealthAttestation[]) private _attestations;
    mapping(address => uint256) public healthPoints;

    event HealthAttested(
        address indexed patient,
        string  kind,
        address indexed issuer,
        uint256 timestamp
    );

    /// @notice Demo version — in production only verified clinics.
    function attestHealth(address patient, string calldata kind) external {
        require(isRegistered(patient), "Patient not registered");
        require(bytes(kind).length > 0, "Kind required");

        _attestations[patient].push(HealthAttestation({
            kind: kind,
            issuer: msg.sender,
            issuedAt: block.timestamp
        }));

        healthPoints[patient] += 5;

        emit HealthAttested(patient, kind, msg.sender, block.timestamp);
    }

    function getAttestations(address patient) external view returns (HealthAttestation[] memory) {
        return _attestations[patient];
    }

    // ==========================================================
    // FINANCE: credit score & micro-loans
    // ==========================================================

    mapping(address => uint256) public totalBorrowed;

    /// @dev 1 credit point = 0.001 ETH of borrowing capacity.
    uint256 public constant WEI_PER_POINT = 1e15;
    uint256 public constant MIN_SCORE_FOR_LOAN = 10;

    event LoanApproved(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 amount);

    function creditScore(address user) public view returns (uint256) {
        return educationPoints[user] + healthPoints[user];
    }

    function loanLimit(address user) public view returns (uint256) {
        return creditScore(user) * WEI_PER_POINT;
    }

    function availableCredit(address user) public view returns (uint256) {
        uint256 limit = loanLimit(user);
        uint256 used  = totalBorrowed[user];
        return limit > used ? limit - used : 0;
    }

    function requestLoan(uint256 amount) external {
        require(isRegistered(msg.sender), "Not registered");
        require(creditScore(msg.sender) >= MIN_SCORE_FOR_LOAN, "Score too low");
        require(amount > 0, "Amount must be positive");
        require(amount <= availableCredit(msg.sender), "Exceeds available credit");

        // In production, ETH or a stablecoin would be transferred here.
        // For this demo we only track state.
        totalBorrowed[msg.sender] += amount;

        emit LoanApproved(msg.sender, amount);
    }

    function repayLoan(uint256 amount) external {
        require(totalBorrowed[msg.sender] >= amount, "Repaying more than borrowed");
        require(amount > 0, "Amount must be positive");

        totalBorrowed[msg.sender] -= amount;

        emit LoanRepaid(msg.sender, amount);
    }
}