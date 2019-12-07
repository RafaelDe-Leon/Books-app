const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./user");

// /api/book routes
router.use("/books", bookRoutes);

// /api/user routes
router.use("/user", userRoutes);

module.exports = router;
