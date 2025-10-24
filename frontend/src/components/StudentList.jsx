import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../api";

export default function StudentList({ refresh }) {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, [refresh]);

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3">Lista de Estudiantes</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre completo</th>
            <th>Email</th>
            <th>Fecha de inscripción</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.enrollmentDate?.slice(0, 10)}</td>
              <td>{s.active ? "✅" : "❌"}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    deleteStudent(s.id);
                    loadStudents();
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}