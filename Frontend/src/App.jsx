import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Operations from './pages/Operations';
import Demo from './pages/Demo';
import Lawyers from './pages/Lawyers';
import Disclaimer from './pages/Disclaimer';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D1117] text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />}end />
            <Route path="/demo" element={<Demo />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/about" element={<About />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
