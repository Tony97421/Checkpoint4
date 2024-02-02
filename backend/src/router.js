const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
// const itemControllers = require("./controllers/itemControllers");
const { hashPassword } = require("./services/auth");
const userControllers = require("./controllers/userControllers");
const sujetForumControllers = require("./controllers/sujetForumControllers");
const messageControllers = require("./controllers/messagesControllers");
const authControllers = require("./controllers/authControllers");

// Route to get a list of items
// router.get("/items", itemControllers.browse);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/sujets-forum", sujetForumControllers.browse);
router.get("/sujets-forum/:id", sujetForumControllers.read);
router.get("/messages", messageControllers.browse);
router.get("/messages/:id", messageControllers.read);
router.get("/messages/categorie/:categorie", messageControllers.browse);

router.put("/users/:id", userControllers.edit);
router.put("/sujets-forum/:id", sujetForumControllers.edit);
router.put("/messages/:id", messageControllers.edit);

// Route to get a specific item by ID
// router.get("/items/:id", itemControllers.read);

// Route to add a new item
// router.post("/items", itemControllers.add);
router.post("/login", authControllers.login);
router.post("/users", hashPassword, userControllers.add);
router.post("/sujets-forum", sujetForumControllers.add);
router.post("/messages", messageControllers.add);

router.delete("/users/:id", userControllers.destroy);
router.delete("/sujets-forum/:id", sujetForumControllers.destroy);
router.delete("/messages/:id", messageControllers.destroy);

/* ************************************************************************* */
module.exports = router;
