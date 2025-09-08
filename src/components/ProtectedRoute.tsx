import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../lib/api';

const isAuthed = () => !!(localStorage.getItem('token') || sessionStorage.getItem('token'));

const ProtectedRoute: React.FC = () => {
  const [checking, setChecking] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthed()) {
      setChecking(false);
      return;
    }
    // Check admin onboarding status and redirect if not complete
    api
      .get('api/accounts/admin-onboarding-status/')
      .then((res) => {
        const next = res?.data?.data?.next_step;
        if (next && next !== 'done' && window.location.pathname !== '/onboarding/profile') {
          setRedirect('/onboarding/profile');
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  if (!isAuthed()) return <Navigate to="/sign-in" replace />;
  if (checking) return null; // avoid flicker
  if (redirect) return <Navigate to={redirect} replace />;
  return <Outlet />;
};

export default ProtectedRoute;

