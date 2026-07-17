import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, User, Paperclip, FileText, Bot, Copy, Check, Plus, MessageSquare, Trash2, Edit3, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { qaPairs } from '../../data/qa_pairs';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: { documentName: string; page: number };
};

type ChatSession = {
  id: string;
  title: string;
  created_at: string;
};

const AIChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState<'study' | 'general'>('study');
  
  // History Sidebar State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch Chat History
  useEffect(() => {
    async function fetchSessions() {
      if (!user) return;
      try {
        setLoadingSessions(true);
        // Mock empty sessions for the local version
        setSessions([
          { id: '1', title: 'Study session #1', created_at: new Date().toISOString() }
        ]);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoadingSessions(false);
      }
    }
    
    fetchSessions();
  }, [user]);

  // Fetch Messages for active session
  useEffect(() => {
    async function fetchMessages() {
      if (!activeSessionId) {
        setMessages([]);
        return;
      }
      try {
        // Mock fetch implementation since schema doesn't have messages yet
        setMessages([]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();
  }, [activeSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI logic engine
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let aiResponse = "I'm a local AI assistant right now! I couldn't find an exact match for your question in my pre-loaded knowledge base. Please try asking one of the provided questions.";
      
      // Try to find a match in the qaPairs
      const match = qaPairs.find(qa => qa.question.toLowerCase().includes(lowerInput) || lowerInput.includes(qa.question.toLowerCase()));
      
      if (match) {
        aiResponse = match.answer;
      } else {
        // Fallback exact match or fuzzy match logic if needed, but since we are looking for includes, it's decent.
        // Let's also do a simple word match if the full phrase is not found
        const words = lowerInput.split(' ').filter(w => w.length > 3);
        let bestMatch = null;
        let bestScore = 0;
        
        for (const qa of qaPairs) {
          const qLower = qa.question.toLowerCase();
          let score = 0;
          for (const word of words) {
            if (qLower.includes(word)) score++;
          }
          if (score > bestScore) {
            bestScore = score;
            bestMatch = qa;
          }
        }
        
        if (bestMatch && bestScore > 0) {
          aiResponse = bestMatch.answer;
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
          aiResponse = "Hello there! 👋 I am your StudySphere AI tutor. How can I help you study today?";
        }
      }

      const newAssistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
      };
      setMessages(prev => [...prev, newAssistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const createNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  return (
    <div className="h-full flex gap-4 -mx-6 -my-6 sm:mx-0 sm:my-0 h-[calc(100vh-100px)]">
      
      {/* History Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'} hidden md:flex flex-col border-r bg-background/50 backdrop-blur-xl`}>
        <div className="p-4 border-b">
          <button 
            onClick={createNewChat}
            className="w-full flex items-center gap-2 justify-center bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loadingSessions ? (
            <div className="flex justify-center p-4">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center p-4 text-xs text-muted-foreground">
              No chat history.
            </div>
          ) : (
            sessions.map((s) => (
              <div 
                key={s.id} 
                onClick={() => setActiveSessionId(s.id)}
                className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer text-sm transition-colors ${activeSessionId === s.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="truncate">{s.title}</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                  <button className="p-1 hover:text-red-500 rounded"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        <div className="p-4 border-b flex justify-between items-center bg-background/80 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block p-2 hover:bg-muted rounded-lg text-muted-foreground">
              <MessageSquare className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> Study Tutor
            </h1>
          </div>
          <div className="flex bg-muted p-1 rounded-lg">
            <button 
              onClick={() => setChatMode('study')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chatMode === 'study' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Study Mode
            </button>
            <button 
              onClick={() => setChatMode('general')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chatMode === 'general' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              General AI
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">How can I help you study?</h2>
              <p className="text-muted-foreground mb-8">Ask questions about your uploaded documents, generate summaries, or request explanations for complex topics.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <button onClick={() => setInput("Summarize the key points of Chapter 4.")} className="text-left p-3 text-sm border rounded-xl hover:bg-muted transition-colors">
                  "Summarize the key points of Chapter 4."
                </button>
                <button onClick={() => setInput("Generate a 5-question quiz on Neural Networks.")} className="text-left p-3 text-sm border rounded-xl hover:bg-muted transition-colors">
                  "Generate a 5-question quiz on Neural Networks."
                </button>
                <button onClick={() => setInput("Explain backpropagation simply.")} className="text-left p-3 text-sm border rounded-xl hover:bg-muted transition-colors">
                  "Explain backpropagation simply."
                </button>
                <button onClick={() => setInput("What are the formulas for kinematics?")} className="text-left p-3 text-sm border rounded-xl hover:bg-muted transition-colors">
                  "What are the formulas for kinematics?"
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-medium text-muted-foreground">{msg.role === 'assistant' ? 'StudySphere AI' : 'You'}</span>
                    </div>
                    <div 
                      className={`p-4 rounded-2xl text-sm leading-relaxed overflow-hidden group relative ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                          : 'bg-muted/50 border border-border rounded-tl-sm'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({node, inline, className, children, ...props}: any) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                  <div className="relative group rounded-md overflow-hidden my-2">
                                    <div className="flex items-center justify-between px-3 py-1 bg-zinc-800 text-zinc-300 text-xs">
                                      <span>{match[1]}</span>
                                      <button onClick={() => copyToClipboard(String(children), msg.id + 'code')} className="hover:text-white">
                                        {copiedId === msg.id + 'code' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                      </button>
                                    </div>
                                    <SyntaxHighlighter
                                      style={vscDarkPlus as any}
                                      language={match[1]}
                                      PreTag="div"
                                      className="!mt-0 !mb-0 text-xs"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  </div>
                                ) : (
                                  <code className="bg-primary/10 text-primary px-1 py-0.5 rounded text-xs" {...props}>
                                    {children}
                                  </code>
                                )
                              }
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.source && msg.role === 'assistant' && (
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1 bg-muted px-2 py-1 rounded-md border">
                        <FileText className="w-3 h-3" />
                        Source: {msg.source.documentName} (Page {msg.source.page})
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/50 border border-border rounded-tl-sm flex items-center gap-1 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-4 bg-background border-t">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2">
            <button className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <form onSubmit={handleSend} className="flex-1 relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder={chatMode === 'study' ? "Ask about your documents..." : "Ask the general AI..."}
                className="w-full bg-muted/50 border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl pl-4 pr-12 py-3 outline-none resize-none min-h-[50px] max-h-[200px]"
                rows={1}
                style={{ height: 'auto' }}
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 bottom-2 p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-3">
            AI can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
