import StudentCard from "./StudentCard";

function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p className="no-students">No students found.</p>;
  }

  return (
    <div>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default StudentList;
