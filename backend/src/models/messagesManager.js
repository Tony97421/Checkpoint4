const AbstractManager = require("./AbstractManager");

class messageManager extends AbstractManager {
  constructor() {
    super({ table: "Messages" });
  }

  async create({ contenuMessage, utilisateurId, sujetId, categorie, titre }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (contenuMessage, utilisateurId, sujetId, categorie, titre) VALUES (?, ?, ?, ?, ?)`,
      [contenuMessage, utilisateurId, sujetId, categorie, titre]
    );

    return result;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readByCategorie(categorie) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE categorie = ?`,
      [categorie]
    );

    return rows;
  }

  async update({
    contenuMessage,
    utilisateurId,
    sujetId,
    id,
    categorie,
    titre,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET contenuMessage=?, utilisateurId=?, sujetId=?, categorie=?, titre=? WHERE id=?`,
      [contenuMessage, utilisateurId, sujetId, id, categorie, titre]
    );

    return result;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows;
  }
}

module.exports = messageManager;
