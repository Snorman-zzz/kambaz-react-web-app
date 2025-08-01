import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    /* ---------------- Local state for Assignment ---------------- */
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    /* ---------------- Local state for Module ---------------- */
    const [module, setModule] = useState({
        id: "M101",
        name: "React Module",
        description: "Hands-on React development module",
        course: "CS1234",
    });

    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            {/* ---------------- Assignment Section ---------------- */}
            <h4>Retrieving Objects</h4>
            <a
                id="wd-retrieve-assignments"
                className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}
            >
                Get Assignment
            </a>

            <hr />
            <h4>Retrieving Properties</h4>
            <a
                id="wd-retrieve-assignment-title"
                className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}
            >
                Get Title
            </a>

            <hr />
            <h4>Modifying Properties</h4>
            {/* Update Title */}
            <a
                id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
            >
                Update Title
            </a>
            <FormControl
                className="w-75"
                id="wd-assignment-title"
                value={assignment.title}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                }
            />

            {/* Update Score */}
            <a
                id="wd-update-assignment-score"
                className="btn btn-secondary float-end mt-2"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
            >
                Update Score
            </a>
            <FormControl
                type="number"
                className="w-75 mt-2"
                id="wd-assignment-score"
                value={assignment.score}
                onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })
                }
            />

            {/* Update Completed */}
            <a
                id="wd-update-assignment-completed"
                className="btn btn-secondary float-end mt-2"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
            >
                Update Completed
            </a>
            <div className="form-check w-75 mt-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-assignment-completed"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({
                            ...assignment,
                            completed: e.target.checked,
                        })
                    }
                />
                <label
                    className="form-check-label"
                    htmlFor="wd-assignment-completed"
                >
                    Completed
                </label>
            </div>

            <hr />

            {/* ---------------- Module Section ---------------- */}
            <h4>Module - Retrieving Object</h4>
            <a
                id="wd-retrieve-module"
                className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}
            >
                Get Module
            </a>

            <hr />
            <h4>Module - Retrieving Properties</h4>
            <a
                id="wd-retrieve-module-name"
                className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}
            >
                Get Module Name
            </a>

            <hr />
            <h4>Module - Modifying Properties</h4>
            {/* Update Name */}
            <a
                id="wd-update-module-name"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/name/${module.name}`}
            >
                Update Name
            </a>
            <FormControl
                className="w-75"
                id="wd-module-name"
                value={module.name}
                onChange={(e) =>
                    setModule({ ...module, name: e.target.value })
                }
            />

            {/* Update Description */}
            <a
                id="wd-update-module-description"
                className="btn btn-secondary float-end mt-2"
                href={`${MODULE_API_URL}/description/${module.description}`}
            >
                Update Description
            </a>
            <FormControl
                className="w-75 mt-2"
                id="wd-module-description"
                value={module.description}
                onChange={(e) =>
                    setModule({ ...module, description: e.target.value })
                }
            />

            <hr />
        </div>
    );
}
