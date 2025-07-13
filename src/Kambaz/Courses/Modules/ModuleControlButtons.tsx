import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
    return (
        <span className="float-end">
            <GreenCheckmark />
            <BsPlus className="fs-4 me-2" />
            <IoEllipsisVertical className="fs-4" />
        </span>
    );
} 