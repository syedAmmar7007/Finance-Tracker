import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/sign-up";
import Login from "./component/login";
import "./App.css";
import { TrackerProvider } from "./store/tracker-store";
import Dashboard from "./component/dashboard";

function App() {
  return (
    <TrackerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </TrackerProvider>
  );
}

export default App;
