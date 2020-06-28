const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

//ROUTES

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (e) {
    console.error(e.message);
  }
});
//get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);
    res.json(todo.rows);
  } catch (e) {
    console.error(e.message);
  }
});
//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1)  RETURNING *",
      [description]
    );

    res.json(newTodo["rows"]);
  } catch (e) {
    console.error(e.message);
  }
});

//update a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { description } = req.body; //SET

    const updateTodo = await pool.query(
      `UPDATE todo SET description = $1 WHERE todo_id = $2`,
      [description, id]
    );
    res.json("omo was updated ");
  } catch (e) {}
});
//
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
  } catch (e) {}
});
app.listen(5000, () => {
  console.log(`servr is listening `);
});
