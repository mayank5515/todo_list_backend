const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    unique: [true, "Todo must be unique"],
    required: [true, "Todo must have a todo"],
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// todoSchema.aggregate([
//   //STAGE 1
//   { $match: "$createdAt" },
// ]);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
