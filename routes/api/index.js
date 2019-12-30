const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./user");
const workerRoutes = require("./worker");

// /api/book routes
router.use("/books", bookRoutes);

// /api/user routes
router.use("/user", userRoutes);

// /api/worker routes
router.use("/worker", workerRoutes);

module.exports = router;
