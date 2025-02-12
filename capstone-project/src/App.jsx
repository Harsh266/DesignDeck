import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import api from './api'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Contactus from './pages/Contactus'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* Default route redirects to Sign In */}
        <Route path="*" element={<Signin />} />
      </Routes>
    </Router>
  )
}

export default App
