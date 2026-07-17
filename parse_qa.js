const fs = require('fs');
const rawData = `1. What is Ohm's Law?
Answer: Ohm's Law states that the current flowing through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance, provided the temperature remains constant. Formula: V = IR
2. Explain Kirchhoff's Current Law (KCL).
Answer: KCL states that the total current entering a junction is equal to the total current leaving the junction. Formula: ΣI(in) = ΣI(out)
3. What is Newton's Second Law?
Answer: Newton's Second Law states that the force acting on an object is equal to the product of its mass and acceleration. Formula: F = ma
4. Define Entropy.
Answer: Entropy is a measure of the randomness or disorder in a system. Higher entropy means greater disorder.
5. What is a Binary Tree?
Answer: A Binary Tree is a hierarchical data structure in which each node has at most two children: a left child and a right child.
6. Explain Recursion.
Answer: Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem until a base condition is met.
7. What is Polymorphism in OOP?
Answer: Polymorphism allows one interface or method to perform different actions depending on the object using it, enabling code flexibility and reusability.
8. What is Normalization in DBMS?
Answer: Normalization is the process of organizing database tables to reduce data redundancy and improve data integrity.
9. What is Cloud Computing?
Answer: Cloud computing is the delivery of computing services such as storage, databases, networking, and software over the internet instead of local computers.
10. Define Machine Learning.
Answer: Machine Learning is a branch of Artificial Intelligence that enables computers to learn patterns from data and make predictions or decisions without being explicitly programmed.
11. Solve this Integral.
Answer: Please provide the integral expression (e.g., ∫x² dx or ∫sin(x) dx), and I'll solve it step by step.
12. Find the Derivative of x²sin(x).
Answer: Using the product rule:
13. What is the Inverse of a Matrix?
Answer: The inverse of a square matrix is another matrix that, when multiplied by the original matrix, results in the identity matrix. Condition: The determinant must not be zero.
14. Explain Eigenvalues.
Answer: Eigenvalues are special values that indicate how a matrix scales its corresponding eigenvectors during a linear transformation.
15. Solve this Differential Equation.
Answer: Please provide the differential equation (e.g., dy/dx = 2x), and I'll solve it step by step.
16. What is the Laplace Transform?
Answer: The Laplace Transform converts a time-domain function into the frequency (s) domain, making differential equations easier to solve.
17. Explain Fourier Series.
Answer: A Fourier Series represents a periodic function as a sum of sine and cosine waves with different frequencies and amplitudes.
18. Solve this Probability Problem.
Answer: Please provide the probability question so I can calculate the solution with detailed steps.
19. What is Bayes' Theorem?
Answer: Bayes' Theorem calculates the probability of an event based on prior knowledge of related events. Formula:
20. Explain Limits and Continuity.
Answer: A limit describes the value a function approaches as the input approaches a certain point. A function is continuous if there are no breaks, jumps, or holes in its graph.
21. Explain a PN Junction Diode.
Answer: A PN junction diode is a semiconductor device formed by joining P-type and N-type materials. It allows current to flow in one direction (forward bias) and blocks it in the opposite direction (reverse bias).
22. What is a Transistor?
Answer: A transistor is a semiconductor device used to amplify electrical signals or act as an electronic switch.
23. Explain BJT Operation.
Answer: A Bipolar Junction Transistor (BJT) controls current using two PN junctions. It has three terminals: Emitter, Base, and Collector. A small base current controls a larger collector current.
24. Difference Between AC and DC.
Answer:
AC (Alternating Current): Changes direction periodically.
DC (Direct Current): Flows in one direction only.
25. What is Impedance?
Answer: Impedance is the total opposition a circuit offers to alternating current (AC). It combines resistance and reactance. Formula: Z = R + jX (complex form) Unit: Ohm (Ω)
26. Explain Resonance.
Answer: Resonance is a phenomenon in which a circuit or system oscillates with maximum amplitude when the input frequency equals its natural frequency.
27. What is a Rectifier?
Answer: A rectifier is an electronic circuit that converts Alternating Current (AC) into Direct Current (DC). Common types are half-wave, full-wave, and bridge rectifiers.
28. Explain an Operational Amplifier (Op-Amp).
Answer: An Operational Amplifier (Op-Amp) is a high-gain electronic amplifier with two inputs (inverting and non-inverting) and one output. It is used for amplification, filtering, comparison, and signal processing.
29. What is Modulation?
Answer: Modulation is the process of varying a carrier signal's amplitude, frequency, or phase according to the information signal for efficient transmission.
30. Explain Digital Logic Gates.
Answer: Digital logic gates are electronic circuits that perform logical operations on binary inputs. Common gates are AND, OR, NOT, NAND, NOR, XOR, and XNOR.
31. What is an Array?
Answer: An array is a collection of elements of the same data type stored in contiguous memory locations and accessed using an index.
32. Explain Linked Lists.
Answer: A linked list is a linear data structure where each node contains data and a pointer to the next node, allowing dynamic memory allocation.
33. What is a Stack?
Answer: A stack is a linear data structure that follows the LIFO (Last In, First Out) principle. Operations include push, pop, and peek.
34. What is a Queue?
Answer: A queue is a linear data structure that follows the FIFO (First In, First Out) principle. Operations include enqueue and dequeue.
35. Explain Binary Search.
Answer: Binary Search is an efficient algorithm that searches for an element in a sorted array by repeatedly dividing the search interval in half. Time Complexity: O(log n)
36. Explain Merge Sort.
Answer: Merge Sort is a divide-and-conquer sorting algorithm that recursively divides an array, sorts the subarrays, and merges them. Time Complexity: O(n log n)
37. Difference Between C and C++.
Answer:
C: Procedural programming language.
C++: Object-oriented programming language that supports classes, inheritance, and polymorphism.
38. Explain Java Inheritance.
Answer: Inheritance is an OOP feature where one class (child) acquires the properties and methods of another class (parent), promoting code reuse.
39. What is Encapsulation?
Answer: Encapsulation is the process of bundling data and methods into a single unit (class) and restricting direct access to data using access modifiers.
40. Explain Multithreading.
Answer: Multithreading allows multiple threads to execute concurrently within a program, improving performance and resource utilization.
41. What is HTML?
Answer: HTML (HyperText Markup Language) is the standard markup language used to create and structure web pages.
42. Explain CSS Flexbox.
Answer: CSS Flexbox is a one-dimensional layout model that makes it easy to align, distribute, and arrange items within a container.
43. What is JavaScript?
Answer: JavaScript is a programming language used to create interactive and dynamic web pages by manipulating HTML and CSS.
44. Difference Between var, let, and const.
Answer:
var: Function-scoped; can be redeclared and updated.
let: Block-scoped; can be updated but not redeclared in the same scope.
const: Block-scoped; cannot be updated or redeclared after initialization.
45. What is React?
Answer: React is a JavaScript library developed by Meta for building fast, reusable, and interactive user interfaces using components.
46. What are React Hooks?
Answer: React Hooks are special functions that allow functional components to use state and lifecycle features. Common hooks include useState, useEffect, and useContext.
47. What is Node.js?
Answer: Node.js is an open-source JavaScript runtime environment that allows developers to execute JavaScript code on the server side.
48. Explain REST API.
Answer: A REST API (Representational State Transfer API) is a web service architecture that enables communication between client and server using HTTP methods such as GET, POST, PUT, and DELETE.
49. What is JWT Authentication?
Answer: JWT (JSON Web Token) Authentication is a secure method of verifying users by issuing a digitally signed token that is sent with each request.
50. Explain Responsive Design.
Answer: Responsive design is a web development approach that ensures a website automatically adjusts its layout and content to display properly on different screen sizes, such as mobiles, tablets, and desktops.
51. What is SQL?
Answer: SQL (Structured Query Language) is a standard language used to create, retrieve, update, and manage data in relational databases.
52. Explain Primary Key.
Answer: A Primary Key is a column (or set of columns) that uniquely identifies each record in a table. It cannot contain NULL values or duplicates.
53. What is a Foreign Key?
Answer: A Foreign Key is a column that establishes a relationship between two tables by referencing the Primary Key of another table.
54. Explain JOIN Operations.
Answer: JOIN operations combine rows from two or more tables based on a related column. Common types are INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.
55. Difference Between SQL and NoSQL.
Answer:
SQL: Relational database with structured tables and fixed schema.
NoSQL: Non-relational database with flexible schema, suitable for large-scale and unstructured data.
56. What is Indexing?
Answer: Indexing is a database technique that improves the speed of data retrieval by creating a searchable structure on one or more columns.
57. Explain Transactions.
Answer: A transaction is a sequence of database operations performed as a single unit of work. It ensures data consistency and integrity.
58. What is ACID?
Answer: ACID represents the four essential properties of database transactions:
Atomicity
Consistency
Isolation
Durability
59. What is MongoDB?
Answer: MongoDB is a NoSQL database that stores data in flexible JSON-like documents instead of tables.
60. Explain PostgreSQL.
Answer: PostgreSQL is an open-source relational database management system known for reliability, performance, SQL compliance, and advanced features.
61. What is Artificial Intelligence (AI)?
Answer: Artificial Intelligence is the field of computer science that enables machines to perform tasks requiring human intelligence, such as learning, reasoning, and decision-making.
62. What is Deep Learning?
Answer: Deep Learning is a subset of Machine Learning that uses artificial neural networks with multiple layers to learn complex patterns from data.
63. Explain Neural Networks.
Answer: Neural Networks are AI models inspired by the human brain, consisting of interconnected nodes (neurons) that process and learn from data.
64. What is NLP?
Answer: Natural Language Processing (NLP) is a branch of AI that enables computers to understand, interpret, and generate human language.
65. What is RAG?
Answer: Retrieval-Augmented Generation (RAG) is an AI technique that retrieves relevant information from external sources before generating an answer, improving accuracy and providing context.
66. What is Prompt Engineering?
Answer: Prompt Engineering is the practice of designing clear and effective instructions to obtain accurate and useful responses from AI models.
67. What is Overfitting?
Answer: Overfitting occurs when a machine learning model learns the training data too closely, including noise, resulting in poor performance on new data.
68. Explain Supervised Learning.
Answer: Supervised Learning is a machine learning approach where a model is trained using labeled data to predict outputs for new inputs.
69. Difference Between AI and ML.
Answer:
AI: Broad field focused on creating intelligent systems.
ML: A subset of AI that enables systems to learn from data without explicit programming.
70. Explain Generative AI.
Answer: Generative AI is a type of AI that creates new content, such as text, images, audio, videos, or code, by learning patterns from existing data.
71. What is TCP/IP?
Answer: TCP/IP is the standard communication protocol suite used for data transmission over the Internet. TCP ensures reliable delivery, while IP handles addressing and routing.
72. Difference Between HTTP and HTTPS.
Answer:
HTTP: Transfers web data without encryption.
HTTPS: Uses SSL/TLS encryption to securely transmit data between client and server.
73. What is DNS?
Answer: DNS (Domain Name System) translates human-readable domain names (e.g., example.com) into IP addresses used by computers.
74. Explain IP Address.
Answer: An IP (Internet Protocol) address is a unique numerical identifier assigned to a device on a network for communication and identification.
75. What is Subnetting?
Answer: Subnetting is the process of dividing a large network into smaller subnetworks to improve performance, organization, and efficient IP address utilization.
76. Explain Routing.
Answer: Routing is the process of selecting the best path for data packets to travel from a source device to a destination across a network using routers.
77. What is a VPN?
Answer: A Virtual Private Network (VPN) creates an encrypted connection over the internet, protecting user data and privacy while allowing secure remote access.
78. Difference Between IPv4 and IPv6.
Answer:
IPv4: 32-bit address, supports about 4.3 billion unique addresses.
IPv6: 128-bit address, supports a vastly larger address space and improves efficiency and security.
79. What is Packet Switching?
Answer: Packet switching is a method of transmitting data by dividing it into small packets that travel independently and are reassembled at the destination.
80. Explain the OSI Model.
Answer: The OSI (Open Systems Interconnection) model has seven layers:
Physical
Data Link
Network
Transport
Session
Presentation
Application
It provides a standard framework for network communication.
81. What is a Process?
Answer: A process is a program that is currently being executed. It has its own memory space, resources, and execution state.
82. What is a Thread?
Answer: A thread is the smallest unit of execution within a process. Multiple threads in the same process share memory and resources.
83. Explain Deadlock.
Answer: Deadlock is a condition where two or more processes wait indefinitely for resources held by each other, preventing further execution.
84. What is Paging?
Answer: Paging is a memory management technique that divides memory into fixed-size pages and frames, allowing efficient use of physical memory.
85. What is Virtual Memory?
Answer: Virtual memory is a memory management technique that uses disk storage as an extension of RAM, enabling programs larger than physical memory to run.
86. Explain Scheduling Algorithms.
Answer: Scheduling algorithms determine the order in which processes are executed by the CPU. Common algorithms include FCFS, SJF, Priority Scheduling, and Round Robin.
87. Difference Between Linux and Windows.
Answer:
Linux: Open-source, customizable, widely used for servers and development.
Windows: Proprietary, user-friendly, commonly used for personal computers and business applications.
88. What is a Kernel?
Answer: The kernel is the core component of an operating system that manages hardware resources, memory, processes, and communication between software and hardware.
89. Explain File Systems.
Answer: A file system organizes, stores, and retrieves files on storage devices. Examples include NTFS, FAT32, ext4, and APFS.
90. What is Multitasking?
Answer: Multitasking is the ability of an operating system to execute multiple programs or processes simultaneously by efficiently sharing CPU time.
91. What is Encryption?
Answer: Encryption is the process of converting readable data (plaintext) into an unreadable format (ciphertext) to protect it from unauthorized access.
92. Difference Between Hashing and Encryption.
Answer:
Hashing: One-way process used to verify data integrity.
Encryption: Two-way process where encrypted data can be decrypted using a key.
93. What is Phishing?
Answer: Phishing is a cyberattack in which attackers impersonate trusted entities through emails, messages, or websites to steal sensitive information.
94. Explain SQL Injection.
Answer: SQL Injection is a security vulnerability where attackers insert malicious SQL statements into user input to access or manipulate a database.
95. What is Cross-Site Scripting (XSS)?
Answer: XSS is a web security vulnerability where attackers inject malicious scripts into web pages viewed by other users.
96. Explain Firewalls.
Answer: A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predefined security rules.
97. What is Two-Factor Authentication (2FA)?
Answer: Two-Factor Authentication (2FA) is a security method that requires users to verify their identity using two different authentication factors, such as a password and a one-time code.
98. Explain Malware.
Answer: Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems. Examples include viruses, worms, trojans, and spyware.
99. What is Ransomware?
Answer: Ransomware is a type of malware that encrypts a victim's files and demands payment in exchange for the decryption key.
100. What is Ethical Hacking?
Answer: Ethical hacking is the authorized practice of testing computer systems and networks for security vulnerabilities so they can be identified and fixed before attackers exploit them.
101. Summarize this chapter.
Answer: Please upload the chapter or paste the text, and I'll provide a concise summary highlighting the key concepts.
102. Explain this paragraph.
Answer: Please paste the paragraph, and I'll explain its meaning in simple, easy-to-understand language.
103. Make revision notes.
Answer: I'll convert the provided content into short, exam-focused revision notes with key points and formulas.
104. Explain this diagram.
Answer: Upload the diagram, and I'll explain each component, its function, and how it relates to the overall concept.
105. Explain this formula.
Answer: Please provide the formula, and I'll explain its meaning, variables, derivation (if needed), and applications.
106. Give real-world examples.
Answer: Real-world examples connect theoretical concepts to practical applications, making them easier to understand and remember.
107. Simplify this topic.
Answer: Share the topic, and I'll explain it using simple language, step-by-step explanations, and examples.
108. Explain step by step.
Answer: I'll break the concept or problem into clear, logical steps so it's easier to understand and solve.
109. Create mnemonics.
Answer: Mnemonics are memory aids such as acronyms or phrases that help you remember concepts, formulas, or sequences more easily.
110. Highlight important points.
Answer: I'll identify the most important definitions, formulas, concepts, and frequently asked exam topics from the content.
111. What are the most important topics?
Answer: Important topics are those that form the foundation of the subject, appear frequently in exams, and are prerequisites for advanced concepts.
112. Generate 10 MCQs.
Answer: I'll create 10 multiple-choice questions with four options each and provide the correct answers with explanations.
113. Ask viva questions.
Answer: I'll generate oral examination questions ranging from basic to advanced, along with ideal answers.
114. Conduct a mock interview.
Answer: I'll ask subject-related questions one by one, evaluate your responses, and provide feedback for improvement.
115. Predict important questions.
Answer: Based on the syllabus, previous exam patterns, and core concepts, I'll suggest questions that are likely to be important for exams.
116. Create flashcards.
Answer: I'll generate flashcards with questions on one side and concise answers on the other for effective revision.
117. Explain previous-year questions.
Answer: I'll solve previous-year questions step by step and explain the reasoning behind each answer.
118. Evaluate my answer.
Answer: I'll assess your answer for accuracy, completeness, clarity, and presentation, then suggest improvements.
119. Give quick revision tips.
Answer: Focus on formulas, revise key concepts, solve previous-year papers, practice MCQs, and review weak topics regularly.
120. Create a study plan.
Answer: I'll prepare a personalized study schedule based on your subjects, available time, and exam date.
121. Explain Photosynthesis.
Answer: Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to produce glucose and oxygen. Equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
122. What is DNA?
Answer: DNA (Deoxyribonucleic Acid) is the molecule that carries genetic information responsible for the growth, development, and functioning of living organisms.
123. Explain Mitosis.
Answer: Mitosis is the process of cell division that produces two genetically identical daughter cells, essential for growth and tissue repair.
124. What is Osmosis?
Answer: Osmosis is the movement of water molecules through a selectively permeable membrane from a region of lower solute concentration to a region of higher solute concentration.
125. Explain Acids and Bases.
Answer: Acids release hydrogen ions (H⁺) in water, while bases release hydroxide ions (OH⁻) or accept H⁺ ions. The pH scale is used to measure their strength:
Acids: pH < 7
Neutral: pH = 7
Bases: pH > 7
126. What is Oxidation?
Answer: Oxidation is a chemical reaction in which a substance loses electrons, gains oxygen, or loses hydrogen.
127. Explain the Periodic Table.
Answer: The Periodic Table organizes chemical elements based on their atomic number, electron configuration, and recurring chemical properties into periods (rows) and groups (columns).
128. What is Kinetic Energy?
Answer: Kinetic energy is the energy possessed by an object due to its motion. Formula: KE = ½mv²
129. Explain Electromagnetism.
Answer: Electromagnetism is the interaction between electric and magnetic fields. A moving electric charge creates a magnetic field, and changing magnetic fields induce electric currents.
130. What is the Theory of Relativity?
Answer: The Theory of Relativity, proposed by Albert Einstein, explains how space, time, gravity, and motion are related. It consists of Special Relativity and General Relativity.
131. Explain this assignment.
Answer: Please upload or paste your assignment. I'll explain each question, the required concepts, and how to solve it step by step.
132. Help me with homework.
Answer: Share your homework questions, and I'll guide you with explanations and solutions while helping you understand the concepts.
133. Check my solution.
Answer: Paste your solution, and I'll verify its correctness, identify mistakes, and suggest improvements.
134. Find mistakes in my answer.
Answer: I'll review your answer, highlight errors, explain why they're incorrect, and provide the correct approach.
135. Explain this graph.
Answer: Upload the graph, and I'll explain its axes, trends, patterns, and key observations.
136. Compare these two concepts.
Answer: Please specify the two concepts. I'll compare their definitions, features, advantages, disadvantages, and applications in a table.
137. Give practical applications.
Answer: Practical applications show how a concept is used in real life or industry. Share the concept, and I'll provide relevant examples.
138. Explain Advantages and Disadvantages.
Answer: Provide the topic, and I'll list its key advantages, disadvantages, and suitable use cases.
139. Why is this concept important?
Answer: Please specify the concept. I'll explain its significance, practical applications, and why it is essential for learning and real-world use.
140. How do I remember this?
Answer: I can help you remember concepts using mnemonics, memory tricks, visualizations, spaced repetition, and practice questions.
141. Give the answer in 50 words.
Answer: I'll provide a concise explanation limited to approximately 50 words while covering the essential points.
142. Explain in one paragraph.
Answer: I'll summarize the concept in a single, clear, and well-structured paragraph.
143. Answer with bullet points.
Answer: I'll present the answer as concise bullet points to improve readability and revision.
144. Give only the formula.
Answer: I'll provide only the required formula without additional explanation.
145. Explain using an example.
Answer: I'll use a simple real-world or numerical example to illustrate the concept clearly.
146. Explain like I'm 10 years old.
Answer: I'll explain the concept using very simple language, relatable examples, and easy-to-understand comparisons.
147. Explain in technical language.
Answer: I'll provide a detailed explanation using appropriate technical terminology suitable for college or professional study.
148. Explain in Tamil.
Answer: I'll explain the concept clearly in Tamil while preserving the technical meaning.
149. Provide references for the answer.
Answer: I'll include references from reliable sources such as textbooks, research papers, or official documentation to support the explanation.
150. Cite the page number from my uploaded notes.
Answer: After you upload your notes or PDF, I'll answer your question and cite the exact page number (and section, if available) where the information was found.`;

const questions = [];
const lines = rawData.split('\n');
let currentQuestion = '';
let currentAnswer = '';
let state = 0; // 0: waiting for question, 1: reading answer

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/^\d+\.\s/.test(line)) {
    if (currentQuestion && currentAnswer) {
      questions.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() });
    }
    currentQuestion = line.replace(/^\d+\.\s/, '');
    currentAnswer = '';
    state = 1;
  } else if (line.startsWith('Answer:')) {
    currentAnswer = line.replace('Answer:', '').trim() + '\n';
  } else if (state === 1) {
    currentAnswer += line + '\n';
  }
}
if (currentQuestion && currentAnswer) {
  questions.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() });
}

fs.writeFileSync('frontend/src/data/qa_pairs.ts', 'export const qaPairs = ' + JSON.stringify(questions, null, 2) + ';');
console.log('Done writing qa_pairs.ts');
