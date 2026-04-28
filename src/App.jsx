import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentPortal from './pages/StudentPortal';
import MyOrders from './pages/MyOrders';
import DonationPortal from './pages/DonationPortal';
import NearbyNgos from './pages/NearbyNgos';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';

// Authentication Context
const AuthContext = createContext();
const AUTH_STORAGE_KEY = 'food-auth-session';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedSession) {
        const parsedSession = JSON.parse(savedSession);
        if (parsedSession?.isAuthenticated && parsedSession?.user) {
          setIsAuthenticated(true);
          setUser(parsedSession.user);
        }
      }
    } catch (error) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const login = (userPayload) => {
    const sessionPayload = { isAuthenticated: true, user: userPayload };
    setIsAuthenticated(true);
    setUser(userPayload);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      authMessage,
      setAuthMessage,
      login,
      logout,
    }),
    [isAuthenticated, user, authMessage]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const RequireAuth = ({ children }) => {
  const { isAuthenticated, setAuthMessage } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthMessage('Please log in or sign up to continue.');
    }
  }, [isAuthenticated, setAuthMessage]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

const PublicAuthOnly = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/student-portal" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicAuthOnly>
                    <Login />
                  </PublicAuthOnly>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicAuthOnly>
                    <Signup />
                  </PublicAuthOnly>
                }
              />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/student-portal"
                element={
                  <RequireAuth>
                    <StudentPortal />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={<Navigate to="/student-portal" replace />}
              />
              <Route
                path="/orders"
                element={
                  <RequireAuth>
                    <MyOrders />
                  </RequireAuth>
                }
              />
              <Route
                path="/donations"
                element={
                  <RequireAuth>
                    <DonationPortal />
                  </RequireAuth>
                }
              />
              <Route
                path="/nearby-ngos"
                element={
                  <RequireAuth>
                    <NearbyNgos />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/about"
                element={
                  <RequireAuth>
                    <About />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
export { AuthContext };
