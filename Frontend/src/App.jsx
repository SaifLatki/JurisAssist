import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ==============================
// PUBLIC PAGES
// ==============================

import Home from "./pages/Home";
import About from "./pages/About";
import Operations from "./pages/Operations";
import Demo from "./pages/Demo";
import Lawyers from "./pages/Lawyers";
import Disclaimer from "./pages/Disclaimer";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// ==============================
// CLIENT PAGES
// ==============================

import ClientDashboard from "./pages/client/ClientDashboard";
import ClientDocuments from "./pages/client/ClientDocuments";
import ClientMessages from "./pages/client/ClientMessages";
import ClientProfile from "./pages/client/ClientProfile";
import ClientAIChat from "./pages/client/ClientAIChat";
import ClientLawyers from "./pages/client/ClientLawyers";
import ClientAppointments from "./pages/client/ClientAppointments";

// ==============================
// ADVOCATE PAGES
// ==============================

import AdvocateDashboard from "./pages/advocate/AdvocateDashboard";
import AdvocateMessages from "./pages/advocate/AdvocateMessages";
import AdvocateProfile from "./pages/advocate/AdvocateProfile";
import AdvocateRequests from "./pages/advocate/AdvocateRequests";
import AdvocateClients from "./pages/advocate/AdvocateClients";
import AdvocateDocuments from "./pages/advocate/AdvocateDocuments";
import AdvocateAppointments from "./pages/advocate/AdvocateAppointments";

// ==============================
// AUTH
// ==============================

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/operations" element={<Operations />} />

      <Route path="/demo" element={<Demo />} />

      <Route path="/lawyers" element={<Lawyers />} />

      <Route path="/disclaimer" element={<Disclaimer />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />


      {/* =====================================================
          CLIENT ROUTES
      ===================================================== */}

      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute role="client">
            <ClientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/documents"
        element={
          <ProtectedRoute role="client">
            <ClientDocuments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/ai-chat"
        element={
          <ProtectedRoute role="client">
            <ClientAIChat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/lawyers"
        element={
          <ProtectedRoute role="client">
            <ClientLawyers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/messages"
        element={
          <ProtectedRoute role="client">
            <ClientMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/appointments"
        element={
          <ProtectedRoute role="client">
            <ClientAppointments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/profile"
        element={
          <ProtectedRoute role="client">
            <ClientProfile />
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          ADVOCATE ROUTES
      ===================================================== */}

      <Route
        path="/advocate/dashboard"
        element={
          <ProtectedRoute role="advocate">
            <AdvocateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/advocate/requests"
        element={
          <ProtectedRoute role="advocate">
            <AdvocateRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/advocate/clients"
        element={
          <ProtectedRoute role="advocate">
            <AdvocateClients />
          </ProtectedRoute>
        }
      />

      <Route
        path="/advocate/messages"
        element={
          <ProtectedRoute role="advocate">
            <AdvocateMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/advocate/appointments"
        element={
          <ProtectedRoute role="advocate">
            <AdvocateAppointments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/advocate/documents"
        element={
          <ProtectedRoute role="advocate">
            <AdvocateDocuments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/advocate/profile"
        element={
          <ProtectedRoute role="advocate">
            <AdvocateProfile />
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}