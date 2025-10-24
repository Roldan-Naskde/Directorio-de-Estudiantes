import { useState } from "react";
import { createStudent } from "../api";

export default function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    enrollmentDate: "",
    active: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStudent(form);
    onStudentAdded();
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      enrollmentDate: "",
      active: true,
    });
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h5 className="mb-3">Registrar nuevo estudiante</h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              name="firstName"
              className="form-control"
              placeholder="Nombre"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              name="lastName"
              className="form-control"
              placeholder="Apellido"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              name="enrollmentDate"
              className="form-control"
              value={form.enrollmentDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100 mt-3">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
}