import { useState } from "react";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const studentsData = [
  {
    id: 1,
    name: "Rahul",
    age: 22,
    email: "rahul@gmail.com",
    course: "MERN Stack",
  },
  {
    id: 2,
    name: "Anu",
    age: 21,
    email: "anu@gmail.com",
    course: "React",
  },
];

function App() {
  const [students, setStudents] = useState(studentsData);
  const [search, setSearch] = useState("");
  const [editStudent, setEditStudent] = useState(null);

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: students.length ? students[students.length - 1].id + 1 : 1,
    };
    setStudents([...students, newStudent]);
  }

  function updateStudent(student) {
    setStudents(
      students.map((item) => (item.id === student.id ? student : item))
    );
    setEditStudent(null);
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  function edit(id) {
    const student = students.find((item) => item.id === id);
    setEditStudent(student);
  }

  const filteredStudents = students.filter((student) => {
    const text = search.toLowerCase();
    return (
      student.name.toLowerCase().includes(text) ||
      student.email.toLowerCase().includes(text) ||
      student.course.toLowerCase().includes(text)
    );
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page-top">
          <div>
            <h1>Student Management System</h1>
            <p className="intro">Add and manage student details</p>
          </div>
          <div className="student-count">{students.length} Students</div>
        </div>

        <div className="main-content">
          <StudentForm
          addStudent={addStudent}
          updateStudent={updateStudent}
          editStudent={editStudent}
          cancelEdit={() => setEditStudent(null)}
          />

          <div className="students-section">
            <div className="students-header">
              <h2>Students</h2>
              <span>{filteredStudents.length} shown</span>
            </div>

            <input
            className="search"
            type="text"
            placeholder="Search by name, email or course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            <StudentList
            students={filteredStudents}
            onEdit={edit}
            onDelete={deleteStudent}
            />

            <p className="total">Total Students: {students.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
