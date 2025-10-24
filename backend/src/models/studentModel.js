import db from "../config/db.js";

export const Student = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM students");
    return rows;
  },

  async getByEmail(email) {
    const [rows] = await db.query("SELECT * FROM students WHERE email = ?", [email]);
    return rows[0];
  },

  async create({ firstName, lastName, email, enrollmentDate, active }) {
    const [result] = await db.query(
      "INSERT INTO students (firstName, lastName, email, enrollmentDate, active) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, enrollmentDate, active]
    );
    return result.insertId;
  },

  async update(id, { firstName, lastName, email, active }) {
    const [result] = await db.query(
      "UPDATE students SET firstName=?, lastName=?, email=?, active=? WHERE id=?",
      [firstName, lastName, email, active, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);
    return result.affectedRows;
  },
};
