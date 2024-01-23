// AddStudentForm.tsx
import React, { useState, ChangeEvent } from "react";

type StudentFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (newStudent: { name: string; mark: number }) => void;
};

export const AddStudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onAddStudent,
}) => {
  const [name, setName] = useState<string>("");
  const [mark, setMark] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate the name (only characters) and mark (under 20)
    if (!/^[a-zA-Z]+$/.test(name)) {
      setError("Name should contain only characters.");
      return;
    }

    if (mark > 20) {
      setError("Mark should be under 20.");
      return;
    }

    // create a new student object
    const newStudent = {
      name: name,
      mark: mark,
    };

    // call the onAddStudent prop to add the new student to the students array:
    onAddStudent(newStudent);

    // Add logic to handle the form submission
    onClose();

    // Clear the inputs
    clear();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMarkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMark = parseInt(e.target.value, 10);
    setMark(isNaN(newMark) ? 0 : newMark);
  };

  const clear = (): void => {
    setName("");
    setMark(0);
    setError(null);
  };

  return (
    <div>
      {/* Dark overlay */}
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        <span
          className="modal-close"
          onClick={onClose}
        >
          &times;
        </span>
        <h1 style={{ padding: "2rem 0", alignSelf: "center" }}>
          Add a student 🤏
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Student name"
            value={name}
            type="text"
            onChange={handleNameChange}
          />
          <input
            placeholder="Student mark"
            value={mark}
            type="number"
            onChange={handleMarkChange}
          />

          {error && <div style={{ color: "red" }}>{error}</div>}

          <div className="buttons">
            <button
              type="button" // Change the type to "button" to prevent form submission
              onClick={() => {
                onClose();
                clear();
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
