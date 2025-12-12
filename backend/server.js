require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN}));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));




const Expense = require("./models/Expense");


app.get("/", (req, res) => {
  res.json({
    message: "FocusTools API",
    status: "Running",
    endpoints: {
      expenses: "/api/expenses",
    },
  });
});


app.post("/api/expenses", async (req, res) => {
  try {
    
    const newExpense = new Expense(req.body);

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
          totalAmount: { $round: ["$totalAmount", 2] }
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

app.listen(PORT)
