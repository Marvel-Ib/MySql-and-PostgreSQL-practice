const express = require("express");
const router = express.Router();
const db = require("../models");

//get all todos
router.get("/all", (req, res) => {
  db.Todo.findAll().then((todos) => res.send(todos));
});

//get single todo by id
router.get("/find/:id", (req, res) => {
  db.Todo.findAll({
    where: {
      id: req.params.id,
    },
  }).then((todo) => res.send(todo));
});

//post new todo
router.post("/new", (req, res) => {
  db.Todo.create({
    text: req.body.text,
  }).then((submittedTodo) => res.status(201).send(submittedTodo));
});

//delete todo
router.delete("/delete/:id", (req, res) => {
  db.Todo.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.send("uc");
  });
});

//edit a todo
router.put("/edit", (req, res) => {
  db.update(
    { text: req.body.text },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(() => {
    res.send("success");
  });
});

module.exports = router;
