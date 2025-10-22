import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import axios from "axios";

const API_URL = "http://localhost:4000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const getStudents = async () => {
    const res = await axios.get(API_URL);
    setStudents(res.data);
  };

  const createStudent = async (student) => {
    try {
      await axios.post(API_URL, student);
      getStudents();
    } catch (err) {
      alert(err.response?.data?.msg || "Error al registrar");
    }
  };

  const updateStudent = async (id, student) => {
    await axios.put(`${API_URL}/${id}`, student);
    setEditStudent(null);
    getStudents();
  };

  const deleteStudent = async (id) => {
    if (confirm("¿Eliminar estudiante?")) {
      await axios.delete(`${API_URL}/${id}`);
      getStudents();
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="rosado-claro-bg p-4 rounded">
  <h2 className="text-center mb-4">📘 Directorio de Estudiantes de Senati 2025</h2>

  <StudentForm 
    onSubmit={createStudent} 
    editStudent={editStudent} 
    onUpdate={updateStudent} 
  />

  <StudentList 
    students={students} 
    onEdit={setEditStudent} 
    onDelete={deleteStudent} 
  />
</div>
  );
}

export default App;
