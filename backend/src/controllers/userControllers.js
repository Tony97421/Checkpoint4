const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.Utilisateurs.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browse = async (req, res, next) => {
  try {
    const users = await tables.Utilisateurs.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { pseudo, email, hashedPassword } = req.body;
    const existingUser = await tables.Utilisateurs.readByPseudo(pseudo);

    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const newUser = await tables.Utilisateurs.create({
      pseudo,
      email,
      hashedPassword,
    });
    if (!newUser) {
      res.status(400).json({ message: "Error creating" });
    } else {
      res.status(201).json({ user: newUser });
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const { pseudo, email } = req.body;

  try {
    const result = await tables.Utilisateurs.update({ pseudo, email, id });
    if (result > 0) {
      // Check if any rows were affected
      res.status(200).json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.SujetsForum.deleteByUserId(req.params.id);
    const result = await tables.Utilisateurs.delete(req.params.id);
    if (result) {
      // Check if any rows were affected
      res.status(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
};
