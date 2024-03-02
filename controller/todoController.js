const Todo = require("../modals/todoModal");
exports.getAllTodos = async (req, res) => {
  try {
    //FILTERING
    let queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let query = Todo.find(queryObj); //it can accept bunch of json in arrays at once
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join("");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //EXECUTING
    const todos = await query;
    res.status(200).json({ status: "success", todos });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({ status: "success", newTodo });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json({ status: "success", todo });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "success", updatedTodo });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "message", data: null });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
// exports.getDoneTodos = async (req, res) => {
//   try {
//     const doneTodo = await Todo.aggregate([
//       {
//         //STAGE 1:
//         $match: { done: { $ne: "false" } },
//       },
//       {
//         $group: {
//           _id: "$done",
//           totalCompletedTodos: { $sum: { done: "true" } },
//         },
//       },
//       {
//         $sort: { createdAt: 1 },
//       },
//     ]);
//     console.log(doneTodo);
//     res
//       .status(200)
//       .json({ status: "success", results: doneTodo.length, data: doneTodo });
//   } catch (err) {
//     res.status(400).json({ status: "fail", message: `${err}` });
//   }
// };
