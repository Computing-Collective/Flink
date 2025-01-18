import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import Login from "@/pages/Login";
import Generate from "@/pages/Generate";
import AuthRoute from "@/components/AuthRoute";

function App() {
  const isAuthenticated = true; // TODO add auth

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
