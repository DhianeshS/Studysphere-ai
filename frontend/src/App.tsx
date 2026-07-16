import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Documents from './pages/dashboard/Documents';
import AIChat from './pages/dashboard/AIChat';
import Flashcards from './pages/dashboard/Flashcards';
import Quizzes from './pages/dashboard/Quizzes';
import Notes from './pages/dashboard/Notes';
import Planner from './pages/dashboard/Planner';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="documents" element={<Documents />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="notes" element={<Notes />} />
          <Route path="planner" element={<Planner />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div className="p-8 text-center text-muted-foreground">This module is under construction.</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
