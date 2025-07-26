import { ListGroup, Form } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, editModule, updateModule } from "./reducer";

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
    editing?: boolean;
}

interface RootState {
  modulesReducer: {
    modules: Module[];
  };
}

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");

    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const dispatch = useDispatch();
    return (
        <div>
            <ModulesControls
              moduleName={moduleName}
              setModuleName={setModuleName}
              addModule={() => {
                if (!cid) return;
                dispatch(addModule({ name: moduleName, course: cid }));
                setModuleName("");
              }}
            />
            <br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">

                {modules
                    .filter((module: Module) => module.course === cid)
                    .map((module: Module) => (
                        <ListGroup.Item className=
                                            "wd-module p-0 mb-5 fs-5 border-gray" key={module._id}>
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing && module.name}
                                {module.editing && (
                                    <Form.Control
                                        className="w-50 d-inline-block"
                                        onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                dispatch(updateModule({ ...module, editing: false }));
                                            }
                                        }}
                                        defaultValue={module.name}
                                    />
                                )}
                                <ModuleControlButtons
                                  moduleId={module._id}
                                  deleteModule={(id) => dispatch(deleteModule(id))}
                                  editModule={(id) => dispatch(editModule(id))}
                                />
                            </div>
                            {module.lessons && (
                                <ListGroup className=
                                               "wd-lessons rounded-0">
                                    {module.lessons.map((lesson: Lesson) => (
                                        <ListGroup.Item className=
                                                            "wd-lesson p-3 ps-1" key={lesson._id}>
                                            <BsGripVertical className=
                                                                "me-2 fs-3"/> {lesson.name} <LessonControlButtons/>
                                        </ListGroup.Item>
                                    ))}</ListGroup>)}</ListGroup.Item>))}
            </ListGroup>
        </div>
    );
}
