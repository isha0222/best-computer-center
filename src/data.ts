import { CourseDetail, ServiceDetail } from "./types";
import t1 from "./assets/team/t1.png";
import t2 from "./assets/team/t2.png";
import t3 from "./assets/team/t3.png";
import t4 from "./assets/team/t4.png";
import t5 from "./assets/team/t5.png";

export const COURSES: CourseDetail[] = [
  {
    id: "ccc",
    title: "CCC",
    duration: "2 Months",
    fees: "₹5,000",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600&auto=format&fit=crop",
    description: "Basic computer course to improve digital literacy and everyday computer skills.",
    content: [
      "Computer Basics & Hardware Concepts",
      "Operating Systems & Desktop Management",
      "MS Word (Document Creation & Editing)",
      "MS Excel (Spreadsheets & Formulas)",
      "MS PowerPoint (Slide Presentations)",
      "Internet, Web Browsing & Search Techniques",
      "Email Management & Digital Communication",
      "Typing Practice & Fast Keyboard Shortcuts"
    ]
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    duration: "2 Months",
    fees: "₹10,000",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop",
    description: "Learn AI and Machine Learning basics with real-world applications to build smart systems.",
    content: [
      "AI Introduction: What is AI?, Real life AI examples, Types of AI, Future of AI, Safe & Responsible AI",
      "Smart Prompt Writing: ChatGPT proper use, Prompt formula, Homework solve, Project report, Professional Email, Resume writing",
      "AI for Study & Office: Create Notes, MCQ generate, Excel formula, PPT create, Data summary, Office work with AI",
      "AI for Design: Canva AI tools, Social media post, Banner design, Logo design, Visiting card, AI image generate",
      "AI for Video & Reels: CapCut AI editing, Script writing, Reel ideas, YouTube title & description, AI voice over",
      "AI for Business & Earning: Local business marketing, WhatsApp marketing message, Freelancing ideas, Fiverr work, Resume service, Social media handling service"
    ]
  },
  {
    id: "cyber",
    title: "Cyber Security",
    duration: "2 Months",
    fees: "₹10,000",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    description: "Learn cybersecurity fundamentals to protect systems, networks, and data from digital threats.",
    content: [
      "Cyber Security Fundamentals",
      "Identity Protection & Multi-Factor Auth",
      "Social Media Security & Phishing Defense",
      "Windows & Mobile OS Security Setting",
      "Virus, Ransomware & Malware Awareness",
      "WiFi & Network Attack Defenses",
      "Data Protection & Deep Web Knowledge",
      "Secure Online Banking & Transaction safety",
      "Cyber Fraud Recovery & IT Crime Laws"
    ]
  },
  {
    id: "accounting",
    title: "Advance Financial Accounting (Tally with GST)",
    duration: "3 Months",
    fees: "₹12,000",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    description: "Gain in-depth knowledge of accounting, taxation, and financial management. Ideal for commerce students and professionals.",
    content: [
      "Accounting Basics: Fundamentals of Accounting, Chart of Accounts, Stock Keeping Units (SKU), Daily transactions, Receivable/Payable, MIS Reports, GST Invoice",
      "Tally Advance: Basic + Journal Entries, Inventory, Banking, Expenses & Income, Storage & Classification, Purchase-Sales Cycle, Price List, Manufacturing Process, Securing Financial Information, GST Intro, Data & Year End",
      "Tally Advance Plus: Basic + Advance + GST, TDS, Cost Center, Tally Audit, Interest Calculation, Synchronization, Multi Currency, Budgets, POS, Item Cost, Password Security",
      "GST Training: GST Rules, Registration, Invoice, E-Way Bill, Input Credit, Tax Payment, Refund, E-Commerce, Compliance, GST in Tally",
      "GST & Tally.ERP 9 Training Program: What is GST?, Registration, Invoicing, Value of Supply, Payment of Tax, Refund of Tax, Demand and Recovery, Tax Rate Structure, ISD, GSTN & GSP, Supply of Goods and Services",
      "Key Features: Professional Training, Tally Certificate, Digital Classroom, Project Training, Effective Practical Lessons, Full Study Material"
    ]
  },
  {
    id: "c",
    title: "C Programming",
    duration: "2 Months",
    fees: "₹8,000",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop",
    description: "Learn the fundamentals of programming with C and build a strong coding foundation.",
    content: [
      "Introduction to C & Development Environments",
      "Algorithm, Flowchart & Logic Development",
      "Variables, Constants & Datatypes",
      "Arithmetic, Logical & Bitwise Operators",
      "Conditional Statements (if-else, switch-case)",
      "Looping Control Structures (for, while, do-while)",
      "Single and Multi-dimensional Arrays",
      "Functions (Call-by-value vs Call-by-reference)",
      "Structures, Unions & Typedef",
      "Pointers & Memory Address Manipulation",
      "File Handling (Reading/Writing data files)"
    ]
  },
  {
    id: "cpp",
    title: "C++ Programming",
    duration: "2 Months",
    fees: "₹8,000",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop",
    description: "Learn object-oriented programming concepts using C++ for real-world applications.",
    content: [
      "Introduction to OOPs Concepts & C++ syntax",
      "Datatypes, Constants & Reference Variables",
      "Conditional Statements & Looping Control",
      "Objects & Classes, Data Encapsulation",
      "Constructors & Destructors (types & uses)",
      "Memory Management Operators (new, delete)",
      "Function Overloading & Operator Overloading",
      "Friend Functions & Virtual Functions",
      "Pure Virtual Functions & Abstract Classes",
      "Inheritance (Single, Multiple, Hierarchical, Hybrid)",
      "Exception Handling (try, catch, throw)",
      "File Handling and Input/Output Streams"
    ]
  },
  {
    id: "java",
    title: "Advance Java",
    duration: "2 Months",
    fees: "₹8,000",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    description: "Learn Java programming fundamentals and build powerful applications for real-world use.",
    content: [
      "NetBeans & IDE Configurations",
      "Socket Programming (Client-Server Architecture)",
      "Swing Programming (GUI Layouts, Action Events)",
      "File Handling & Object Serialization",
      "Servlets Life Cycle & Web Applications",
      "Tomcat Web Server Configurations",
      "JDBC Database Connection & Statements",
      "RMI (Remote Method Invocation)",
      "JSP (Java Server Pages)"
    ]
  },
  {
    id: "Corejava",
    title: "Core Java",
    duration: "2 Months",
    fees: "₹8,000",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    description: "Understand Java fundamentals and build strong programming basics.",
    content: [
      "Introduction to Java VM, JRE and JDK",
      "Object-Oriented Programming (OOP) in Java",
      "Classes, Objects, Methods & Variables",
      "Constructors & Static variables/methods",
      "Keyword usage (this, super, final, static)",
      "Inheritance, Polymorphism & Encapsulation",
      "Multithreading & Thread Lifecycle",
      "Exception Handling (try-catch-finally, throws)",
      "Packages & Interfaces",
      "Applet & AWT Controls for GUI design"
    ]
  },
  {
    id: "Masterjava",
    title: "Master In Java",
    duration: "3 Months",
    fees: "₹16,000",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    description: "Complete Java course from basics to advanced with real project development.",
    content: [
      "Java Basics: Variables, Operators, Loops, Arrays, Strings",
      "Core OOP Concepts: Classes, Inheritance, Polymorphism, Interfaces",
      "Advanced Java: JDBC, Servlets, JSP, Swing Applications",
      "Database Mastery: MySQL, DB Schema, Connections",
      "Modern Frameworks: Hibernate ORM, Spring Framework, Spring Boot",
      "Real-world Project Implementation & Web Services"
    ]
  },
  {
    id: "python",
    title: "Python Django",
    duration: "3 Months",
    fees: "₹18,000",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop",
    description: "Build powerful web applications using Python and Django framework.",
    content: [
      "Introduction to Python & Jupyter/VS Code Setup",
      "Logic Development, Conditions and Loops",
      "Data Types, Operators, Lists, Tuples, Dictionaries",
      "Object-Oriented Programming (OOP) in Python",
      "Regular Expressions & Pattern Matching",
      "Decorators, Generators & Advanced Python Concepts",
      "Django Framework Setup & App Architecture",
      "Models, Migrations and Databases (SQLite/MySQL)",
      "Django Forms & Form Validation",
      "User Authentication, Login/Register Controls",
      "Deployment on Cloud platforms & GitHub version control"
    ]
  },
  {
    id: "oracle",
    title: "Oracle Database",
    duration: "2 Months",
    fees: "₹8,000",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
    description: "Learn database management and SQL using Oracle for professional use.",
    content: [
      "Introduction to Oracle & Relational Databases",
      "DBMS vs RDBMS concepts",
      "DDL (Data Definition Language) & DML (Data Manipulation Language)",
      "TCL (Transaction Control) & Constraints (Primary Key, Foreign Key)",
      "Aggregate Functions & Grouping (GROUP BY, HAVING)",
      "Joins (Inner, Left, Right, Full) & Database Views",
      "Subqueries & Nested SQL queries",
      "PL/SQL Block Structure, Variables & Procedures",
      "User-defined Functions & Database Triggers",
      "Cursors (Implicit/Explicit) & Exception Handling"
    ]
  },
  {
    id: "webdesign",
    title: "Web Designing",
    duration: "2 Months",
    fees: "₹13,000",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
    description: "Create attractive and responsive websites using HTML, CSS, and modern tools.",
    content: [
      "Introduction to Web Design & HTML5 Structure",
      "DHTML, DOM manipulation concepts",
      "CSS3: Layouts, Colors, Flexbox, CSS Grid, Transitions",
      "JavaScript: Variables, Events, Forms, Validations",
      "jQuery: Selectors, Animations, Events handlers",
      "Bootstrap Framework for Responsive Design",
      "Adobe Photoshop for Web UI Mockups",
      "CorelDraw for Vector icons and Logo designs"
    ]
  },
  {
    id: "webdev",
    title: "Web Technologies (Web Development)",
    duration: "3 Months",
    fees: "₹20,000",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop",
    description: "Learn front-end and back-end web technologies to build dynamic websites.",
    content: [
      "HTML5, CSS3, JavaScript ES6",
      "Bootstrap and jQuery Libraries",
      "Development tools: VS Code, WampServer / XAMPP",
      "PHP Backend scripting language basics",
      "PHP Form Handling, File Uploads & Sessions",
      "Database Connectivity with MySQL",
      "CRUD operations in PHP & SQL",
      "Adobe Photoshop & CorelDraw for assets & branding",
      "Web hosting, FTP, domain settings & live deployment"
    ]
  },
  {
    id: "dtp",
    title: "DTP (Desktop Publishing)",
    duration: "2 Months",
    fees: "₹12,000",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
    description: "Learn graphic designing tools for professional print and digital media.",
    content: [
      "Introduction to Digital Media & Image Formats",
      "Adobe Photoshop: Image touchup, color correction, masking",
      "CorelDraw: Vector patterns, brochure layout, visiting card design",
      "Gujarati Typing (Indic keyboard setups & practices)",
      "English Typing (speed & accuracy improvement keys)",
      "Page layout guidelines, margin specs & prep for print shops"
    ]
  },
  {
    id: "flutter",
    title: "Flutter & Dart",
    duration: "2 Months",
    fees: "₹27,000",
    image: "https://images.unsplash.com/photo-1651340981821-b519ad14da7c?q=80&w=600&auto=format&fit=crop",
    description: "Build cross-platform mobile apps using Flutter and Dart.",
    content: [
      "Introduction to Dart programming language",
      "Flutter framework architecture and installation",
      "Stateless & Stateful widgets, Layout mechanisms",
      "Building highly responsive UI across Android & iOS",
      "Navigation & Multi-screen navigation flows",
      "State Management (Provider / Bloc basic setups)",
      "Forms, TextInputs, and user input validation",
      "Sending HTTP requests to REST APIs & JSON parsing",
      "Firebase Integration & User Authentication",
      "Animations, Transitions, and Custom Painter",
      "Accessing Device Camera, Geolocation and Maps",
      "Image Uploads, Local Cache, and Push Notifications"
    ]
  },
  {
    id: "cloud1",
    title: "AWS Cloud Practitioner",
    duration: "2 Months",
    fees: "₹45,000",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    description: "Get started with cloud computing and AWS fundamentals.",
    content: [
      "Introduction to Cloud Computing & AWS Globals",
      "Types of Cloud (Public, Private, Hybrid) & SaaS/PaaS/IaaS",
      "AWS Certified Cloud Practitioner Exam Blueprint",
      "AWS Account creation & free-tier management",
      "Identity and Access Management (IAM) & Security policies",
      "Simple Storage Service (S3) & CloudFront CDN",
      "Elastic Compute Cloud (EC2) instances & keypairs",
      "Relational Databases (RDS) & DynamoDB on AWS",
      "VPC basics & Networking, Route 53 DNS setting",
      "AWS Billing, Cost Management & Support plans",
      "AWS Lightsail, Kubernetes & serverless introductions",
      "CloudWatch monitoring & CloudTrail audits",
      "AWS WAF, Shield, Security Groups & Key Management"
    ]
  },
  {
    id: "cloud2",
    title: "AWS Solution Architect Associate",
    duration: "3 Months",
    fees: "₹62,000",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
    description: "Design scalable and secure cloud solutions using AWS.",
    content: [
      "Advanced IAM policies & Multi-Factor Auth (MFA)",
      "High Availability & Resiliency Architectures",
      "S3 static website hosting, lifecycle policies & versioning",
      "VPC Architecture: Subnets, Route tables, Internet & NAT Gateways",
      "Elastic Load Balancing (ELB) & Auto-Scaling groups",
      "Deploying Node.js and Python servers on EC2 and ECS",
      "Elastic File System (EFS) and block storage optimization",
      "Amazon Cognito User pools & federated identities",
      "Serverless architecture using AWS Lambda and Python scripts",
      "Security best practices, encryption at rest and in transit",
      "Disaster recovery, data replication, backup & restore cycles"
    ]
  },
  {
    id: "cloud3",
    title: "AWS Developer Associate",
    duration: "3 Months",
    fees: "₹62,000",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop",
    description: "Analyze and visualize data using AWS analytics tools.",
    content: [
      "Developer environment setups on AWS: Cloud9 IDE",
      "SDK usage for Node.js and Python with EC2 & local servers",
      "Simple Queue Service (SQS) & Simple Notification Service (SNS)",
      "DynamoDB APIs, partitions, indexes, queries & scans",
      "Deploying serverless web applications using AWS SAM",
      "Encryption: KMS, envelope encryption, client vs server side",
      "Cognito Auth tokens & REST API access controls",
      "Deployment pipelines: CodeCommit, CodeBuild, CodePipeline",
      "AWS Amplify integration for rapid mobile/web developers",
      "X-Ray tracing, debugging serverless applications"
    ]
  },
  {
    id: "advtech",
    title: "Adv. Techno (Node.js, Angular, MongoDB)",
    duration: "4 Months",
    fees: "₹45,000",
    image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=600&auto=format&fit=crop",
    description: "Learn modern web development using Node.js, Angular, and MongoDB to build powerful full-stack applications.",
    content: [
      "Node JS: Modules, npm package manager, File Systems, Event Loop, Express.js framework, Router, Middlewares, REST API",
      "Angular: TypeScript foundation, Angular CLI, Component architecture, Data binding, Directives, Services & dependency injection, Routing, HTTP Client",
      "MongoDB: NoSQL schemas, MongoDB Compass, CRUD operations, Indexing, Aggregation pipelines, Mongoose ODM schemas, validations & references",
      "Full-stack project: building a fully integrated dynamic application"
    ]
  },
  {
    id: "adse",
    title: "Advance Diploma in Software Engg.",
    duration: "1 Year",
    fees: "₹60,000",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop",
    description: "Become a full-stack developer with complete software engineering training. Work on real-time projects and industry tools.",
    content: [
      "Term 1: MS Office, English/Gujarati Typing, CCC Basics",
      "Term 2: Web designing with HTML5, CSS3, JavaScript, jQuery, Bootstrap",
      "Term 3: Desktop Publishing with Adobe Photoshop and CorelDraw",
      "Term 4: Coding foundation with C & C++ Programming",
      "Term 5: Enterprise Application Development with Java and Oracle",
      "Term 6: Accounting systems with Tally ERP 9 / Prime with GST",
      "Term 7: Mini-project creation, presentation and software development life cycle"
    ]
  },
  {
    id: "vbn",
    title: "VB.Net",
    duration: "2 Months",
    fees: "₹12,000",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop",
    description: "Learn VB.NET to develop powerful Windows desktop applications with ease.",
    content: [
      "Introduction to .NET Framework and Common Language Runtime (CLR)",
      "VB.NET Programming foundations: variables, control loops, arrays",
      "Windows Forms controls: buttons, textboxes, lists, dialogs",
      "Object-Oriented Programming (OOP) in VB.NET",
      "Event-driven programming model & multiple document interface (MDI)",
      "Database access using ADO.NET: connections, adapters, datasets",
      "Binding SQL Server or Access databases to GUI controls",
      "Creating reports, charts and final executable (.exe) setups"
    ]
  },
  {
    id: "php",
    title: "PHP Development",
    duration: "1.5 Months",
    fees: "₹11,000",
    image: "https://images.unsplash.com/photo-1599507593499-a3f7f7d9a2cc?q=80&w=600&auto=format&fit=crop",
    description: "Create dynamic and interactive websites using PHP. Essential for backend web development.",
    content: [
      "Introduction to Server-side Scripting & PHP environment",
      "PHP Basics: syntax, variables, datatypes, operators, conditionals",
      "Control Structures & User-defined Functions",
      "HTTP requests, Form submissions, GET vs POST methods",
      "Working with arrays and string manipulation methods",
      "PHP sessions, cookies and secure login structures",
      "Connecting to MySQL database using PDO or MySQLi",
      "Executing SQL: INSERT, SELECT, UPDATE, DELETE queries",
      "Project work: building a dynamic website with administration panel"
    ]
  },
  {
    id: "ps",
    title: "PhotoShop",
    duration: "2 Months",
    fees: "₹6,000",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    description: "Edit images and create stunning graphics using Adobe Photoshop. Perfect for designers and editors.",
    content: [
      "Introduction to Adobe Photoshop Workspace",
      "Selection tools, lasso, quick mask, cropping tools",
      "Working with Layers, Layer styles, and Blending modes",
      "Image retouching, healing brush, stamp tool, filters",
      "Vector shapes, pen tools, paths, typography settings",
      "Color theory, brush engines, custom palettes",
      "Practical work: photo touchups, layout mockups, graphic designs",
      "Project work: Poster design, Banner, social media post, final portfolio"
    ]
  },
  {
    id: "cd",
    title: "CorelDraw",
    duration: "2 Months",
    fees: "₹6,000",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop",
    description: "Design vector graphics, logos, and print materials. Professional tool for graphic designers.",
    content: [
      "Introduction to CorelDraw Workspace & Vector graphics",
      "Drawing basic shapes, lines, bezier tool, artistic media",
      "Working with color fills, outlines, interactive blends, drop shadows",
      "Typography: artistic text vs paragraph text control",
      "Arranging, aligning, grouping, welding & shaping vector objects",
      "Importing/Exporting file types: CDR, PDF, EPS, PNG, JPEG",
      "Creating professional logos, pamphlets, visiting cards, calendars",
      "Pre-press checks, resolution parameters for banner print shops"
    ]
  },
  {
    id: "illustrator",
    title: "Illustrator",
    duration: "2 Months",
    fees: "₹6,000",
    image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=600&auto=format&fit=crop",
    description: "Create high-quality vector designs and illustrations. Industry-standard tool for creative professionals.",
    content: [
      "Introduction to Adobe Illustrator Workspace & Vector graphics",
      "Pen tool, anchor points, shape builder, pathfinder controls",
      "Working with colors, gradients, custom swatches & patterns",
      "Typography: character panels, paragraph formatting, type-on-path",
      "Creating professional vector logos, icons & illustrations",
      "Using layers, asset exports, multiple artboards setups",
      "Advanced tools: perspective grid, live trace, mesh tool, 3D basic",
      "Preparing print-ready artwork (CMYK colors, bleeds, margins)",
      "Project work: brand guidelines, sticker sheet, social media ad layout"
    ]
  },
  {
    id: "ui-ux",
    title: "UI-UX Design",
    duration: "2 Months",
    fees: "₹15,000",
    image: "https://images.unsplash.com/photo-1541462608141-2ff01dd914c0?q=80&w=600&auto=format&fit=crop",
    description: "Design modern, user-friendly interfaces and experiences. Improve usability and customer satisfaction.",
    content: [
      "Introduction to User Experience (UX) and User Interfaces (UI)",
      "Design Principles: visual hierarchy, whitespace, grid layouts",
      "UX Research: user personas, card sorting, user journeys",
      "UI Design Tools: Figma interface, frames, vector shapes",
      "Creating Wireframes (Low-fidelity and High-fidelity designs)",
      "Interactive Prototyping: micro-interactions, smart animate",
      "Designing for Mobile Apps vs Responsive Web systems",
      "Usability testing, feedback incorporation, handoff files for coders",
      "Portfolio project creation and freelancing platform guidelines"
    ]
  },
  {
    id: "adex",
    title: "Advance Excel",
    duration: "2 Months",
    fees: "₹8,000",
    image: "https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=600&auto=format&fit=crop",
    description: "Master Advanced Excel with formulas, data analysis, dashboards, and automation tools.",
    content: [
      "Advanced lookup formulas (VLOOKUP, HLOOKUP, INDEX-MATCH, XLOOKUP)",
      "Logical functions (IF, AND, OR, NESTED IF, IFERROR)",
      "Text and Date-Time formulas (LEFT, RIGHT, MID, CONCAT, NETWORKDAYS)",
      "Data formatting, Sorting, Multi-level Filtering & Conditional Formatting",
      "Pivot Tables, Pivot Charts, Slicers & Timelines for analytics",
      "Designing interactive dashboards, key performance metrics (KPIs)",
      "Introduction to Macros and VBA for automated repetitive tasks",
      "Importing external files (CSV, SQL) & Data validation rules"
    ]
  }
];

