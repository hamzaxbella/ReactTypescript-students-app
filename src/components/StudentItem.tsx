import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type studentItemProp = {
  student: {
    name: string;
    mark: number;
  };

  onEditStudent: () => void;
  onDeleteStudent: () => void;
};

export const StudentItem = ({ student, onEditStudent, onDeleteStudent }: studentItemProp) => {
  return (
    <div
      style={{
        border: "2px solid gray",
        borderRadius: "6px",
        padding: "1rem 1.5rem",
        margin: "1rem auto",
        maxWidth: "450px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "auto" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          name : {student.name}
        </h3>
        <p style={{ fontSize: "1rem" }}>mark : {student.mark}</p>
      </div>
      <div>
        <FontAwesomeIcon
          onClick={onDeleteStudent}
          style={{
            marginLeft: "2rem",
            fontSize: "1.3rem",
            color: "whiteSmoke",
            cursor: "pointer",
          }}
          icon={faTrash}
        />
        <FontAwesomeIcon
          onClick={onEditStudent}
          style={{
            marginLeft: "2rem",
            fontSize: "1.3rem",
            color: "whiteSmoke",
            cursor: "pointer",
          }}
          icon={faEdit}
        />
      </div>
    </div>
  );
};
