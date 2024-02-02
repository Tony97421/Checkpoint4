const AbstractManager = require("./AbstractManager");

class SujetForumManager extends AbstractManager {
  constructor() {
    super({ table: "SujetsForum" });
  }

  async create({ titreSujet, auteurId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (titreSujet, auteurId) VALUES (?, ?)`,
      [titreSujet, auteurId]
    );

    const createdId = result.insertId;
    return { sujetId: createdId, titreSujet, auteurId };
  }

  async update({ titreSujet, auteurId, sujetId }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET titreSujet=?, auteurId=? WHERE sujetId=?`,
      [titreSujet, auteurId, sujetId]
    );

    return result.affectedRows;
  }

  async read(sujetId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE sujetId = ?`,
      [sujetId]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async delete(sujetId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE sujetId = ?`,
      [sujetId]
    );

    return result.affectedRows;
  }

  async deleteByUserId(auteurId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE auteurId = ?`,
      [auteurId]
    );

    return result.affectedRows;
  }
}

module.exports = SujetForumManager;
