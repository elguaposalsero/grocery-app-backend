const express = require("express");
const app = express();
const query = require("./db/index");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

app.use(bodyParser.json());

app.get("/groceries", (req, res) => {
  query("select * from groceries").then((result) => {
    res.send(result.rows);
  });
});

app.post("/groceries", (req, res) => {
  const { groceryItem } = req.body;
  query("insert into groceries (item_name) values ($1)", [groceryItem])
    .then((result) => {
      res.status(201).send(groceryItem);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

app.delete("/grocery/:id", (req, res) => {
  const id = req.params.id;
  query("delete from groceries where id=$1", [id])
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

app.put("/grocery/:id/purchased", (req, res) => {
  const id = req.params.id;
  query("UPDATE groceries SET purchased = NOT purchased WHERE id = $1", [id])
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

app.put("/grocery/:id/name", (req, res) => {
  const id = req.params.id;
  const newName = req.body.newName;
  query("UPDATE groceries SET item_name = $1 WHERE id = $2", [newName, id])
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

module.exports = app;
