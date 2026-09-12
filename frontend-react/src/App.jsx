import { usePassport } from "./usePassport";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Education from "./components/Education";
import Healthcare from "./components/Healthcare";
import Finance from "./components/Finance";
import LogPanel from "./components/LogPanel";
import "./App.css";

export default function App() {
  const {
    state,
    logs,
    status,
    register,
    issueCertificate,
    attestHealth,
    requestLoan,
    repayLoan,
  } = usePassport();

  const isRegistered = state.registered;

  return (
    <div className="container">
      <h1>🌍 Impact Passport</h1>
      <p className="subtitle">Education. Health. Finance. One identity.</p>

      <div className={`status ${status.kind}`}>{status.text}</div>

      {!isRegistered && <Register onRegister={register} />}

      {isRegistered && (
        <>
          <Profile
            profile={state.profile}
            eduPoints={state.eduPoints}
            healthPoints={state.healthPoints}
            creditScore={state.creditScore}
          />

          <Education
            certificates={state.certificates}
            onIssue={issueCertificate}
          />

          <Healthcare
            attestations={state.attestations}
            onAttest={attestHealth}
          />

          <Finance
            loanLimit={state.loanLimit}
            borrowed={state.borrowed}
            available={state.available}
            onRequest={requestLoan}
            onRepay={repayLoan}
          />
        </>
      )}

      <LogPanel logs={logs} />
    </div>
  );
}
