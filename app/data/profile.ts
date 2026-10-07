export const profile = {
  name: "Ashraf Dalal",
  tagline:
    "Full stack dev shipping real products for real users. React, Node, Express and databases, all on lock.",
  email: "dalalashraf456@gmail.com",
  location: "Mumbai, India",
  github: "https://github.com/ashh790",
  linkedin: "https://linkedin.com/in/ashrafdalal",
  cv: "/Ashraf_Dalal_Resume.pdf",
  summary:
    "Yo, I'm Ashraf 👋 Full stack dev who actually ships. Right now I'm at MCM Pvt Limited, working on a live UCaaS platform across the frontend, backend and database, with React.js, Node.js, Express.js and PostgreSQL. Before that I was a web dev intern at Sheetal Enterprises, building responsive, mobile-first sites for 3+ production websites. I also built an AI mock interview app with JWT auth and REST APIs. Always learning, always shipping. 🚀",
  skills: [
    { label: "React.js", icon: "react" },
    { label: "Node.js", icon: "node" },
    { label: "Express.js", icon: "server" },
    { label: "JavaScript", icon: "js" },
    { label: "PostgreSQL", icon: "database" },
    { label: "MongoDB", icon: "database" },
  ],
  projects: [
    {
      name: "AI Mock Interview Platform",
      stack: "React.js | TypeScript | Node.js | Express.js | MongoDB",
      image: "/projects/ai-mock-interview.png",
      link: "https://fearoutaii.vercel.app/",
      repo: "",
      points: [
        "Full-stack platform that generates role-specific interview questions and provides AI feedback.",
        "Implemented JWT-based authentication and REST APIs for registration, login, sessions, and history.",
        "Designed MongoDB schemas and a modular Express.js backend.",
      ],
    },
    {
      name: "HealthCare Pro",
      stack: "React.js | Node.js | Express.js | SQLite | Socket.io",
      image: "/projects/healthcare-pro.png",
      link: "https://healthcare-pro-neon.vercel.app/",
      repo: "",
      points: [
        "Hospital management platform where a hospital runs patient booking, video consultations, billing, wards, medicines, and reports in one place.",
        "Patients book appointments, join Jitsi video visits, and chat with doctors; doctors write notes and prescriptions, and staff handle admin work by role.",
        "Real-time notifications with Socket.io, online payments with Razorpay, and automated email/WhatsApp reminders.",
        "PDFKit generates prescriptions and reports; data is stored in SQLite.",
      ],
    },
  ],
  services: [
    { title: "Frontend Development", text: "Building responsive, component-based interfaces with React.js, Hooks, and React Router.", icon: "laptop" },
    { title: "Backend & APIs", text: "Designing modular Node.js and Express.js services with RESTful endpoints.", icon: "server" },
    { title: "Database Design", text: "Modeling and optimizing PostgreSQL and MongoDB schemas for real production workloads.", icon: "database" },
    { title: "Authentication", text: "Implementing secure login, JWT authentication, and session management.", icon: "lock" },
    { title: "Responsive Design", text: "Mobile-first layouts that work smoothly across devices, screen sizes, and browsers.", icon: "mobile" },
    { title: "Deployment & Debugging", text: "Shipping features to production, debugging issues, and coordinating code reviews with the team.", icon: "rocket" },
  ],
};
