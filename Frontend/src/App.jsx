import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Operations from './pages/Operations';
import Demo from './pages/Demo';
import Lawyers from './pages/Lawyers';
import Disclaimer from './pages/Disclaimer';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientDocuments from './pages/client/ClientDocuments';
import ClientCases from './pages/client/ClientCases';
import ClientAppointments from './pages/client/ClientAppointments';
import ClientMessages from './pages/client/ClientMessages';
import ClientProfile from './pages/client/ClientProfile';

// Advocate Pages
import AdvocateDashboard from './pages/advocate/AdvocateDashboard';
import AdvocateCases from './pages/advocate/AdvocateCases';
import AdvocateAppointments from './pages/advocate/AdvocateAppointments';
import AdvocateMessages from './pages/advocate/AdvocateMessages';
import AdvocateProfile from './pages/advocate/AdvocateProfile';


function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex flex-col">

      <Navbar />

      <main className="flex-1">
        <Routes>

          {/* ==================================================
              PUBLIC PAGES
          ================================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/demo"
            element={<Demo />}
          />

          <Route
            path="/lawyers"
            element={<Lawyers />}
          />

          <Route
            path="/disclaimer"
            element={<Disclaimer />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/operations"
            element={<Operations />}
          />

          {/* ==================================================
              AUTHENTICATION
          ================================================== */}

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />


          {/* ==================================================
              CLIENT INTERFACE
          ================================================== */}

          <Route
            path="/client/dashboard"
            element={<ClientDashboard />}
          />

          <Route
            path="/client/documents"
            element={<ClientDocuments />}
          />

          <Route
            path="/client/cases"
            element={<ClientCases />}
          />

          <Route
            path="/client/appointments"
            element={<ClientAppointments />}
          />

          <Route
            path="/client/messages"
            element={<ClientMessages />}
          />

          <Route
            path="/client/profile"
            element={<ClientProfile />}
          />


          {/* ==================================================
              ADVOCATE INTERFACE
          ================================================== */}

          <Route
            path="/advocate/dashboard"
            element={<AdvocateDashboard />}
          />

          <Route
            path="/advocate/cases"
            element={<AdvocateCases />}
          />

          <Route
            path="/advocate/appointments"
            element={<AdvocateAppointments />}
          />

          <Route
            path="/advocate/messages"
            element={<AdvocateMessages />}
          />

          <Route
            path="/advocate/profile"
            element={<AdvocateProfile />}
          />


          {/* ==================================================
              404 / UNKNOWN ROUTES
          ================================================== */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;