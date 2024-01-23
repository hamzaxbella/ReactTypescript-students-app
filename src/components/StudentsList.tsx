import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFilter } from "@fortawesome/free-solid-svg-icons";
import { StudentItem } from "./StudentItem";
import { v4 as uuidv4 } from "uuid";
import { FilterStudents } from "./FilterStudents";
import { useState } from "react";

type student = {
  name: string;
  mark: number;
};

type studentListProp = {
  students: student[];
  openModal: (modalType: string) => void;
  setSelectedStudent: React.Dispatch<React.SetStateAction<student | null>>;
};

type filter = {
  propertie: string;
  order: string;
};

export const StudentsList = ({
  students,
  openModal,
  setSelectedStudent,
}: studentListProp) => {
  const [filter, setFilter] = useState<filter>({
    propertie: "name",
    order: "Ascending",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEdit = (student: student) => {
    openModal("edit");
    setSelectedStudent(student);
  };

  const handleDelete = (student: student) => {
    openModal("delete");
    setSelectedStudent(student);
  };

  const handleTogglePropertie = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      propertie : prevFilter.propertie === 'name' ? 'mark' : 'name'
    }))
  }

  const handleToggleOrder = () => {
    setFilter((prevFilter) => ({
      ...prevFilter, 
      order : prevFilter.order === 'Ascending' ? 'Descending' : 'Ascending'
    }))
  }

  const handleSort = (property: string) => {
    const newOrder =
      filter.propertie === property && filter.order === "Ascending"
        ? "Descending"
        : "Ascending";

    setFilter({
      propertie: property,
      order: newOrder,
    });
  };

  const sortedStudents = [...students].sort((a, b) => {
    const propA = filter.propertie === "name" ? a.name : a.mark;
    const propB = filter.propertie === "name" ? b.name : b.mark;
  
    if (filter.propertie === "name") {
      // Use localeCompare for string comparison
      return filter.order === "Ascending" ? (propA as string).localeCompare(propB as string) : (propB as string).localeCompare(propA as string);
    } else {
      // Assuming mark is always a number
      return filter.order === "Ascending" ? (propA as number) - (propB as number) : (propB as number) - (propA as number);
    }
  });
      
  return (
    <div
      style={{
        width: "80vmax",
        maxWidth: "500px",
        height: "80vh",
        background: "#181818",
        color: "white",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: "0px 0px 50px black",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "80px",
          background: "#252525",
          marginBottom: "50px",
        }}
      >
        <h1 style={{ lineHeight: "80px", fontSize : "1.5rem", marginLeft: "2rem" }}>
          Students List 🐧{" "}
        </h1>
        <span>
          <FontAwesomeIcon
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: "absolute",
              right: "2rem",
              top: "2rem",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
            icon={faFilter}
          />
          <FilterStudents onToggleProperty={handleTogglePropertie} onToggleOrder={handleToggleOrder} filter={filter} isOpen={isOpen} />
        </span>
      </div>
      <div style={{ overflowY: "scroll" , maxHeight : "70%" }}>
        {sortedStudents.map((student) => (
          <div key={uuidv4()}>
            <StudentItem
              student={student}
              onEditStudent={() => handleEdit(student)}
              onDeleteStudent={() => handleDelete(student)}
            />
          </div>
        ))}
      </div>
      <div
        onClick={() => openModal("add")}
        style={{
          margin: "1rem",
          alignSelf: "center",
          borderRadius: "4px",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(0,206,22)",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon
          style={{ color: "#181818", scale: "1.5" }}
          icon={faAdd}
        />
      </div>
    </div>
  );
};
