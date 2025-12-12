const mongoose = require("mongoose");

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
    }
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
