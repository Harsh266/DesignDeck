import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Contactus from "./pages/Contactus";
import Landingpage from "./pages/Landingpage";
import Dashboard from "./pages/Dashboard";
import Profilepage from "./pages/Profilepage";
import Profilepageothers from "./pages/Profilepageothers";
import Projectview from "./pages/Projectview";
import Uploadprojectpage from "./pages/Uploadprojectpage";
import { useState, useEffect } from "react";
import { getMessage } from "./services/api";
import "./App.css";
import "./index.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then((res) => setMessage(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <GoogleOAuthProvider clientId="924609528520-c0ge88n8hh7lsgaqei01ro17d75jqk19.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/profilepage" element={<Profilepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/logout" element={<Landingpage />} />
          <Route path="/view" element={<Projectview />} />
          <Route path="/upload" element={<Uploadprojectpage />} />
          <Route path="/otheruser" element={<Profilepageothers />} />
          <Route path="*" element={<Landingpage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
