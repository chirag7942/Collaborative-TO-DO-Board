import Log from "../models/Log.js";

// Get latest 20 logs
export const getRecentLogs = async (req, res) => {

  try {
    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .populate("userId", "name")
      .populate("taskId", "title");

    res.json(logs);
  } 
  
  catch (error) {
    res.status(500).json({ message: "Failed to fetch logs", error });
  }
};
