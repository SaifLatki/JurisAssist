import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, role }) {

    const {
        user,
        loading
    } = useAuth();


    if (loading) {
        return <div>Loading...</div>;
    }


    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (role && user.role !== role) {

        if (user.role === 'client') {
            return <Navigate to="/client/dashboard" replace />;
        }

        if (user.role === 'advocate') {
            return <Navigate to="/advocate/dashboard" replace />;
        }

        return <Navigate to="/" replace />;
    }


    return children;
}

export default ProtectedRoute;