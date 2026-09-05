function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="student-card">
      <div>
        <h3>{student.name}</h3>
        <p>Age: {student.age}</p>
        <p>Email: {student.email}</p>
        <span className="course">{student.course}</span>
      </div>

      <div className="card-buttons">
        <button onClick={() => onEdit(student.id)}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
