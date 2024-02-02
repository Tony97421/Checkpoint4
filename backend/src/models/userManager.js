const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "Utilisateurs" });
  }

  async create({ pseudo, email, hashedPassword }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, hashed_password) VALUES (?, ?, ?)`,
      [pseudo, email, hashedPassword]
    );

    const createdId = result.insertId;

    return { id: createdId, pseudo, email, hashedPassword };
  }

  async update({ pseudo, email, id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo=?, email=? WHERE id=?`,
      [pseudo, email, id]
    );

    return result.affectedRows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
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

    return rows.affectedRows;
  }

  async readByPseudo(pseudo) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ?`,
      [pseudo]
    );

    return result[0];
  }
}

module.exports = UserManager;
