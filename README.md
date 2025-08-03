# Streamify 🎧💬

Streamify is a full-stack real-time chat application built with React, Node.js, MongoDB, and the Stream Chat API. It offers user authentication, friend requests, 1:1 messaging, and integrated video calls — all wrapped in a modern and responsive UI.

## 🚀 Features

- 🔐 User Authentication (JWT + Cookies)
- 👥 Friend Request System
- 💬 Real-Time Messaging (Stream Chat)
- 📹 Video Call Integration
- 🌗 Light & Dark Theme Switch
- ⚙️ Onboarding & User Profiles
- 📱 Responsive UI across devices

## 🛠️ Tech Stack

- Frontend: React, TailwindCSS, Vite, Zustand, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Real-time Messaging: Stream Chat API
- Video Calling: PeerJS / WebRTC
- Authentication: JWT + Cookies

## 📦 Folder Structure

/Streamify
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── lib/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── lib/
│ │ └── store/
└── .env


## 🔧 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/streamify.git
cd streamify
Set up environment variables:

Create a .env file in both frontend and backend directories:

📁 backend/.env

PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET_KEY=your_jwt_secret
STEAMIFY_API_KEY=your_stream_api_key
STEAMIFY_API_SECRET=your_stream_api_secret
📁 frontend/.env

VITE_STREAM_API_KEY=your_stream_api_key
VITE_BACKEND_URL=http://localhost:5001/api
Install dependencies:

Frontend:

bash
cd frontend
npm install
Backend:

bash
cd ../backend
npm install
Start the development servers:

Backend:

bash
npm run dev
Frontend (in a separate terminal):

bash
npm run dev
Access the app:

Open your browser at http://localhost:5173

🚀 Deployment
This project can be deployed to Render:

Frontend: Vite app (static site)

Backend: Node.js web service

MongoDB: Use Render's MongoDB or MongoDB Atlas

Be sure to update environment variables in the Render dashboard.

🧠 Future Enhancements
Group Chats

Notification System

Typing Indicators

Read Receipts

Message Reactions

🤝 Contributing
Contributions are welcome! Feel free to submit pull requests or open issues for suggestions and bug fixes.

Made with ❤️ by Anurag Singh
