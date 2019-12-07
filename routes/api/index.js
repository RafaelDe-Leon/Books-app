const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./user");

// Book routes
router.use("/books", bookRoutes);

// login routes
router.use("/user", userRoutes);

module.exports = router;
