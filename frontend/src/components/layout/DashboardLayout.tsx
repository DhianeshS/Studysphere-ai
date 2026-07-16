import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  FileEdit, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'My Documents', path: '/dashboard/documents', icon: <FolderOpen className="w-5 h-5" /> },
    { name: 'AI Chat', path: '/dashboard/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Flashcards', path: '/dashboard/flashcards', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Quizzes', path: '/dashboard/quizzes', icon: <CheckSquare className="w-5 h-5" /> },
    { name: 'Notes', path: '/dashboard/notes', icon: <FileEdit className="w-5 h-5" /> },
    { name: 'Study Planner', path: '/dashboard/planner', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <Brain className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">StudySphere AI</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 glass border-b flex items-center justify-between px-4 sm:px-6 z-30 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:block">
              {/* Optional Breadcrumbs or Page Title could go here */}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <img 
                src={userProfile?.avatar_url || 'https://i.pravatar.cc/150'} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-border"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium leading-none">{userProfile?.display_name || user?.user_metadata?.full_name || 'User'}</p>
                <p className="text-xs text-muted-foreground mt-1">Student</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
