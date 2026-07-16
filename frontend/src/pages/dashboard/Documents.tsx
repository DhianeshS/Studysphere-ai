import React, { useState, useCallback, useEffect } from 'react';
import { 
  UploadCloud, 
  Search, 
  FileText, 
  MoreVertical, 
  Star, 
  Trash2, 
  Filter,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const Documents = () => {
  const { user } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Future: Upload to Supabase Storage
      alert("File upload to Supabase Storage will be implemented here.");
    }
  }, []);
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
       alert("File upload to Supabase Storage will be implemented here.");
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Documents</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your study materials.</p>
        </div>
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer relative ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-slate-800 bg-muted/30 hover:bg-muted/50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          multiple 
          accept=".pdf,.docx,.txt,.ppt" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
        />
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Upload Study Materials</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Drag and drop your files here, or click to browse.<br />
          Supports PDF, DOCX, TXT, and PPT up to 50MB.
        </p>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors pointer-events-none">
          Select Files
        </button>
      </div>

      <div className="flex-1 glass-card p-6 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading documents...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-lg font-semibold">No documents uploaded.</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">Start by uploading your first PDF using the upload zone above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-2">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-background border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group relative">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className={`p-1.5 rounded-md hover:bg-muted ${doc.is_favorite ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                      <Star className="w-4 h-4" fill={doc.is_favorite ? "currentColor" : "none"} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-medium truncate mb-1" title={doc.title}>{doc.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
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

export default Documents;
