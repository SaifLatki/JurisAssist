# ⚖️ JurisAssist

> **AI-powered legal assistant** — Ask anything about law and get clear, instant answers.

![JurisAssist Banner](https://img.shields.io/badge/JurisAssist-AI%20Legal%20Assistant-00C2FF?style=for-the-badge&logo=scales&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 About

**JurisAssist** is a modern AI-powered legal chat assistant built with React and TypeScript on the frontend and a Node.js/Express backend. It allows users to ask legal questions in natural language and receive accurate, structured answers in real time.

Whether you need help understanding contracts, knowing your rights, or navigating legal procedures — JurisAssist makes legal knowledge accessible to everyone.

---

## ✨ Features

- 💬 **Real-time AI Chat** — Conversational interface powered by an AI backend
- 🧠 **Smart Responses** — Supports bold formatting and line breaks for structured legal answers
- ⌨️ **Typing Indicator** — Animated indicator while the AI is thinking
- 🕐 **Timestamps** — Every message shows the time it was sent
- ⚡ **Keyboard Shortcuts** — Press `Enter` to send, `Shift+Enter` for new line
- 📱 **Responsive Design** — Works beautifully on desktop and mobile
- 🌙 **Dark Theme** — Easy on the eyes for extended use
- 🔒 **Privacy First** — No messages are stored on the client

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| AI/LLM API | Legal response generation |

---

## 📁 Project Structure

```
jurisassist/
├── public/
│   ├── jurisIcon.svg          # App favicon (circular)
│   └── jurisIcon.jpg          # Original logo image
│
├── src/
│   ├── components/
│   │   └── LoadingSpinner.tsx  # Loading spinner component
│   │
│   ├── pages/
│   │   └── LegalChat.tsx       # Main chat page
│   │
│   ├── App.tsx                 # Root component & routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
│
├── backend/
│   ├── server.js               # Express server
│   ├── routes/
│   │   └── chat.js             # Chat API route
│   └── .env                    # Backend environment variables
│
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind configuration
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/jurisassist.git
cd jurisassist
```

---

### 2. Install Frontend Dependencies

```bash
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

### 4. Configure Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
AI_API_KEY=your_ai_api_key_here
```

> See [Environment Variables](#-environment-variables) for full details.

---

### 5. Start the Backend Server

```bash
cd backend
node server.js
```

The backend will run on `http://localhost:5000`

---

### 6. Start the Frontend Dev Server

Open a new terminal in the root folder:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔐 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `PORT` | Port the backend runs on (default: `5000`) | No |
| `AI_API_KEY` | Your AI provider API key | ✅ Yes |

---

## 📡 API Reference

### `POST /chat`

Send a message to the AI legal assistant.

**Request Body:**
```json
{
  "message": "What is a non-disclosure agreement?"
}
```

**Response:**
```json
{
  "reply": "A Non-Disclosure Agreement (NDA) is a legally binding contract..."
}
```

**Status Codes:**
| Code | Meaning |
|---|---|
| `200` | Success |
| `400` | Bad request — missing message field |
| `500` | Server error |

---

## 📸 Screenshots

> _Add screenshots of your app here_

| Chat Interface | Mobile View |
|---|---|
| ![Chat](screenshots/chat.png) | ![Mobile](screenshots/mobile.png) |

---

## 🗺 Roadmap

- [x] Basic AI chat functionality
- [x] Typing indicator
- [x] Message timestamps
- [x] Bold text & line break formatting
- [ ] Document upload & analysis (PDF support)
- [ ] Chat history & session persistence
- [ ] User authentication
- [ ] Multi-language support
- [ ] Voice input
- [ ] Export chat as PDF

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "Add: your feature description"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please make sure your code follows the existing style and passes linting before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---



<div align="center">
  <p>Made with ❤️ for accessible legal knowledge</p>
  <p>⚖️ <strong>JurisAssist</strong> — Law, simplified.</p>
</div>
