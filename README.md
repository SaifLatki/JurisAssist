<div align="center">

<img src="https://img.shields.io/badge/JurisAssist-AI%20Legal%20Assistant-534AB7?style=for-the-badge&logo=scales&logoColor=white" alt="JurisAssist" />

# ⚖️ JurisAssist
### *Making Legal Language Simple & Accessible*

> Upload contracts, agreements, or policies — get instant AI-powered summaries, risk alerts, and plain-language explanations.

[![React](https://img.shields.io/badge/React.js-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Document Summaries** | Upload PDFs, DOCX, or text files and receive simplified, plain-language summaries |
| 🚨 **Risk Detection & Clause Analysis** | Automatically identifies risky or unusual clauses and highlights them |
| 🔐 **JWT Authentication** | Secure token-based login/register system protecting all user data |
| 📱 **Responsive Modern UI** | Clean, professional interface built with React + Tailwind CSS |
| 👨‍⚖️ **Lawyer Directory** *(optional)* | Browse verified lawyer profiles and connect with professionals |
| ⚡ **Scalable MERN Backend** | Node.js + Express + MongoDB architecture built for production |

---

## 🛠️ Tech Stack

### Frontend
```
React.js    •    Tailwind CSS    •    React Router    •    Axios
```

### Backend
```
Node.js    •    Express.js    •    MongoDB (Mongoose)    •    JWT
```

### AI & Utilities
```
OpenAI API    •    Multer (file uploads)    •    PDF Parser
```

### Dev Tools
```
Git    •    GitHub    •    Postman    •    VS Code
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/jurisassist.git
cd jurisassist
```

### 2️⃣ Install Dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `/server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### 4️⃣ Run the Application

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm start
```

The app will be running at `http://localhost:3000` 🚀

---

## 📁 Project Structure

```
jurisassist/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level pages
│   │   ├── context/         # Auth & global state
│   │   └── utils/           # Axios config, helpers
│   └── public/
│
├── server/                  # Node.js backend
│   ├── controllers/         # Route logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   ├── middleware/          # JWT auth middleware
│   └── utils/               # File parsing, AI helpers
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login & receive JWT token |
| `POST` | `/api/documents/upload` | Upload & analyze a document |
| `GET` | `/api/documents/:id` | Get document summary & risk report |
| `GET` | `/api/lawyers` | Browse lawyer directory |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **[Saifullah Latki](https://github.com/your-username)**

⭐ Star this repo if you found it helpful!

</div>
