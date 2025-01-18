import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "@/pages/Login";
import Generate from "@/pages/Generate";
import AuthRoute from "@/components/AuthRoute";

function App() {
  const isAuthenticated = false;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/generate"
            element={
              <AuthRoute
                isAuthenticated={isAuthenticated}
                element={<Generate />}
              />
            }
          />
        </Routes>
      </Router>
      );
    </>
  );
}

export default App;
