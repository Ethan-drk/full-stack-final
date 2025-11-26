require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

// Import models
const Task = require("./models/Task");
const Session = require("./models/Session");

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "FocusTools API",
    status: "Running",
    endpoints: {
      tasks: "/api/tasks",
      sessions: "/api/sessions",
    },
  });
});


app.post("/api/tasks", async (req, res) => {
  try {
    
    const newTask = new Task(req.body);

    // Save to database
    const savedTask = await newTask.save();

    
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true, 
        runValidators: true, 
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      Task: deletedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/api/sessions", async (req, res) => {
  try {
    
    const newSession = new Session(req.body);

    // Save to database
    const savedSession = await newSession.save();

    
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



app.get("/api/sessions", async (req, res) => {
  try {
    const sessions = await Session.find().populate('taskId');
    
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/sessions/:id", async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/api/sessions/:id", async (req, res) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true, 
        runValidators: true, 
      }
    );

    if (!updatedSession) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json(updatedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.delete("/api/sessions/:id", async (req, res) => {
  try {
    const deletedSession = await Session.findByIdAndDelete(req.params.id);

    if (!deletedSession) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json({
      message: "Session deleted successfully",
      Session: deletedSession,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




app.listen(PORT)
