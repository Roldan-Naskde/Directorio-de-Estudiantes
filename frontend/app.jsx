import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleStudentAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Directorio de Estudiantes</h2>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList refresh={refresh} />
    </div>
  );
}
