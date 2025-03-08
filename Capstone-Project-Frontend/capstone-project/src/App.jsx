import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Contactus from './pages/Contactus'
import Landingpage from './pages/Landingpage';
import Dashboard from './pages/Dashboard';
import Profilepage from './pages/Profilepage';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Sign In */}
        <Route path="*" element={<Landingpage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/profilepage" element={<Profilepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/logout" element={<Landingpage />} />
      </Routes>
    </Router>
  )
}
export default App;