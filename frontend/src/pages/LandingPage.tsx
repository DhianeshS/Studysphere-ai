import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, PlayCircle, Sparkles, UploadCloud, Target, LineChart, FileText } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">StudySphere AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Log in</Link>
          <Link to="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Your AI-Powered Study Assistant</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              Upload Notes. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Learn Smarter.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform your study materials into interactive quizzes, flashcards, and personalized AI tutoring sessions instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/register" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-[var(--radius-lg)] text-base font-medium shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto glass-card px-8 py-4 rounded-[var(--radius-lg)] text-base font-medium hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract UI representation */}
            <div className="glass-card p-6 md:p-8 relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Tutor</h3>
                  <p className="text-sm text-muted-foreground">Always ready to help</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-[var(--radius-md)]">
                  <p className="text-sm">Can you explain the concepts from page 12 of my Physics notes?</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-[var(--radius-md)] border border-primary/20">
                  <p className="text-sm">Based on your "Physics_Ch3.pdf" (Page 12), Newton's second law states that Force equals mass times acceleration (F=ma)...</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass-card p-4 rounded-[var(--radius-lg)] flex items-center gap-3 z-20"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Notes Uploaded</p>
                <p className="text-[10px] text-muted-foreground">PDF Processed</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 glass-card p-4 rounded-[var(--radius-lg)] flex items-center gap-3 z-20"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Quiz Generated</p>
                <p className="text-[10px] text-muted-foreground">15 Questions Ready</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/50 border-y">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to ace your exams</h2>
            <p className="text-muted-foreground text-lg">Powerful AI tools designed specifically for students to maximize learning efficiency.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="w-6 h-6" />}
              title="AI Chat & Summaries"
              description="Ask questions and get instant summaries directly based on your uploaded documents, complete with page citations."
            />
            <FeatureCard 
              icon={<BookOpen className="w-6 h-6" />}
              title="Smart Flashcards"
              description="Automatically generate flashcards from your notes using spaced repetition algorithms."
            />
            <FeatureCard 
              icon={<Target className="w-6 h-6" />}
              title="Quiz Generator"
              description="Test your knowledge with auto-generated MCQ, True/False, and fill-in-the-blank quizzes."
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6" />}
              title="Rich Notes"
              description="Organize your thoughts with our markdown-supported rich text editor and intelligent bookmarking."
            />
            <FeatureCard 
              icon={<LineChart className="w-6 h-6" />}
              title="Progress Analytics"
              description="Track your study hours, quiz scores, and learning insights visually with beautifully crafted charts."
            />
            <FeatureCard 
              icon={<UploadCloud className="w-6 h-6" />}
              title="Any Format"
              description="Seamlessly drag and drop PDFs, DOCX, TXT, and PPT files into your organized subject folders."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="font-bold">StudySphere AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 StudySphere AI. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default LandingPage;
