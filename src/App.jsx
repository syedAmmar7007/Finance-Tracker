import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/sign-up";
import Login from "./component/login";
import "./App.css";
import { TrackerProvider } from "./store/tracker-store";
import Dashboard from "./component/dashboard";
import PrivateRoute from "./component/private-routes";

function App() {
  return (
    <TrackerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </TrackerProvider>
  );
}

export default App;
