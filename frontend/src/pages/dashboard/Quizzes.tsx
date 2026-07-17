import React, { useState, useEffect } from 'react';
import { Target, Clock, ArrowRight, CheckCircle2, Loader2, ChevronLeft, Check, X, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import MOCK_QUIZZES from '../../data/mockQuizzes.json';

const Quizzes = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Quiz Engine State
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

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
        
        if (data && data.length > 0) {
          setQuizzes(data);
        } else {
          setQuizzes(MOCK_QUIZZES);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, [user]);

  const handleStartQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleSelectAnswer = (optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    setActiveQuiz(null);
  };

  if (activeQuiz) {
    if (showResults) {
      let score = 0;
      activeQuiz.questions.forEach((q: any, idx: number) => {
        if (selectedAnswers[idx] === q.answer) score++;
      });
      const percentage = Math.round((score / activeQuiz.questions.length) * 100);

      return (
        <div className="space-y-6 h-full flex flex-col items-center justify-center">
          <div className="glass-card p-10 flex flex-col items-center text-center max-w-lg w-full">
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-muted-foreground mb-8">You finished "{activeQuiz.title}"</p>
            
            <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-lg font-medium mb-8">{score} out of {activeQuiz.questions.length} correct</p>
            
            <button 
              onClick={handleFinish}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      );
    }

    const question = activeQuiz.questions[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== undefined;

    return (
      <div className="space-y-6 h-full flex flex-col max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <button onClick={handleFinish} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" /> Exit Quiz
          </button>
          <span className="text-sm font-medium">Question {currentQuestion + 1} of {activeQuiz.questions.length}</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${((currentQuestion) / activeQuiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="glass-card p-8 flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-8 leading-relaxed">{question.q}</h2>
          
          <div className="space-y-3 flex-1">
            {question.options.map((opt: string, idx: number) => {
              const isSelected = selectedAnswers[currentQuestion] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group
                    ${isSelected ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/50 hover:bg-muted hover:border-border'}
                  `}
                >
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                    ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'}
                  `}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === activeQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                <button 
                  onClick={() => handleStartQuiz(quiz)}
                  className="mt-auto w-full flex items-center justify-center gap-2 border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary py-2.5 rounded-[var(--radius-md)] font-medium transition-colors cursor-pointer"
                >
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
