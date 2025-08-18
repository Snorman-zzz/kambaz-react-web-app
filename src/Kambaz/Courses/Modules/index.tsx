import { ListGroup, Form } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {addModule, deleteModule, editModule, setModules, updateModule} from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

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
    const fetchModulesForCourse = async () => {
        if (!cid) return;
        const modules = await coursesClient.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModulesForCourse();
    }, [cid]);

    const addModuleHandler = async () => {
        if (!cid) return;
        const module = await coursesClient.createModuleForCourse(cid, {
            name: moduleName,
            course: cid,
        });
        dispatch(addModule(module));
        setModuleName("");
    };

    const deleteModuleHandler = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    const updateModuleHandler = async (module: Module) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };

    return (
        <div>
            <ModulesControls
              addModule={addModuleHandler}
              moduleName={moduleName}
              setModuleName={setModuleName}
            />
            <br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">

                {modules
                    .map((module: Module) => (
                        <ListGroup.Item className=
                                            "wd-module p-0 mb-5 fs-5 border-gray" key={module._id}>
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing && module.name}
                                {module.editing && (
                                    <Form.Control
                                        className="w-50 d-inline-block"
                                        value={module.name}
                                        onChange={(e) => updateModuleHandler({ ...module, name: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateModuleHandler({ ...module, editing: false });
                                            }
                                        }}
                                    />
                                )}
                                <ModuleControlButtons
                                  moduleId={module._id}
                                  deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
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
