import React from 'react';
import { BarChart3, TrendingUp, Award, Clock, Target } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Analytics = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your learning progress and statistics.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Not enough data yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Your analytics dashboard will populate automatically as you upload documents, take quizzes, and interact with the AI tutor.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl opacity-50 pointer-events-none">
          <div className="glass-card p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">0h</p>
            <p className="text-xs text-muted-foreground">Study Time</p>
          </div>
          <div className="glass-card p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Streak Days</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">0%</p>
            <p className="text-xs text-muted-foreground">Quiz Avg</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Topics Mastered</p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Analytics;
