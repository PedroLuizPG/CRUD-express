const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./Book");


//Conectando ao banco dados
const uri = "mongodb+srv://pedro:pedrinho123@pedro-teste.ub1jo.mongodb.net/";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hellor world");
});

//criar um livro
app.post("/books", async (req, res) => {
  let book = new Book({ title: req.body.title, author: req.body.author });
  book = await book.save();
  res.send(book);
});

//Pegar todos os livros
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Pegar um único livro
app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Livro não encontrado");
  res.send(book);
});

//Atualizar o livro
app.put("/books/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, author: req.body.author },
    { new: true }
  );
  if (!book) return res.status(404).send("Livro não encontrado");

  res.status(202).send(book);
});

//Deletar o livro
app.delete("/books/:id", async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).send("Livro não encontrado");
  }
  res.status(204).send();
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
