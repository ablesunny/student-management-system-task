import { useEffect, useRef, useState } from "react";

function StudentForm({ addStudent, updateStudent, editStudent, cancelEdit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setAge(editStudent.age);
      setEmail(editStudent.email);
      setCourse(editStudent.course);
    } else {
      clearForm();
    }
    nameRef.current.focus();
  }, [editStudent]);

  function submitForm(e) {
    e.preventDefault();

    if (!name.trim() || !age || !email.trim() || !course) {
      setError("Please fill all the fields.");
      return;
    }

    if (Number(age) < 18) {
      setError("Age must be 18 or above.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    const student = {
      name: name.trim(),
      age: Number(age),
      email: email.trim(),
      course,
    };

    if (editStudent) {
      updateStudent({ ...student, id: editStudent.id });
    } else {
      addStudent(student);
    }

    clearForm();
    setError("");
  }

  function clearForm() {
    setName("");
    setAge("");
    setEmail("");
    setCourse("");
    setError("");
  }

  function cancel() {
    clearForm();
    cancelEdit();
  }

  return (
    <form className="form" onSubmit={submitForm}>
      <h2>{editStudent ? "Update Student" : "Add Student"}</h2>
      <p className="form-subtitle">Enter the student details below.</p>

      <label>Name</label>
      <input
        ref={nameRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Course</label>
      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        <option value="">Select Course</option>
        <option value="MERN Stack">MERN Stack</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
        <option value="JavaScript">JavaScript</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit">{editStudent ? "Update Student" : "Add Student"}</button>
      <button type="button" className="clear-button" onClick={editStudent ? cancel : clearForm}>
        Clear Form
      </button>
    </form>
  );
}

export default StudentForm;