export const SERVICES: ServiceDetail[] = [
  {
    id: "courses",
    title: "Computer Courses",
    icon: "💻",
    description: "Basic to advanced computer training for everyone.",
    content: "We provide professional-grade training across 30+ specialized courses from computer literacy (CCC) and accounting (Tally) to software engineering (C, C++, Java, Python) and cloud computing (AWS). Our curriculum is highly practical and oriented towards jobs and certifications."
  },
  {
    id: "ai",
    title: "AI Training",
    icon: "🤖",
    description: "Turn your ideas into intelligent solutions with AI.",
    content: "Get future-ready with our cutting-edge AI Training. Learn prompt engineering, ChatGPT workflows, content automation, graphic creation, CapCut AI, Canva AI, and local marketing automation to scale your productivity and business workflows."
  },
  {
    id: "cyber",
    title: "Cyber Security",
    icon: "🔐",
    description: "Think like a hacker, act like a defender.",
    content: "Master the skills needed to protect digital workspaces. Learn identity shielding, social media armor, mobile defenses, malware response, secure banking, network safety, and the legislative cyber laws of India to secure digital operations."
  },
  {
    id: "web",
    title: "Web Development Solutions",
    icon: "🌐",
    description: "Your website, your digital identity.",
    content: "We provide complete Web Development Solutions tailored to your business needs. Our team designs and develops modern, fast, and user-friendly websites that help you grow online.\n\nOur Services Include:\n• Custom Website Design & Development\n• Responsive (Mobile-Friendly) Layouts\n• E-commerce & Storefront Integrations\n• SEO-Optimized Codebase\n• Domain, Host Setup & Maintenance"
  },
  {
    id: "app",
    title: "App Development Solutions",
    icon: "📱",
    description: "Your app idea, our innovation.",
    content: "We offer complete Mobile App Development Solutions to help your business go digital and reach more customers. We build fast, secure, and user-friendly mobile applications for Android and iOS platforms.\n\nOur Services Include:\n• Native Android App Development\n• iOS Application Engineering\n• Flutter Cross-Platform Solutions\n• UI/UX Layouts and Assets Design\n• API Integrations & Bug Fixing"
  },
  {
    id: "camera",
    title: "Camera Installation",
    icon: "📷",
    description: "Your safety, our priority.",
    content: "We provide reliable and secure CCTV Camera Installation Services for homes, offices, shops, and industries. Our solutions help you monitor and protect your property 24/7.\n\nOur Services Include:\n• CCTV Camera Installation (Indoor & Outdoor)\n• HD Analog & IP Network Camera Setup\n• DVR/NVR Configurations & hard drive setups\n• Remote Mobile App Viewing Sync\n• Maintenance, Repairs & AMC packages"
  },
  {
    id: "amc",
    title: "AMC Services",
    icon: "🛠️",
    description: "We maintain, you stay worry-free.",
    content: "We provide reliable AMC (Annual Maintenance Contract) Services to ensure your systems run smoothly without any interruption. Our AMC plans help you maintain performance, reduce breakdowns, and increase the life of your equipment.\n\nOur Services Include:\n• Routine system checkups & diagnostic testing\n• IT Hardware & computer lab maintenance\n• Security camera and storage checkups\n• Quick response and emergency repairs"
  },
  {
    id: "aws",
    title: "AWS Certification Prep",
    icon: "☁️",
    description: "Build your future in the cloud.",
    content: "We provide complete guidance for AWS Certification with practical training and real-world scenarios.\n\nOur Training Includes:\n• AWS Cloud Fundamentals & Infrastructure\n• Key services: EC2, S3, IAM, RDS, Route 53\n• Hands-on Practical Labs and sandboxes\n• Solutions Architect and Developer Associate preparations"
  }
];

