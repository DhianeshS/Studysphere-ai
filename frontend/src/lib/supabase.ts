// Local Mock implementation of Supabase using localStorage.
// This allows the app to function exactly like production without needing API keys.
// It intercepts all Auth and Database calls and routes them to the browser's localStorage.

const getDb = () => JSON.parse(localStorage.getItem('mock_supabase_db') || '{"users":[], "profiles":[], "documents":[], "study_tasks":[], "notes":[], "flashcards":[], "quizzes":[], "chat_sessions":[]}');
const saveDb = (db: any) => localStorage.setItem('mock_supabase_db', JSON.stringify(db));

// Polyfill for randomUUID in case it's not available in older contexts
const generateId = () => {
  return window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
};

let currentUser = JSON.parse(localStorage.getItem('mock_supabase_user') || 'null');
let authListeners: any[] = [];

const notifyAuth = (event: string, session: any) => {
  authListeners.forEach(listener => listener(event, session));
};

const createMockSupabase = () => {
  return {
    auth: {
      getSession: async () => ({ data: { session: currentUser ? { user: currentUser } : null }, error: null }),
      onAuthStateChange: (callback: any) => {
        authListeners.push(callback);
        return { data: { subscription: { unsubscribe: () => { authListeners = authListeners.filter(l => l !== callback) } } } };
      },
      signUp: async ({ email, password, options }: any) => {
         const db = getDb();
         if (db.users.find((u: any) => u.email === email)) {
            return { data: { user: null, session: null }, error: { message: "User already exists" } };
         }
         const user = { id: generateId(), email, user_metadata: options?.data || {} };
         db.users.push(user);
         db.profiles.push({ id: user.id, display_name: options?.data?.full_name || email.split('@')[0] });
         saveDb(db);
         
         currentUser = user;
         localStorage.setItem('mock_supabase_user', JSON.stringify(user));
         setTimeout(() => notifyAuth('SIGNED_IN', { user }), 100);
         return { data: { user, session: { user } }, error: null };
      },
      signInWithPassword: async ({ email, password }: any) => {
         const db = getDb();
         const user = db.users.find((u: any) => u.email === email);
         if (!user) {
             return { data: { user: null, session: null }, error: { message: "Invalid login credentials." } };
         }
         currentUser = user;
         localStorage.setItem('mock_supabase_user', JSON.stringify(user));
         setTimeout(() => notifyAuth('SIGNED_IN', { user }), 100);
         return { data: { user, session: { user } }, error: null };
      },
      signInWithOAuth: async () => {
         return { data: null, error: { message: "Google Login requires actual Supabase configuration." } };
      },
      signOut: async () => {
         currentUser = null;
         localStorage.removeItem('mock_supabase_user');
         setTimeout(() => notifyAuth('SIGNED_OUT', null), 100);
         return { error: null };
      },
      updateUser: async ({ data }: any) => {
         if (currentUser) {
            currentUser.user_metadata = { ...currentUser.user_metadata, ...data };
            localStorage.setItem('mock_supabase_user', JSON.stringify(currentUser));
            setTimeout(() => notifyAuth('USER_UPDATED', { user: currentUser }), 100);
         }
         return { error: null };
      }
    },
    from: (table: string) => {
      let currentQuery = [...(getDb()[table] || [])];
      
      const chain: any = {
        select: () => chain,
        eq: (col: string, val: any) => {
          currentQuery = currentQuery.filter(item => item[col] === val);
          return chain;
        },
        order: (col: string, { ascending }: { ascending: boolean }) => {
          currentQuery.sort((a, b) => {
             if (a[col] < b[col]) return ascending ? -1 : 1;
             if (a[col] > b[col]) return ascending ? 1 : -1;
             return 0;
          });
          return chain;
        },
        limit: (n: number) => {
          currentQuery = currentQuery.slice(0, n);
          return chain;
        },
        single: () => {
          const item = currentQuery[0] || null;
          return Promise.resolve({ data: item, error: item ? null : { code: 'PGRST116', message: "Row not found" } });
        },
        upsert: async (data: any) => {
          const db = getDb();
          if (!db[table]) db[table] = [];
          const existingIdx = db[table].findIndex((item: any) => item.id === data.id);
          if (existingIdx >= 0) {
             db[table][existingIdx] = { ...db[table][existingIdx], ...data };
          } else {
             if (!data.id) data.id = generateId();
             db[table].push(data);
          }
          saveDb(db);
          return { data, error: null };
        },
        insert: async (data: any) => {
          const db = getDb();
          if (!db[table]) db[table] = [];
          const record = { id: generateId(), created_at: new Date().toISOString(), ...data };
          db[table].push(record);
          saveDb(db);
          return { data: [record], error: null };
        },
        update: (data: any) => {
           // update works with eq() chaining
           return {
              eq: async (col: string, val: any) => {
                  const db = getDb();
                  if (!db[table]) db[table] = [];
                  db[table] = db[table].map((item: any) => item[col] === val ? { ...item, ...data } : item);
                  saveDb(db);
                  return { data: null, error: null };
              }
           }
        },
        delete: () => {
           // delete works with eq() chaining
           return {
               eq: async (col: string, val: any) => {
                   const db = getDb();
                   if (!db[table]) db[table] = [];
                   db[table] = db[table].filter((item: any) => item[col] !== val);
                   saveDb(db);
                   return { data: null, error: null };
               }
           }
        },
        then: (resolve: any) => {
          resolve({ data: currentQuery, error: null });
        }
      };
      
      return chain;
    }
  };
};

export const supabase = createMockSupabase() as any;
