import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, ArrowRight, Loader2, Mail, Lock, Eye, EyeOff, Bot, FileText, CheckSquare, Calendar, Cloud, BarChart3, ShieldCheck, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Removed auto-redirect on mount so the user can see the new login page design
  // even if they are technically "logged in" by the mock AuthContext.
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Bypass actual authentication so any random email/password succeeds
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    // Mock github login
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-1 flex w-full">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#c7d2fe] p-12 flex-col justify-center">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">StudySphere <span className="text-blue-600">AI</span></h2>
                <p className="text-sm text-slate-600">Your AI Study Companion</p>
              </div>
            </div>

            <h1 className="text-5xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Learn Smarter.<br/>
              <span className="text-blue-600">Achieve More.</span>
            </h1>

            <p className="text-lg text-slate-700 mb-10 max-w-lg leading-relaxed">
              Your AI-powered study companion that helps you understand concepts, summarize notes, answer academic questions, generate quizzes, create flashcards, and plan your learning—all in one place.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Bot className="w-5 h-5 text-blue-600" />, text: "AI-powered study assistance" },
                { icon: <FileText className="w-5 h-5 text-blue-400" />, text: "Upload PDFs & get instant summaries" },
                { icon: <CheckSquare className="w-5 h-5 text-green-500" />, text: "Generate quizzes & flashcards" },
                { icon: <Calendar className="w-5 h-5 text-indigo-500" />, text: "Personalized study planner" },
                { icon: <Cloud className="w-5 h-5 text-sky-500" />, text: "Secure cloud storage" },
                { icon: <BarChart3 className="w-5 h-5 text-orange-500" />, text: "Track your learning progress" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/70 backdrop-blur-md px-4 py-3 rounded-2xl w-max shadow-sm border border-white/80 transition-transform hover:-translate-y-0.5">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    {feature.icon}
                  </div>
                  <span className="text-slate-800 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-6 md:p-12 relative z-10 bg-[#f8fafc]">
          <div className="w-full max-w-[460px] bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60">
            <div className="text-center mb-8">
              <h2 className="text-[28px] font-bold text-slate-900 mb-2">Welcome Back!</h2>
              <p className="text-slate-500 font-medium">Continue your learning journey.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                    placeholder="Enter your password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 pb-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="w-[18px] h-[18px] rounded border-2 border-slate-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center group-hover:border-blue-500">
                      <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Remember Me</span>
                </label>
                <button type="button" onClick={() => alert("Password reset coming soon!")} className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none mt-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-400 font-medium">or continue with</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
              <button 
                onClick={handleGithubLogin}
                className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="mt-8 text-center text-[15px]">
              <span className="text-slate-500 font-medium">Don't have an account? </span>
              <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Create Account</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-[#f8fafc] py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] font-semibold text-slate-500">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 hover:text-slate-800 transition-colors"><ShieldCheck className="w-4 h-4" /> Privacy Policy</a>
          <a href="#" className="flex items-center gap-2 hover:text-slate-800 transition-colors"><FileText className="w-4 h-4" /> Terms of Service</a>
          <a href="#" className="flex items-center gap-2 hover:text-slate-800 transition-colors"><HelpCircle className="w-4 h-4" /> Help Center</a>
        </div>
        <div>
          © 2026 StudySphere AI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;