export const TEAM = [
  {
    name: "Mukesh Shah",
    role: "CEO & Founder",
    image: "/team/t1.png"
  },
  {
    name: "Kavita Shah",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Mehul Chavda",
    role: "Center Head",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Prarthvi Chauhan",
    role: "Computer Training Instructor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Ankit Thakor",
    role: "Office Staff",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
  }
];

export const TESTIMONIALS = [
  {
    text: "Best place to learn computer skills. Trainers are very supportive and provide personal attention to each student.",
    author: "Riya Patel",
    course: "Tally with GST Student"
  },
  {
    text: "I got a job immediately after completing my Advanced Financial Accounting course here. The practical teaching is excellent!",
    author: "Jay Shah",
    course: "Accounting Student"
  },
  {
    text: "The web development course was outstanding. Now I can build my own dynamic web applications. Highly recommended!",
    author: "Neha Patel",
    course: "Web Technologies Graduate"
  },
  {
    text: "Very practical teaching method. Topics are broken down into easy, bite-sized lessons. Highly supportive staff.",
    author: "Mehul Chavda",
    course: "Advanced Diploma Graduate"
  },
  {
    text: "Affordable fees and great computer labs. The timings are very flexible, making it easy for college students to attend.",
    author: "Pooja Sharma",
    course: "CCC Graduate"
  },
  {
    text: "Excellent AWS training. The labs are structured beautifully and helped me pass my Cloud Practitioner exam easily.",
    author: "Rahul Mehta",
    course: "AWS Student"
  }
];

export const ACHIEVEMENTS = [
  {
    target: "25000+",
    value: 25000,
    label: "Students Trained",
    prefix: "",
    suffix: "+"
  },
  {
    target: "60+",
    value: 60,
    label: "Courses Available",
    prefix: "",
    suffix: "+"
  },
  {
    target: "25",
    value: 25,
    label: "Years Experience",
    prefix: "",
    suffix: " Years"
  },
  {
    target: "100%",
    value: 100,
    label: "Success Rate (%)",
    prefix: "",
    suffix: "%"
  }
];
