const express = require("express");
const router = express.Router();

const todoController = require("../controller/todoController");
// router.route("/completed").get(todoController.getDoneTodos);
router
  .route("/")
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);
router
  .route("/:id")
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);
module.exports = router;
