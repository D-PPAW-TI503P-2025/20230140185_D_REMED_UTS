const { Book, BorrowLog } = require("../models");

exports.borrowBook = async (req, res) => {
  const { bookId, latitude, longitude } = req.body;
  const userId = req.headers["x-user-id"];

  const book = await Book.findByPk(bookId);
  if (!book || book.stock < 1)
    return res.status(400).json({ message: "Book not available" });

  book.stock -= 1;
  await book.save();

  const log = await BorrowLog.create({
    userId,
    bookId,
    latitude,
    longitude,
  });

  res.json({ message: "Book borrowed", log });
};
