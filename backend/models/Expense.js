const mongoose = require("mongoose");

// TODO: Define your Task schema here
const expenseSchema = new mongoose.Schema(
  {
     title: {
      type: String,
      required: true, 
      trim: true, 
    },
    type: {
      type: String,
      required: true, 
      trim: true, 
    },
    amount: {
      type: Number,
      required: true, 
      trim: true, 
    },
    dueDate: {
    type: Date,
    required: true
  }
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
