import { pool } from "../db/connection.js";

// Registrar un nuevo estudiante
export const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Validar que el email no se repita
    const [exists] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);
    if (exists.length > 0)
      return res.status(400).json({ message: "El email ya está registrado" });

    const [result] = await pool.query(
      "INSERT INTO students (firstName, lastName, email) VALUES (?, ?, ?)",
      [firstName, lastName, email]
    );

    res.status(201).json({ id: result.insertId, firstName, lastName, email, active: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos los estudiantes
export const getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar estudiante
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, active } = req.body;

    await pool.query(
      "UPDATE students SET firstName=?, lastName=?, email=?, active=? WHERE id=?",
      [firstName, lastName, email, active, id]
    );

    res.json({ message: "Estudiante actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar estudiante
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM students WHERE id = ?", [id]);
    res.json({ message: "Estudiante eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
