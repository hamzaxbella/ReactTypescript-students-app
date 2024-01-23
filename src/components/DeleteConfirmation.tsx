type DeleteConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeleteStudent: () => void;
  selectedStudent: { name: string; mark: number } | null;
};

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onDeleteStudent,
  selectedStudent,
}: DeleteConfirmationProps) => {
  return (
    <div>
      <div
        className={`overlay ${isOpen && selectedStudent ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`modal ${isOpen && selectedStudent ? "open" : ""}`}>
        <h1 className="modal-heading">Delete?</h1>
        <p style={{marginBottom : "1rem" , fontSize : "1rem" , textAlign : "center"}}>
          All data related to <span style={{color : "red" , fontWeight : "bold"}}>{selectedStudent?.name}</span> will be deleted including
          Name and Mark.
        </p>
        <span
          className="modal-close"
          onClick={onClose}
        >
          &times;
        </span>

        <div className="buttons">
          <button
            className="btn-secondary"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDeleteStudent();
              onClose();
            }}
            className="btn-danger"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
