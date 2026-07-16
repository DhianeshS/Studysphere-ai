import React, { useState, useEffect } from 'react';
import { Edit3, Plus, Tag, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const Notes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('updated_at', { ascending: false });
          
        if (error && error.code !== '42P01') throw error;
        
        if (data) {
          setNotes(data);
          if (data.length > 0) {
            setActiveNoteId(data[0].id);
          }
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [user]);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleCreateNote = async () => {
    if (!user) return;
    const newNote = {
      user_id: user.id,
      title: 'Untitled Note',
      content: '',
      updated_at: new Date().toISOString()
    };
    const { data } = await supabase.from('notes').insert(newNote);
    if (data && data[0]) {
      setNotes([data[0], ...notes]);
      setActiveNoteId(data[0].id);
    }
  };

  const handleUpdateNote = async (field: 'title' | 'content', value: string) => {
    if (!activeNote) return;
    
    // Update local state instantly for snappy UI
    const updated = notes.map(n => 
      n.id === activeNoteId ? { ...n, [field]: value, updated_at: new Date().toISOString() } : n
    );
    setNotes(updated);
    
    // Send to Supabase mock
    await supabase.from('notes').update({ [field]: value, updated_at: new Date().toISOString() }).eq('id', activeNoteId);
  };

  const handleDeleteNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId('');
    }
    await supabase.from('notes').delete().eq('id', id);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Smart Notes</h1>
          <p className="text-muted-foreground mt-1">Rich text editor with markdown support.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCreateNote}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Notes List Sidebar */}
        <div className="hidden md:flex w-64 flex-col gap-4 border-r pr-6 overflow-y-auto">
          {loading ? (
             <div className="flex justify-center p-4">
               <Loader2 className="w-6 h-6 animate-spin text-primary" />
             </div>
          ) : notes.length === 0 ? (
            <div className="text-center text-muted-foreground p-4 text-sm">
              No notes found. Create one!
            </div>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id} 
                onClick={() => setActiveNoteId(note.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-colors group relative ${activeNoteId === note.id ? 'bg-primary/5 border-primary/30' : 'bg-background hover:bg-muted'}`}
              >
                <h4 className="font-medium text-sm truncate pr-6">{note.title || 'Untitled Note'}</h4>
                <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={(e) => handleDeleteNote(note.id, e)}
                  className="absolute top-3 right-3 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Editor */}
        {activeNote ? (
          <div className="flex-1 glass-card p-6 flex flex-col min-h-0">
            <div className="border-b pb-4 mb-4 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                value={activeNote.title}
                onChange={(e) => handleUpdateNote('title', e.target.value)}
                className="text-xl font-bold bg-transparent border-none focus:outline-none w-full"
                placeholder="Note Title"
              />
            </div>
            <textarea 
              className="flex-1 bg-transparent resize-none focus:outline-none w-full font-mono text-sm leading-relaxed"
              value={activeNote.content || ''}
              onChange={(e) => handleUpdateNote('content', e.target.value)}
              placeholder="Start typing your notes here in Markdown..."
            />
          </div>
        ) : (
          <div className="flex-1 glass-card p-6 flex flex-col items-center justify-center text-muted-foreground">
            <Edit3 className="w-12 h-12 mb-4 opacity-20" />
            <p>Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
