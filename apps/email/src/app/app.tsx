import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * The main app component that wraps the entire app in an
 * {@link AuthProvider} and sets up public and protected routes.
 *
 * The public route is just the login page, accessible at `/login`.
 *
 * The protected route is guarded by the {@link ProtectedRoute} component,
 * which redirects to `/login` if the user is not authenticated. The protected
 * route is the root route and has two child routes: `/dashboard` and `/settings`.
 *
 * @returns A JSX element that renders the app.
 */
const App = (): React.ReactElement => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
