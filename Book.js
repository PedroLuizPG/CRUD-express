//Define um esquema simples com título e autor

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // id: { type: Number, unique: true, required: true, required: true },
  title: String,
  author: String,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
