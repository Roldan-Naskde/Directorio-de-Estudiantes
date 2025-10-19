import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    enrollmentDate: '',
    active: true,
  });
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'edit' or 'delete'
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación de email único y formato
  const isEmailUnique = (email) => {
    return !students.some(student => student.email === email);
  };

  const isValidEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmailFormat(newStudent.email)) {
      setEmailError('El email no tiene un formato válido');
      return;
    }
    if (!isEmailUnique(newStudent.email)) {
      setEmailError('Este email ya está registrado');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setStudents((prev) => [
        ...prev,
        {
          ...newStudent,
          id: Date.now(),
          enrollmentDate: new Date().toLocaleDateString(),
        },
      ]);
      setNewStudent({
        firstName: '',
        lastName: '',
        email: '',
        enrollmentDate: '',
        active: true,
      });
      setEmailError('');
      setLoading(false);
    }, 1000); // Simulando carga
  };

  const handleUpdate = (id, field, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const handleDelete = () => {
    setStudents((prev) => prev.filter((student) => student.id !== selectedStudent.id));
    setShowModal(false);
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setModalType('delete');
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setModalType('edit');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="container">
      <h1>Registro de Estudiantes Senatinos</h1>

      <div className="card">
        <h2>Registrar Estudiantes</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={newStudent.firstName}
            onChange={handleInputChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="lastName"
            value={newStudent.lastName}
            onChange={handleInputChange}
            placeholder="Apellido"
            required
          />
          <input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          {emailError && <p className="error">{emailError}</p>}
          <label>
            Activo:
            <input
              type="checkbox"
              name="active"
              checked={newStudent.active}
              onChange={(e) =>
                setNewStudent((prev) => ({
                  ...prev,
                  active: e.target.checked,
                }))
              }
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrar'}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Lista de Estudiantes</h2>
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student.id} className="student-item">
                <div>
                  <strong>{student.firstName} {student.lastName}</strong>
                  <p>Email: {student.email}</p>
                  <p>Fecha de Inscripción: {student.enrollmentDate}</p>
                  <p>Estado: {student.active ? 'Activo' : 'Inactivo'}</p>
                </div>
                <div className="student-actions">
                  <button onClick={() => handleUpdate(student.id, 'active', !student.active)}>
                    {student.active ? 'Desactivar' : 'Activar'}
                  </button>
                  <button onClick={() => openEditModal(student)}>Editar</button>
                  <button onClick={() => openDeleteModal(student)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay estudiantes registrados.</p>
        )}
      </div>

      {/* Modal para Confirmación de Eliminación */}
      {showModal && modalType === 'delete' && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro de eliminar a {selectedStudent.firstName}?</h3>
            <button onClick={handleDelete}>Sí, eliminar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal para Edición de Estudiantes */}
      {showModal && modalType === 'edit' && selectedStudent && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Estudiante</h3>
            <input
              type="text"
              value={selectedStudent.firstName}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, firstName: e.target.value })}
              placeholder="Nombre"
            />
            <input
              type="text"
              value={selectedStudent.lastName}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, lastName: e.target.value })}
              placeholder="Apellido"
            />
            <input
              type="email"
              value={selectedStudent.email}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
              placeholder="Email"
            />
            <button onClick={() => {
              handleUpdate(selectedStudent.id, 'firstName', selectedStudent.firstName);
              handleUpdate(selectedStudent.id, 'lastName', selectedStudent.lastName);
              handleUpdate(selectedStudent.id, 'email', selectedStudent.email);
              closeModal();
            }}>
              Guardar Cambios
            </button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Sección personalizada debajo */}
      <footer className="custom-footer">
        <p>&copy; 2025 Senatinos. Todos los derechos reservados.</p>
        <p>Contacta con nosotros: <a href="mailto:contacto@senatinos.com">contacto@senatinos.com</a></p>
      </footer>
    </div>
  );
}

export default App;




