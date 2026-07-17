const fs = require('fs');

const quizzesData = [
  {
    id: '1', title: 'Data Structures 101', difficulty: 'Beginner', 
    questions: [
      { q: "What data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1 },
      { q: "Which of the following is a non-linear data structure?", options: ["Array", "Linked List", "Tree", "Stack"], answer: 2 },
      { q: "What is the time complexity of binary search?", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], answer: 2 },
      { q: "Which data structure is used for breadth-first search?", options: ["Stack", "Queue", "Hash Table", "Tree"], answer: 1 },
      { q: "What is the best case time complexity of QuickSort?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], answer: 1 },
      { q: "Which of these is a dynamic data structure?", options: ["Array", "String", "Linked List", "Boolean"], answer: 2 },
      { q: "What is the worst-case time for finding an element in a BST?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], answer: 0 },
      { q: "A graph with no cycles is called a...", options: ["Tree", "Cyclic Graph", "Directed Graph", "Bipartite Graph"], answer: 0 },
      { q: "What is a Hash Table primarily used for?", options: ["Sorting", "Fast lookups", "Graph traversal", "Mathematical operations"], answer: 1 },
      { q: "Which collision resolution technique uses linked lists?", options: ["Linear Probing", "Quadratic Probing", "Separate Chaining", "Double Hashing"], answer: 2 },
      { q: "What data structure does recursion use internally?", options: ["Queue", "Heap", "Stack", "Linked List"], answer: 2 },
      { q: "Which tree traversal visits the root node last?", options: ["Inorder", "Preorder", "Postorder", "Level order"], answer: 2 },
      { q: "What is the degree of a leaf node?", options: ["0", "1", "2", "Depends on the tree"], answer: 0 },
      { q: "An adjacency matrix is used to represent...", options: ["Stack", "Queue", "Tree", "Graph"], answer: 3 },
      { q: "Which sorting algorithm is not comparison-based?", options: ["Merge Sort", "Quick Sort", "Radix Sort", "Heap Sort"], answer: 2 }
    ]
  },
  {
    id: '2', title: 'Advanced React Patterns', difficulty: 'Advanced', 
    questions: [
      { q: "What hook is used to manage complex state logic?", options: ["useState", "useEffect", "useReducer", "useContext"], answer: 2 },
      { q: "Which of the following prevents unnecessary re-renders of a component?", options: ["React.memo", "useEffect", "useRef", "useTransition"], answer: 0 },
      { q: "How do you pass data deeply without prop drilling?", options: ["Redux only", "Context API", "Portals", "Error Boundaries"], answer: 1 },
      { q: "What is the purpose of useRef?", options: ["To trigger re-renders", "To access DOM elements directly", "To fetch data", "To style components"], answer: 1 },
      { q: "Which hook is used for side effects?", options: ["useMemo", "useCallback", "useEffect", "useState"], answer: 2 },
      { q: "What does useMemo do?", options: ["Caches a function definition", "Caches a computed value", "Manages state", "Re-renders components"], answer: 1 },
      { q: "What pattern passes a function to a child component to control rendering?", options: ["Higher Order Components", "Render Props", "Custom Hooks", "Context API"], answer: 1 },
      { q: "How do you create a custom hook?", options: ["By extending React.Component", "By writing a function starting with 'use'", "By importing customHook", "By using a class"], answer: 1 },
      { q: "What is React Suspense used for?", options: ["Error handling", "Animations", "Data fetching and code splitting boundaries", "State management"], answer: 2 },
      { q: "Which hook allows you to defer updating a non-urgent part of the UI?", options: ["useTransition", "useDeferredValue", "useMemo", "Both A and B"], answer: 3 },
      { q: "What is a Higher-Order Component (HOC)?", options: ["A component that returns a function", "A function that takes a component and returns a new component", "A component that renders children directly", "A stateful component"], answer: 1 },
      { q: "How do you handle errors in React 16+ boundaries?", options: ["try/catch blocks", "componentDidCatch", "useEffect error dependency", "Window.onerror"], answer: 1 },
      { q: "What is StrictMode used for?", options: ["Enforcing styling rules", "Highlighting potential problems in an application", "Preventing memory leaks", "Optimizing production builds"], answer: 1 },
      { q: "Which hook caches a callback function?", options: ["useMemo", "useCallback", "useRef", "useReducer"], answer: 1 },
      { q: "What is the primary benefit of Server-Side Rendering (SSR) in React?", options: ["Faster initial page load and better SEO", "Simpler state management", "Fewer bugs", "Cheaper hosting"], answer: 0 }
    ]
  },
  {
    id: '3', title: 'Database Normalization', difficulty: 'Intermediate', 
    questions: [
      { q: "What does 1NF stand for?", options: ["First Null Format", "First Normal Form", "First Node Function", "None of the above"], answer: 1 },
      { q: "Which normal form removes transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 2 },
      { q: "What is a primary key?", options: ["A key to encrypt data", "A unique identifier for a record", "A key that can be null", "A duplicate key"], answer: 1 },
      { q: "What is a foreign key?", options: ["A key from another database", "A field that uniquely identifies a row in another table", "An encrypted key", "A key with no constraints"], answer: 1 },
      { q: "To achieve 2NF, a table must first be in...", options: ["3NF", "BCNF", "1NF", "4NF"], answer: 2 },
      { q: "What issue does normalization primarily address?", options: ["Slow queries", "Data redundancy and anomalies", "Lack of storage", "Security vulnerabilities"], answer: 1 },
      { q: "What is a composite key?", options: ["A key made of a single column", "A key that is automatically generated", "A primary key that consists of two or more attributes", "A key used for indexing only"], answer: 2 },
      { q: "BCNF is a stronger version of which normal form?", options: ["1NF", "2NF", "3NF", "4NF"], answer: 2 },
      { q: "What is an insertion anomaly?", options: ["When inserting data is too slow", "Inability to add data to the database due to absence of other data", "When data is inserted twice", "When the database crashes during insert"], answer: 1 },
      { q: "Which constraint ensures a column cannot have NULL values?", options: ["UNIQUE", "NOT NULL", "CHECK", "DEFAULT"], answer: 1 },
      { q: "Denormalization is often used to...", options: ["Improve read performance", "Save disk space", "Increase redundancy", "Prevent anomalies"], answer: 0 },
      { q: "What is a candidate key?", options: ["Any column in a table", "A set of columns that uniquely identifies a record, from which a primary key is chosen", "A key that cannot be used as a primary key", "A foreign key"], answer: 1 },
      { q: "What does 4NF deal with?", options: ["Partial dependencies", "Transitive dependencies", "Multi-valued dependencies", "Join dependencies"], answer: 2 },
      { q: "In a relational database, a table is also called a...", options: ["Tuple", "Attribute", "Relation", "Domain"], answer: 2 },
      { q: "Which operation combines rows from two or more tables based on a related column?", options: ["SELECT", "JOIN", "UNION", "INTERSECT"], answer: 1 }
    ]
  },
  {
    id: '4', title: 'Machine Learning Basics', difficulty: 'Beginner', 
    questions: [
      { q: "What is the goal of supervised learning?", options: ["Predict an output from inputs based on labeled data", "Find hidden patterns in unlabeled data", "Learn by interacting with an environment", "Sort data into an array"], answer: 0 },
      { q: "Which algorithm is used for classification?", options: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"], answer: 1 },
      { q: "What is overfitting?", options: ["Model performs well on test but poorly on training", "Model performs well on training but poorly on test data", "Model is too simple", "Model requires more data"], answer: 1 },
      { q: "What is unsupervised learning?", options: ["Learning with a teacher", "Learning with labeled data", "Learning from unlabeled data to find hidden structure", "Learning by trial and error"], answer: 2 },
      { q: "Which of these is a clustering algorithm?", options: ["Linear Regression", "Support Vector Machines", "K-Means", "Decision Trees"], answer: 2 },
      { q: "What is a feature in machine learning?", options: ["An individual measurable property or characteristic", "The final prediction", "The algorithm itself", "The loss function"], answer: 0 },
      { q: "What is the purpose of a loss function?", options: ["To speed up training", "To measure how far off predictions are from actual values", "To clean the data", "To visualize the results"], answer: 1 },
      { q: "What does 'training' a model mean?", options: ["Writing the code for it", "Optimizing its parameters to minimize error on the training data", "Deploying it to a server", "Testing it on new data"], answer: 1 },
      { q: "Which technique helps prevent overfitting?", options: ["Adding more layers", "Training for more epochs", "Regularization", "Using a smaller dataset"], answer: 2 },
      { q: "What is a Neural Network inspired by?", options: ["The stock market", "Biological brains", "Physics equations", "Quantum mechanics"], answer: 1 },
      { q: "What is the term for holding back a portion of data to evaluate the final model?", options: ["Training set", "Validation set", "Test set", "Feature set"], answer: 2 },
      { q: "What is Reinforcement Learning based on?", options: ["Labeled examples", "Unlabeled clusters", "Maximizing a reward signal through actions", "Linear equations"], answer: 2 },
      { q: "What does PCA stand for?", options: ["Principal Component Analysis", "Primary Core Algorithm", "Predictive Classification Area", "Pattern Correlation Analysis"], answer: 0 },
      { q: "Which of these is NOT a machine learning framework?", options: ["TensorFlow", "PyTorch", "Scikit-Learn", "React"], answer: 3 },
      { q: "What is 'bias' in a model?", options: ["Prejudice against certain groups", "The simplifying assumptions made by a model to make the target function easier to learn", "The random noise in the data", "The variance of the predictions"], answer: 1 }
    ]
  },
  {
    id: '5', title: 'Network Protocols', difficulty: 'Intermediate', 
    questions: [
      { q: "Which protocol is connection-oriented?", options: ["UDP", "IP", "TCP", "ICMP"], answer: 2 },
      { q: "What port does HTTPS use by default?", options: ["80", "443", "21", "22"], answer: 1 },
      { q: "What does DNS do?", options: ["Encrypts traffic", "Translates domain names to IP addresses", "Assigns IP addresses", "Routes packets"], answer: 1 },
      { q: "What layer of the OSI model does IP operate on?", options: ["Data Link", "Network", "Transport", "Application"], answer: 1 },
      { q: "Which protocol is used to send emails?", options: ["POP3", "IMAP", "SMTP", "FTP"], answer: 2 },
      { q: "What is the purpose of DHCP?", options: ["To securely transfer files", "To dynamically assign IP addresses to devices", "To resolve hostnames", "To encrypt web traffic"], answer: 1 },
      { q: "Which protocol provides connectionless, unacknowledged service?", options: ["TCP", "UDP", "HTTP", "SSH"], answer: 1 },
      { q: "What port does SSH use by default?", options: ["21", "22", "23", "80"], answer: 1 },
      { q: "What is an IPv4 address size?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], answer: 1 },
      { q: "What is an IPv6 address size?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], answer: 2 },
      { q: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "Hyper Transfer Text Protocol", "HyperText Transport Protocol"], answer: 0 },
      { q: "What is a MAC address?", options: ["A logical address assigned by the router", "A physical address burned into the network interface card", "An email address for Apple computers", "A web domain name"], answer: 1 },
      { q: "Which protocol is used for secure remote command-line access?", options: ["Telnet", "FTP", "SSH", "HTTP"], answer: 2 },
      { q: "What is the purpose of ICMP?", options: ["Transferring files", "Error reporting and diagnostic functions (like ping)", "Encrypting data", "Assigning IP addresses"], answer: 1 },
      { q: "Which OSI layer is responsible for routing packets?", options: ["Physical", "Data Link", "Network", "Transport"], answer: 2 }
    ]
  },
  {
    id: '6', title: 'System Design Interview', difficulty: 'Advanced', 
    questions: [
      { q: "What is horizontal scaling?", options: ["Adding more CPU/RAM to a single server", "Adding more servers to a pool", "Upgrading the database schema", "Caching all queries"], answer: 1 },
      { q: "Which of these is a popular in-memory cache?", options: ["PostgreSQL", "MongoDB", "Redis", "Cassandra"], answer: 2 },
      { q: "What is a load balancer used for?", options: ["Storing files securely", "Distributing incoming network traffic across multiple servers", "Encrypting database passwords", "Compiling code"], answer: 1 },
      { q: "What is database sharding?", options: ["Encrypting the database", "Partitioning a large database into smaller, faster, more easily managed parts", "Backing up the database", "Indexing the database"], answer: 1 },
      { q: "What does CDN stand for?", options: ["Central Data Network", "Content Delivery Network", "Core Database Node", "Caching Data Network"], answer: 1 },
      { q: "What is CAP theorem?", options: ["Consistency, Availability, Partition Tolerance", "Capacity, Accessibility, Performance", "Compute, API, Processing", "Cost, Agility, Power"], answer: 0 },
      { q: "In a microservices architecture, what pattern handles cross-cutting concerns like routing and authentication?", options: ["Singleton", "API Gateway", "Factory", "Observer"], answer: 1 },
      { q: "Which database type is best suited for highly connected data like social networks?", options: ["Relational (SQL)", "Document (MongoDB)", "Graph (Neo4j)", "Key-Value (Redis)"], answer: 2 },
      { q: "What is 'eventual consistency'?", options: ["Data is never consistent", "Given enough time, all updates will propagate and nodes will return the same data", "Data is consistent instantly across all nodes", "A strict ACID property"], answer: 1 },
      { q: "What is a message queue useful for?", options: ["Storing static files", "Synchronous request-response", "Decoupling services and handling asynchronous tasks", "Frontend state management"], answer: 2 },
      { q: "Which algorithm can a load balancer use?", options: ["Round Robin", "Least Connections", "IP Hash", "All of the above"], answer: 3 },
      { q: "What is a reverse proxy?", options: ["A server that sits in front of web servers and forwards client requests to them", "A server that sits in front of clients and forwards requests to the internet", "A database index", "A caching strategy"], answer: 0 },
      { q: "What does SLA stand for?", options: ["Service Level Agreement", "System Load Average", "Secure Login Authentication", "Standard Library API"], answer: 0 },
      { q: "What is rate limiting used for?", options: ["Speeding up requests", "Controlling the rate of traffic sent or received by a network interface", "Compressing images", "Encrypting passwords"], answer: 1 },
      { q: "Which of these is NOT a typical reason to use microservices over a monolith?", options: ["Independent deployability", "Easier to scale specific components", "Simpler to debug and trace requests", "Technology diversity"], answer: 2 }
    ]
  }
];

fs.writeFileSync('./frontend/src/data/mockQuizzes.json', JSON.stringify(quizzesData, null, 2));
console.log("mockQuizzes.json generated successfully.");
