import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckSquare, Clock, Plus, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

type Task = {
  id: string;
  scheduled_for: string;
  task: string;
  duration: string;
  is_completed: boolean;
};

const Planner = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('study_tasks')
          .select('*')
          .order('scheduled_for', { ascending: true });
          
        if (error && error.code !== '42P01') throw error;
        
        if (data) {
          setTasks(data);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [user]);

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    // Update local state instantly for snappy UI
    setTasks(tasks.map(t => t.id === id ? { ...t, is_completed: !t.is_completed } : t));
    
    // Send to Supabase (our mock will catch this)
    await supabase.from('study_tasks').update({ is_completed: !task.is_completed }).eq('id', id);
  };

  const deleteTask = async (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    await supabase.from('study_tasks').delete().eq('id', id);
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim() || !user) return;
    
    const newTask = {
       user_id: user.id,
       task: newTaskText,
       scheduled_for: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
       is_completed: false
    };
    
    setNewTaskText('');
    
    const { data } = await supabase.from('study_tasks').insert(newTask);
    if (data && data[0]) {
       setTasks([...tasks, data[0]]);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Study Planner</h1>
          <p className="text-muted-foreground mt-1">Organize your schedule and tasks.</p>
        </div>
      </div>

      <div className="flex-1 glass-card p-6 overflow-auto">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
        </div>
        
        <form onSubmit={addTask} className="mb-6 flex gap-2">
          <input 
            type="text" 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What do you need to study?" 
            className="flex-1 px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button 
            type="submit"
            disabled={!newTaskText.trim()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        <div className="space-y-3">
          {loading ? (
             <div className="flex justify-center p-8">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : tasks.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No tasks scheduled. Add one above!
            </div>
          ) : (
            tasks.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-start gap-4 p-4 rounded-xl border transition-colors group ${item.is_completed ? 'bg-muted/50 border-transparent' : 'bg-background hover:border-primary/30'}`}
              >
                <button onClick={() => toggleTask(item.id)} className="mt-1 transition-transform active:scale-95">
                  <CheckSquare className={`w-5 h-5 ${item.is_completed ? 'text-green-500' : 'text-muted-foreground hover:text-primary'}`} />
                </button>
                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${item.is_completed ? 'line-through text-muted-foreground' : ''}`}>{item.task}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(item.scheduled_for).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {item.duration && <span className="bg-muted px-2 py-0.5 rounded-full">{item.duration}</span>}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTask(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Planner;
