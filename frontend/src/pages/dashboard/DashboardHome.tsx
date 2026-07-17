import React, { useEffect, useState } from 'react';
import { 
  Flame, 
  Clock, 
  Calendar, 
  FileText, 
  Target, 
  TrendingUp,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
  const { user, userProfile } = useAuth();
  
  const [documents, setDocuments] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return;
      
      try {
        // Fetch recent documents
        const { data: docsData, error: docsError } = await supabase
          .from('documents')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
          
        if (!docsError && docsData) setDocuments(docsData);

        // Fetch upcoming tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('study_tasks')
          .select('*')
          .eq('is_completed', false)
          .order('scheduled_for', { ascending: true })
          .limit(3);
          
        if (!tasksError && tasksData) setTasks(tasksData);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  const displayName = userProfile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {displayName}! 👋</h1>
          <p className="text-muted-foreground mt-1">Here is an overview of your learning progress.</p>
        </div>
        <Link 
          to="/dashboard/documents"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Upload Notes
        </Link>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WidgetCard 
          to="/dashboard/analytics"
          title="Study Streak" 
          value="3 Days"
          subtitle="Keep it up!" 
          icon={<Flame className="w-5 h-5 text-orange-500" />}
          trend="+1 from last week"
        />
        <WidgetCard 
          to="/dashboard/analytics"
          title="Hours Studied" 
          value="12.5h"
          subtitle="This week" 
          icon={<Clock className="w-5 h-5 text-blue-500" />}
          trend="Top 10% of users"
        />
        <WidgetCard 
          to="/dashboard/analytics"
          title="Quiz Accuracy" 
          value="84%"
          subtitle="Average score" 
          icon={<Target className="w-5 h-5 text-green-500" />}
          trend="+4% improvement"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 glass-card p-6 min-h-[300px] flex flex-col">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Learning Activity
          </h2>
          <div className="flex-1 w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Mon', hours: 2.5 },
                { name: 'Tue', hours: 3.8 },
                { name: 'Wed', hours: 1.5 },
                { name: 'Thu', hours: 4.2 },
                { name: 'Fri', hours: 2.0 },
                { name: 'Sat', hours: 5.5 },
                { name: 'Sun', hours: 4.0 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888830" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
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

        {/* Upcoming Tasks */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Upcoming Tasks
            </h2>
            <Link to="/dashboard/planner" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div></div>
          ) : tasks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <Calendar className="w-8 h-8 text-muted-foreground opacity-30 mb-2" />
              <p className="text-sm text-muted-foreground">No upcoming tasks scheduled.</p>
            </div>
          ) : (
            <div className="flex-1 space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-background border hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(task.scheduled_for).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Recent Documents
          </h2>
          <Link to="/dashboard/documents" className="text-sm text-primary hover:underline flex items-center gap-1">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12"><div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div></div>
        ) : documents.length === 0 ? (
           <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-xl">
             <FileText className="w-10 h-10 text-muted-foreground opacity-30 mb-3" />
             <p className="font-medium">No documents uploaded.</p>
             <p className="text-sm text-muted-foreground mb-4">Start by uploading your first PDF.</p>
             <Link to="/dashboard/documents" className="bg-primary/10 text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/20 transition-colors">
               Go to Documents
             </Link>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-background border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium truncate">{doc.title}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                  <span>{(doc.size_bytes / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const WidgetCard = ({ title, value, subtitle, icon, trend, to }: any) => {
  const CardContent = (
    <div className={`glass-card p-6 flex items-start justify-between ${to ? 'hover:border-primary/50 hover:shadow-md cursor-pointer transition-all' : ''}`}>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        {trend && (
          <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-3 bg-green-500/10 inline-block px-2 py-1 rounded-full">
            {trend}
          </p>
        )}
      </div>
      <div className="p-3 bg-background rounded-xl border shadow-sm">
        {icon}
      </div>
    </div>
  );

  return to ? <Link to={to} className="block">{CardContent}</Link> : CardContent;
};

export default DashboardHome;
