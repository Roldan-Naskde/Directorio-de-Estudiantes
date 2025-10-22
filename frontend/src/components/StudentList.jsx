import "./StudentList.css";

export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Activo</th>
                <th>Dirección</th>
                <th>Celular</th>
                <th>Semestre</th>
                <th>Carrera</th>
            </tr>
            </thead>
            <tbody>
            {students.map((s) => (
                <tr key={s._id}>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td>{s.email}</td>
                <td>{s.active ? "✅" : "❌"}</td>
                <td>{s.address}</td>
                <td>{s.phone}</td>
                <td>{s.semester}</td>
                <td>{s.career}</td>
                <td className="text-center">
                    <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(s)}
                    title="Editar"
                    >
                    ✏
                    </button>
                    <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(s._id)}
                    title="Eliminar"
                    >
                    🗑
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
      </table>
    </div>
  );
}
