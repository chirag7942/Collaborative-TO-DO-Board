# Project Overview

** This is a real-time collaborative to-do board application built using the MERN stack. It allows multiple users to register, log in, and manage tasks on a shared Kanban board. Tasks can be dragged and dropped between columns (Todo, In Progress, Done), and updates are synced in real-time across all connected users using Socket.IO.

** The application includes advanced features such as Smart Assign, which automatically assigns tasks to the user with the fewest active tasks, and Conflict Handling, which detects simultaneous edits and prompts users to resolve them. Additionally, the system logs all actions (create, update, delete, assign) and displays the most recent 20 actions in a live-updating activity log panel.


# Tech Stack Used

** Frontend

=> React (without UI libraries)
=> React DnD for drag-and-drop
=> Socket.IO Client for real-time updates
=> Axios for API communication

** Backend

=> Node.js
=> Express.js
=> MongoDB with Mongoose
=> Socket.IO for WebSocket communication
=> JWT for authentication
=> bcrypt for password hashing

** Other Tools

=> Vercel (for frontend deployment)
=> Render (for backend deployment)
=> MongoDB Atlas (for cloud database)


# Setup and Installation Instructions

Follow these steps to run the project locally:

** Backend

1. Go to the backend folder:

In bash,

cd backend
npm init
Install dependencies

2. Create a .env file in the backend folder with:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

3. Start the backend server:

npm run dev

** Frontend

1. Go to the frontend folder:

In bash,
cd frontend
Install dependencies.

2. Start the frontend:

npm start