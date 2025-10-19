import { useState, useEffect } from "react";

export default function StudentForm({ onSubmit, editStudent, onUpdate }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    active: true,
  });

  useEffect(() => {
    if (editStudent) setForm(editStudent);
  }, [editStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStudent) onUpdate(editStudent._id, form);
    else onSubmit(form);
    setForm({ firstName: "", lastName: "", email: "", active: true });
  };

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Nombre"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Apellido"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Correo"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            name="active"
            value={form.active}
            onChange={handleChange}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary mt-3">
        {editStudent ? "Actualizar" : "Registrar"}
      </button>
    </form>
  );
}