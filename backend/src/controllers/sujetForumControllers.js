const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const sujets = await tables.SujetsForum.readAll();
    res.json(sujets);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const sujet = await tables.SujetsForum.read(req.params.id);
    if (sujet == null) {
      res.sendStatus(404);
    } else {
      res.json(sujet);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { titreSujet, auteurId } = req.body;
    const newSujet = await tables.SujetsForum.create({
      titreSujet,
      auteurId,
    });
    if (!newSujet) {
      res.status(400).json({ message: "Error creating" });
    } else {
      res.status(201).json(newSujet);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  req.body.sujetId = id;

  try {
    const result = await tables.SujetsForum.update(req.body);
    if (result > 0) {
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
    const result = await tables.SujetsForum.delete(req.params.id);
    if (result > 0) {
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
