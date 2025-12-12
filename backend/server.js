require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

// Import models

const Session = require("./models/Session");
const Expense = require("./models/Expense");

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "FocusTools API",
    status: "Running",
    endpoints: {
      expenses: "/api/expenses",
      sessions: "/api/sessions",
    },
  });
});


app.post("/api/expenses", async (req, res) => {
  try {
    
    const newExpense = new Expense(req.body);

    // Save to database
    const savedExpense = await newExpense.save();

    
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



app.get("/api/expenses", async (req, res) => {
  try {
    const expense = await Expense.find();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/expenses/totals", async (req, res) => {
  try {
    const totals = await Expense.aggregate([
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          totalAmount: 1
        }
      }
    ]);

    res.json(totals);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error calculating totals");
  }
});

app.get("/api/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/api/expense/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true, 
        runValidators: true, 
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.delete("/api/expense/:id", async (req, res) => {
  try {
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deleteExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted successfully",
      Expense: deleteExpense,
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
    const sessions = await Session.find().populate('expenseId');
    
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
