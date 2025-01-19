import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import Generate from "@/pages/Generate";
import AuthRoute from "@/components/AuthRoute";
import { History } from "@/pages/History";
import { Toaster } from "@/components/ui/toaster";
import Redirect from "@/pages/Redirect";

export const API_URL = "http://localhost:8000";

function App() {
  const isAuthenticated = localStorage.getItem("userId") !== null;

  return (
    <div className="text-center p-4 min-h-screen min-w-[100vw]">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthRoute
                isAuthenticated={isAuthenticated}
                element={<Generate />}
              />
            }
          />
          <Route
            path="/history"
            element={
              <AuthRoute
                isAuthenticated={isAuthenticated}
                element={<History />}
              />
            }
          />
          <Route path="/link/:code" element={<Redirect />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
