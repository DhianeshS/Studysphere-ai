import React, { useState, useEffect } from 'react';
import { Target, Clock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const Quizzes = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizzes() {
      if (!user) return;
      try {
        setLoading(true);
        // Supabase schema for quizzes needs to be created, this is a placeholder fetch
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error && error.code !== '42P01') throw error;
        
        if (data) {
          setQuizzes(data);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, [user]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quizzes</h1>
          <p className="text-muted-foreground mt-1">Test your knowledge with AI-generated quizzes.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors">
          Generate New Quiz
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
           <div className="flex justify-center p-12">
             <Loader2 className="w-8 h-8 animate-spin text-primary" />
           </div>
        ) : quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center h-[50vh]">
            <Target className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-lg font-semibold">No quizzes created yet.</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">Generate your first quiz from your uploaded documents to test your knowledge.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="glass-card p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded-full">{quiz.difficulty}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {quiz.questions?.length || 0} Questions</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 mins</span>
                </div>
                <button className="mt-auto w-full flex items-center justify-center gap-2 border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary py-2.5 rounded-[var(--radius-md)] font-medium transition-colors">
                  Start Quiz <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
