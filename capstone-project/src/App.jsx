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

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessage().then((data) => setMessage(data));
  }, []);

  return (
    <GoogleOAuthProvider clientId="96391696642-kfp82uqmp7gh0msk03igtntnletv3u7q.apps.googleusercontent.com">
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
      <div>
        <h1>React + Node + MongoDB</h1>
        <p>{message}</p>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
