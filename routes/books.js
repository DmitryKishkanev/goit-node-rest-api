import express from "express";

import books from "../services/books/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await books.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
