import Task from "../models/Task.js";

// Handle all socket events
export const socketHandler = (socket, io) => {
  console.log("Client connected:", socket.id);

  // Join room per user or global if needed
  socket.on("join", (room) => {
    socket.join(room);
  });

  // Broadcast task updates
  socket.on("task:update", (task) => {
    socket.broadcast.emit("task:updated", task);
  });

  socket.on("task:create", (task) => {
    socket.broadcast.emit("task:created", task);
  });

  socket.on("task:delete", (taskId) => {
    socket.broadcast.emit("task:deleted", taskId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
};
