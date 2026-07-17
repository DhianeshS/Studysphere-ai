import React from 'react';
import { BarChart3, TrendingUp, Award, Clock, Target, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const studyData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.2 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 4.0 },
];

const subjectProficiency = [
  { subject: 'Data Struct', score: 85 },
  { subject: 'Algorithms', score: 72 },
  { subject: 'Database', score: 90 },
  { subject: 'Networking', score: 65 },
  { subject: 'Operating Sys', score: 78 },
];

const Analytics = () => {
  return (
    <div className="space-y-6 h-full flex flex-col pb-8 overflow-y-auto pr-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Detailed breakdown of your learning patterns and statistics.</p>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="glass-card p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-default">
          <Clock className="w-8 h-8 mb-3 text-blue-500" />
          <p className="text-3xl font-bold">23.5h</p>
          <p className="text-sm text-muted-foreground">Total Study Time</p>
        </div>
        <div className="glass-card p-5 flex flex-col items-center justify-center text-center hover:border-orange-500/50 transition-colors cursor-default">
          <TrendingUp className="w-8 h-8 mb-3 text-orange-500" />
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-muted-foreground">Current Streak (Days)</p>
        </div>
        <div className="glass-card p-5 flex flex-col items-center justify-center text-center hover:border-green-500/50 transition-colors cursor-default">
          <Target className="w-8 h-8 mb-3 text-green-500" />
          <p className="text-3xl font-bold">84%</p>
          <p className="text-sm text-muted-foreground">Average Quiz Score</p>
        </div>
        <div className="glass-card p-5 flex flex-col items-center justify-center text-center hover:border-purple-500/50 transition-colors cursor-default">
          <Award className="w-8 h-8 mb-3 text-purple-500" />
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-muted-foreground">Topics Mastered</p>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Weekly Study Trend */}
        <div className="glass-card p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Weekly Study Trend
          </h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888830" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#88888830', strokeWidth: 2 }}
                />
                <Line type="monotone" dataKey="hours" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Proficiency */}
        <div className="glass-card p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            Subject Proficiency
          </h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectProficiency} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#88888830" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888', fontWeight: 500 }} width={90} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#88888810' }}
                />
                <Bar dataKey="score" fill="var(--color-secondary)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
