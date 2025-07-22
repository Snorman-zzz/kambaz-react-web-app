import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

// Define the expected shape of the data coming from the JSON file
interface Lesson {
    _id: string;
    name: string;
    description?: string;
    module: string;
}

interface Module {
    _id: string;
    name: string;
    description?: string;
    course: string;
    lessons?: Lesson[];
}

export default function Modules() {
    const { cid } = useParams();
    const modules = db.modules as Module[];
    return (
        <div>
            <ModulesControls />
            <br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">

                {modules
                    .filter((module: Module) => module.course === cid)
                    .map((module: Module) => (
                        <ListGroup.Item className=
                                            "wd-module p-0 mb-5 fs-5 border-gray">
                            <div className=
                                     "wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className=
                                                    "me-2 fs-3"/> {module.name}
                                <ModuleControlButtons/>
                            </div>
                            {module.lessons && (
                                <ListGroup className=
                                               "wd-lessons rounded-0">
                                    {module.lessons.map((lesson: Lesson) => (
                                        <ListGroup.Item className=
                                                            "wd-lesson p-3 ps-1">
                                            <BsGripVertical className=
                                                                "me-2 fs-3"/> {lesson.name} <LessonControlButtons/>
                                        </ListGroup.Item>
                                    ))}</ListGroup>)}</ListGroup.Item>))}
            </ListGroup>
        </div>
    );
}
