const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    let { categorie } = req.params;
    categorie = categorie.toLowerCase();
    const messages = await tables.Messages.readByCategorie(categorie);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const message = await tables.Messages.read(req.params.id);
    if (message == null) {
      res.sendStatus(404);
    } else {
      res.json(message);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { contenuMessage, id, sujetId, categorie, titre } = req.body;
    const newMessage = await tables.Messages.create({
      contenuMessage,
      id,
      sujetId,
      categorie,
      titre,
    });
    if (!newMessage) {
      res.status(400).json({ message: "Error creating message" });
    } else {
      res.status(201).json(newMessage);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  req.body.id = id;

  try {
    const result = await tables.Messages.update(req.body);
    if (result) {
      res.json(result);
      res.status(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.Messages.delete(req.params.id);
    if (result) {
      res.json(result);
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
