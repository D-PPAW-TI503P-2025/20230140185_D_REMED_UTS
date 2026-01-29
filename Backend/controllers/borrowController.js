const { Book, BorrowLog } = require("../models");

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, latitude, longitude } = req.body;
    const userId = parseInt(req.headers["x-user-id"]) || 1; // Default to ID 1 if invalid

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
  } catch (err) {
    console.error("Borrow error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
