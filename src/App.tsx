import { useState , useEffect} from "react";
import { StudentsList } from "./components/StudentsList";
import { AddStudentForm } from "./components/AddStudentForm";
import { EditStudentForm } from "./components/EditStudentForm";
import { DeleteConfirmation } from "./components/DeleteConfirmation";

function App() {
  type student = {
    name: string;
    mark: number;
  };

  // Retreive students data from local storage on component mount
  const initialStudents: student[] = JSON.parse(
    localStorage.getItem("students") || "[]"
  );
  // Setting initial students from the local storage
  const [students, setStudents] = useState<student[]>(initialStudents);

  // Modals states.
  const [isAddStudentModal,    setIsAddStudentModal]    = useState<boolean>(false);
  const [isEditStudentModal,   setIsEditStudentModal]   = useState<boolean>(false);
  const [isDeleteStudentModal, setIsDeleteStudentModal] = useState<boolean>(false);
  const [selectedStudent,      setSelectedStudent]      = useState<student | null>(null);

  // open the Targeted modal.
  const openModal = (modalType: string): void => {
    if        (modalType === "add")    {
      setIsAddStudentModal(true);
    } else if (modalType === "edit")   {
      setIsEditStudentModal(true);
    } else if (modalType === "delete") {
      setIsDeleteStudentModal(true);
    }
  };

  const closeModal = (): void => {
    // closing all modals
    setIsAddStudentModal   (false);
    setIsEditStudentModal  (false);
    setIsDeleteStudentModal(false);
    setSelectedStudent     (null); // clear selected student after closing modal
  };

  const addStudent = (newStudent: student): void => {
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    // update local storage.
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const editStudent = (editedStudent: student): void => {
    if (selectedStudent) {
      const updatedStudents = students.map((student) => student === selectedStudent ? { ...editedStudent } : student);
      setStudents(updatedStudents);
      closeModal();
      // update local storage.
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  const deleteStudent = (): void => {
    if (selectedStudent) {
      const updatedStudents = students.filter((student) => student != selectedStudent);
      setStudents(updatedStudents);
      closeModal();
      // update local storage.
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  useEffect(() => {
    // Add an event listener to update students data in local storage when it changes
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <div
      style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh",}}>
      <StudentsList
        students={students}
        openModal={(modalType) => openModal(modalType)}
        setSelectedStudent={setSelectedStudent}
      />
      <AddStudentForm
        isOpen={isAddStudentModal}
        onClose={closeModal}
        onAddStudent={addStudent}
      />
      {isEditStudentModal && selectedStudent && (
        <EditStudentForm
          isOpen={isEditStudentModal && selectedStudent !== null}
          onClose={closeModal}
          onEditStudent={editStudent}
          selectedStudent={selectedStudent}
        />
      )}

      {isDeleteStudentModal && selectedStudent && (
        <DeleteConfirmation
          isOpen={isDeleteStudentModal}
          onClose={closeModal}
          onDeleteStudent={deleteStudent}
          selectedStudent={selectedStudent}
        />
      )}
    </div>
  );
}

export default App;
