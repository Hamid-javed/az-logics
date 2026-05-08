import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { LoginWithNeuroNus } from "./components/LoginWithNeuroNus";
import { useAuth } from "./AuthContext";

const AppContent = () => {
  const { isAuthenticated, loading, isUnlocking, isLocked } = useAuth();

  return (
    <>
      <AppRoutes /> {(!isAuthenticated || isLocked) && <LoginWithNeuroNus />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
