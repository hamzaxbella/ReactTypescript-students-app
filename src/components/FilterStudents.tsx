import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type FilterStudentsProps = {
    isOpen : boolean
    filter : {propertie : string , order : string}
    onToggleProperty : () => void
    onToggleOrder : () => void
}

export const FilterStudents = ({ filter , isOpen , onToggleProperty , onToggleOrder} : FilterStudentsProps) => {
  return (
    <div className={`dropDown ${isOpen ? 'open' : 'closed'}`}>
        <span></span>
        <div className="propertie" onClick={onToggleProperty}>{filter.propertie} <FontAwesomeIcon icon={faCheck} /></div>
        <div className="order" onClick={onToggleOrder}>{filter.order} <FontAwesomeIcon icon={faCheck} /></div>
    </div>
  )
}
