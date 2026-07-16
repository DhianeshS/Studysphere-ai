import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Moon, Monitor, Sun, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Settings = () => {
  const { user, userProfile, signOut } = useAuth();
  
  // Local state for settings form
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [bio, setBio] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
    
    // Load data from AuthContext
    if (userProfile) {
      setName(userProfile.display_name || '');
      setCollege(userProfile.college || '');
      setDepartment(userProfile.department || '');
      setSemester(userProfile.semester || '');
      setBio(userProfile.bio || '');
    } else if (user) {
      setName(user.user_metadata?.full_name || '');
    }
  }, [userProfile, user]);

  const toggleDarkMode = (enable: boolean) => {
    setIsDarkMode(enable);
    if (enable) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          display_name: name,
          college,
          department,
          semester,
          bio,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      // Update auth metadata if name changed
      await supabase.auth.updateUser({ data: { full_name: name } });
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile. Ensure Supabase is configured.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
       alert("Account deletion requires server-side admin privileges or Edge Function. Setup required.");
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>
        <button 
          onClick={signOut}
          className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" /> Profile Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random`} alt="Profile" className="w-16 h-16 rounded-full border bg-muted" />
            <button className="px-3 py-1.5 border rounded-md text-sm font-medium hover:bg-muted transition-colors">Change Avatar</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                value={user.email || ''} 
                disabled 
                className="w-full px-3 py-2 border rounded-md bg-muted/50 text-muted-foreground cursor-not-allowed" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">College / University</label>
              <input 
                type="text" 
                value={college} 
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Stanford University"
                className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <input 
                type="text" 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a little about your learning goals..."
                className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none" 
                rows={3}
              />
            </div>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 mt-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isSaved ? "Saved Successfully!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" /> Appearance
        </h2>
        <div className="flex gap-4">
          <button 
            onClick={() => toggleDarkMode(false)}
            className={`flex-1 p-4 border rounded-xl flex flex-col items-center gap-2 transition-colors ${!isDarkMode ? 'border-primary bg-primary/5 text-primary' : 'hover:border-primary/50 text-muted-foreground'}`}
          >
            <Sun className="w-6 h-6" />
            <span className="text-sm font-medium">Light Mode</span>
          </button>
          <button 
            onClick={() => toggleDarkMode(true)}
            className={`flex-1 p-4 border rounded-xl flex flex-col items-center gap-2 transition-colors ${isDarkMode ? 'border-primary bg-primary/5 text-primary' : 'hover:border-primary/50 text-muted-foreground'}`}
          >
            <Moon className="w-6 h-6" />
            <span className="text-sm font-medium">Dark Mode</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-6 border-red-200/50">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-500">
          <Shield className="w-5 h-5" /> Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data.</p>
        <button 
          onClick={handleDeleteAccount}
          className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-[var(--radius-md)] text-sm font-medium transition-colors dark:bg-red-950/30 dark:hover:bg-red-900/50"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
