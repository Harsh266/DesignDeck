import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import api from './api'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Contactus from './pages/Contactus'
import Landingpage from './pages/Landingpage';
import Dashboard from './pages/Dashboard';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/logout" element={<Landingpage />} />
        {/* Default route redirects to Sign In */}
        <Route path="*" element={<Landingpage />} />
      </Routes>
    </Router>
  )
}

export default App
