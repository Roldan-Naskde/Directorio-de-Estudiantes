const API_URL = "http://localhost:3000/api/students";

export const getStudents = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createStudent = async (student) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
};

export const deleteStudent = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
