export default function StudentList({ students, onEdit, onDelete }) {
    return (
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>
              <td>{s.active ? "✅" : "❌"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(s)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(s._id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }