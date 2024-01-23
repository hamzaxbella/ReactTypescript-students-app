import { ChangeEvent, FormEvent, useState, useEffect } from "react";

type student = {
  name: string;
  mark: number;
};

type EditStudentFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onEditStudent: (editedStudent: { name: string; mark: number }) => void; // Update the prop type
  selectedStudent: student | null;
};

export const EditStudentForm = ({
  isOpen,
  onClose,
  onEditStudent,
  selectedStudent,
}: EditStudentFormProps) => {

  const [newName, setNewName] = useState<string>("");
  const [newMark, setNewMark] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update state when selectedStudent changes
    if (selectedStudent) {
      setNewName(selectedStudent.name);
      setNewMark(selectedStudent.mark);
    }
  }, [selectedStudent]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate the name (characters and spaces) and mark (under 20)
    if (newName.trim() === "") {
      setError("You can't let the name empty.");
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(newName)) {
      setError("Name should contain only characters and spaces.");
      return;
    }

    if (newMark > 20) {
      setError("Mark should be under 20.");
      return;
    }

    if (newMark === null || isNaN(newMark)) {
      setError("Mark can't be empty.");
      return;
    }
            // create a new student object
    const updatedStudent = {
      name: newName,
      mark: newMark,
    };

    onEditStudent(updatedStudent);

    // Add logic to handle the form submission
    onClose();

    // Clear the inputs
    clear();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleMarkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMark(parseInt(e.target.value, 10));
  };

  const clear = () => {
    setNewName("");
    setNewMark(0);
    setError(null)
  };

  return (
    <div>
      {/* Dark overlay */}
      <div
        className={`overlay ${isOpen && selectedStudent ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`modal ${isOpen && selectedStudent ? "open" : ""}`}>
        <h1 className="modal-heading">Edit student ✏️</h1>
        <span
          className="modal-close"
          onClick={onClose}
        >
          &times;
        </span>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="New name"
            type="text"
            onChange={handleNameChange}
            value={newName}
          />
          <input
            placeholder="New mark"
            type="number"
            onChange={handleMarkChange}
            value={newMark}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                onClose();
                clear();
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
