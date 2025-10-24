import { Student } from "../models/studentModel.js";

export const studentController = {
  async getAll(req, res) {
    try {
      const students = await Student.getAll();
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: "Error al listar estudiantes" });
    }
  },

  async create(req, res) {
    try {
      const { firstName, lastName, email, enrollmentDate, active } = req.body;

      // Validar email único
      const existing = await Student.getByEmail(email);
      if (existing) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      const id = await Student.create({ firstName, lastName, email, enrollmentDate, active });
      res.status(201).json({ id, message: "Estudiante registrado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al registrar estudiante" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, active } = req.body;

      const result = await Student.update(id, { firstName, lastName, email, active });
      if (result === 0) return res.status(404).json({ message: "Estudiante no encontrado" });

      res.json({ message: "Estudiante actualizado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar estudiante" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await Student.delete(id);
      if (result === 0) return res.status(404).json({ message: "Estudiante no encontrado" });

      res.json({ message: "Estudiante eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar estudiante" });
    }
  },
};
