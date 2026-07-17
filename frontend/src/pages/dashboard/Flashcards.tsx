import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, MoreVertical, Brain, RotateCw, Check, X, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const Flashcards = () => {
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [deck, setDeck] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlashcards() {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('flashcards')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error && error.code !== '42P01') throw error;
        
        if (data) {
          setDeck(data);
        }
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFlashcards();
  }, [user]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % deck.length);
    }, 150);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + deck.length) % deck.length);
    }, 150);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Smart Flashcards</h1>
          <p className="text-muted-foreground mt-1">Review AI-generated flashcards using spaced repetition.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors inline-flex items-center gap-2">
            <RotateCw className="w-4 h-4" />
            Review Weak Cards
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Deck
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your flashcards...</p>
          </div>
        ) : deck.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12">
            <BookOpen className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-lg font-semibold">No flashcards created yet.</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">Use the AI Chat to generate flashcards from your documents, or create a new deck manually.</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6 px-4">
              <span className="text-sm font-medium text-muted-foreground">
                Card {currentCardIndex + 1} of {deck.length}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D Card Container */}
            <div className="perspective-1000 w-full aspect-[3/2] sm:aspect-[2/1] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
              <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Front */}
                <div className="absolute inset-0 backface-hidden glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center border-t border-l border-white/40 dark:border-slate-700/50 shadow-xl bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30">
                  <span className="absolute top-6 left-6 text-xs font-bold tracking-widest text-primary uppercase">Question</span>
                  <h2 className="text-2xl sm:text-3xl font-medium leading-relaxed">{deck[currentCardIndex].front}</h2>
                  <div className="absolute bottom-6 text-sm text-muted-foreground flex items-center gap-2">
                    <RotateCw className="w-4 h-4" /> Click to flip
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center border-t border-l border-white/40 dark:border-slate-700/50 shadow-xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-transparent">
                  <span className="absolute top-6 left-6 text-xs font-bold tracking-widest text-primary uppercase">Answer</span>
                  <h2 className="text-2xl sm:text-3xl font-medium leading-relaxed">{deck[currentCardIndex].back}</h2>
                  <div className="absolute bottom-6 flex gap-2 w-full px-8 justify-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="flex-1 py-2 rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      Again
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="flex-1 py-2 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      Hard
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="flex-1 py-2 rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Good
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8 px-4">
              <button 
                onClick={handlePrevious}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                Previous
              </button>
              <button 
                onClick={handleNext}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
