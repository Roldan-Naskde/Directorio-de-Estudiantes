import { useState, useEffect } from "react";
import "./StudentForm.css";


export default function StudentForm({ onSubmit, editStudent, onUpdate }) {
  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phone: "",
  semester: 1,
  career: "",
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
    if (editStudent) {
      onUpdate(editStudent._id, form);
    } else {
      onSubmit(form);
    }
    setForm({ firstName: "", lastName: "", email: "", active: true });
  };

  const careers = [
  "Ing. de Software con IA",
  "Contabilidad",
  "Electrónica",
  "Diseño Gráfico",
  "Mecánica Automotriz",
  "Gastronomía",
  "Marketing Digital",
  ];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">{editStudent ? "Editar Estudiante" : "Registrar Estudiante"}</h5>
        <form onSubmit={handleSubmit}>
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
            <div className="col-md-6">
                <input
                    className="form-control"
                    placeholder="Dirección"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="col-md-6">
                <input
                    className="form-control"
                    placeholder="Celular"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="col-md-6">
                <select
                    className="form-select"
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                        Semestre {num}
                    </option>
                    ))}
                </select>
                </div>
                <div className="col-md-6">
                <select
                    className="form-select"
                    name="career"
                    value={form.career}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione carrera</option>
                    {careers.map((c) => (
                    <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                </div>

          </div>
          <button className="btn btn-primary mt-3 w-100">
            {editStudent ? "Actualizar" : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
