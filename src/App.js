import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CustomNavbar from './components/CustomNavbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

   // Funzione per gestire il logout
   const handleLogout = () => {
    console.log('Logout initiated'); // Per debugging
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Se hai salvato l'autenticazione nel localStorage
  };

  return (
    <Router basename="/farmmetrics">
      <Routes>
        {/* Login page */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />

        {/* Protected routes */}
        {isAuthenticated && (
          <>
            <Route 
              path="/home" 
              element={
                <>
                  <CustomNavbar onLogout={handleLogout} />
                  <Home />
                </>
              } 
            />
      
          </>
        )}
        
        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
