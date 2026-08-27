import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // Wait until authentication is restored from localStorage
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-[#00C2FF] text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User has the wrong role
  if (role && user.role !== role) {
    if (user.role === 'client') {
      return <Navigate to="/client/dashboard" replace />;
    }

    if (user.role === 'advocate') {
      return <Navigate to="/advocate/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  // User is authenticated and has the correct role
  return children;
}

export default ProtectedRoute;