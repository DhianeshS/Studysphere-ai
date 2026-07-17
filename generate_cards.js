const fs = require('fs');

const topics = [
  { topic: 'Data Structures', terms: ['Array', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph', 'Hash Table', 'Heap', 'Trie', 'B-Tree'] },
  { topic: 'Algorithms', terms: ['Binary Search', 'Merge Sort', 'Quick Sort', 'Bubble Sort', 'Dijkstra', 'DFS', 'BFS', 'Dynamic Programming', 'Greedy', 'Backtracking'] },
  { topic: 'Web Development', terms: ['HTML', 'CSS', 'JavaScript', 'React', 'DOM', 'REST API', 'GraphQL', 'JWT', 'CORS', 'WebSockets'] },
  { topic: 'Databases', terms: ['SQL', 'NoSQL', 'Normalization', 'ACID', 'Index', 'Foreign Key', 'Primary Key', 'Join', 'Transaction', 'Sharding'] },
  { topic: 'Networking', terms: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'IP Address', 'MAC Address', 'Router', 'Switch', 'Firewall'] },
  { topic: 'Operating Systems', terms: ['Process', 'Thread', 'Deadlock', 'Mutex', 'Semaphore', 'Virtual Memory', 'Paging', 'Scheduling', 'Kernel', 'Shell'] },
  { topic: 'Cybersecurity', terms: ['Phishing', 'Malware', 'Encryption', 'Decryption', 'Symmetric Key', 'Asymmetric Key', 'Hash Function', 'Salting', 'VPN', 'DDoS'] },
  { topic: 'Cloud Computing', terms: ['IaaS', 'PaaS', 'SaaS', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Serverless', 'Microservices', 'Load Balancer'] },
  { topic: 'Machine Learning', terms: ['Supervised Learning', 'Unsupervised Learning', 'Neural Network', 'Deep Learning', 'Gradient Descent', 'Overfitting', 'Underfitting', 'Epoch', 'Batch Size', 'Learning Rate'] },
  { topic: 'Software Engineering', terms: ['Agile', 'Scrum', 'Waterfall', 'Git', 'CI/CD', 'TDD', 'Design Patterns', 'MVC', 'Singleton', 'Observer'] },
  { topic: 'Mathematics', terms: ['Calculus', 'Linear Algebra', 'Probability', 'Statistics', 'Matrix', 'Vector', 'Derivative', 'Integral', 'Eigenvalue', 'Eigenvector'] },
  { topic: 'Physics', terms: ['Newton First Law', 'Newton Second Law', 'Newton Third Law', 'Gravity', 'Velocity', 'Acceleration', 'Force', 'Energy', 'Work', 'Power'] },
  { topic: 'Chemistry', terms: ['Atom', 'Molecule', 'Proton', 'Neutron', 'Electron', 'Periodic Table', 'Covalent Bond', 'Ionic Bond', 'Isotope', 'pH'] },
  { topic: 'Biology', terms: ['Cell', 'DNA', 'RNA', 'Protein', 'Enzyme', 'Mitochondria', 'Nucleus', 'Photosynthesis', 'Respiration', 'Mitosis'] },
  { topic: 'History', terms: ['World War I', 'World War II', 'Cold War', 'Renaissance', 'Industrial Revolution', 'French Revolution', 'American Revolution', 'Roman Empire', 'Ancient Egypt', 'Feudalism'] }
];

const cards = [];
let idCounter = 1;

topics.forEach(t => {
  t.terms.forEach(term => {
    cards.push({
      id: `mock-fc-${idCounter++}`,
      front: `What is the definition of ${term} in ${t.topic}?`,
      back: `${term} is a fundamental concept in ${t.topic}. It refers to... [Detailed definition for ${term} would go here in a real scenario, illustrating its properties, usage, and examples.]`,
      deck_id: 'default',
      created_at: new Date().toISOString()
    });
  });
});

fs.writeFileSync('./frontend/src/data/flashcards150.json', JSON.stringify(cards, null, 2));
console.log(`Generated ${cards.length} flashcards.`);
