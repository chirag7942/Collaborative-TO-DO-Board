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


# Features List and Usage Guide

1. User Registration and Login
Users can sign up and log in securely using JWT-based authentication.

2. Kanban Board
Tasks are displayed in three columns: Todo, In Progress, and Done. Users can drag and drop tasks between columns.

3. Real-Time Collaboration
All changes made by any user are instantly reflected on all connected clients using Socket.IO.

4. Task Management
Users can create, edit, delete, and assign tasks. Each task includes a title, description, status, priority, and assigned user.

5. Smart Assign
A special button that automatically assigns a task to the user with the fewest current tasks.

6. Conflict Handling
If two users try to edit the same task at the same time, the app detects the conflict and prompts users to resolve it by merging or overwriting changes.

7. Activity Log
The app logs all major actions (add, update, delete, assign) and shows the latest 20 in a live activity panel.

8. Responsive Design
The UI is responsive and works on both desktop and mobile screens.


# Smart Assign and Conflict Handling Logic

** Smart Assign

The Smart Assign feature ensures tasks are distributed fairly among users. When a user clicks the "Smart Assign" button on a task:

=> The system fetches all users.

=> It counts how many active (incomplete) tasks each user has.

=> The task is automatically assigned to the user with the fewest current tasks.

=> This logic promotes balanced task allocation and reduces overload.

** Conflict Handling

Conflict Handling helps prevent accidental overwrites when two users edit the same task at the same time:

Each task update request includes the task’s last updatedAt timestamp.

The backend compares this with the current version in the database.

If there's a mismatch, it returns a 409 Conflict response along with the latest server version.

The frontend then prompts the user with options to:

=> Overwrite the task

=> Merge changes manually

=> Cancel the update

This ensures smooth collaboration and avoids data loss due to simultaneous edits.


# Link to Deployed App and Demo Video

Live App: https://your-app-url.vercel.app

Demo Video: https://your-demo-video-link

