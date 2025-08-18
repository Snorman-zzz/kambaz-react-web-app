import { useEffect, useState } from "react";
import * as client from "./client";
import { FormControl, ListGroup } from "react-bootstrap";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

interface Assignment {
    title: string;
    description: string;
    due: string;
    completed: boolean;
}

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    editing?: boolean;
}

function WorkingWithObjectsAsynchronously() {
    const [assignment, setAssignment] = useState<Assignment>({
        title: "",
        description: "",
        due: "",
        completed: false
    });

    const [todos, setTodos] = useState<Todo[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchAssignment = async () => {
        try {
            const assignmentData = await client.fetchAssignment();
            setAssignment(assignmentData);
        } catch (error) {
            console.error("Error fetching assignment:", error);
        }
    };

    const updateTitle = async (title: string) => {
        try {
            const updatedAssignment = await client.updateTitle(title);
            setAssignment(updatedAssignment);
        } catch (error) {
            console.error("Error updating title:", error);
        }
    };

    const fetchTodos = async () => {
        try {
            const todosData = await client.fetchTodos();
            setTodos(todosData);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const removeTodo = async (todo: Todo) => {
        try {
            const updatedTodos = await client.removeTodo(todo);
            setTodos(updatedTodos);
        } catch (error) {
            console.error("Error removing todo:", error);
        }
    };

    const createTodo = async () => {
        try {
            const todosData = await client.createTodo();
            setTodos(todosData);
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    const postTodo = async () => {
        try {
            const newTodo = await client.postTodo({ title: "New Posted Todo", completed: false });
            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error("Error posting todo:", error);
        }
    };

    const deleteTodo = async (todo: Todo) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
            setErrorMessage(null);
        } catch (error: any) {
            console.error("Error deleting todo:", error);
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Unable to delete todo.");
            }
        }
    };

    const editTodo = (todo: Todo) => {
        const updatedTodos = todos.map(
            (t) => t.id === todo.id ? { ...todo, editing: true } : t
        );
        setTodos(updatedTodos);
    };

    const updateTodo = async (todo: Todo) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
            setErrorMessage(null);
        } catch (error: any) {
            console.error("Error updating todo:", error);
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Unable to update todo.");
            }
        }
    };

    useEffect(() => {
        fetchAssignment();
        fetchTodos();
    }, []);

    return (
        <div id="wd-asynchronous-objects">
            <h3>Working with Objects Asynchronously</h3>
            <h4>Assignment</h4>
            <FormControl
                value={assignment.title}
                className="mb-2"
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            />
            <FormControl
                as="textarea"
                rows={3}
                value={assignment.description}
                className="mb-2"
                onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            />
            <FormControl
                type="date"
                className="mb-2"
                value={assignment.due}
                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
            />
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-completed"
                    checked={assignment.completed}
                    onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="wd-completed"> Completed </label>
            </div>
            <button className="btn btn-primary me-2" onClick={() => updateTitle(assignment.title)}>
                Update Title
            </button>
            <pre>{JSON.stringify(assignment, null, 2)}</pre>
            <hr />
            <div id="wd-asynchronous-arrays">
                <h3>Working with Arrays Asynchronously</h3>
                {errorMessage && (
                    <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
                        {errorMessage}
                    </div>
                )}
                <h4>Todos
                    <FaPlusCircle onClick={createTodo} className="text-success float-end fs-3"
                                  id="wd-create-todo" />
                    <FaPlusCircle onClick={postTodo} className="text-primary float-end fs-3 me-3" id="wd-post-todo" />
                </h4>
                <ListGroup>
                    {todos.map((todo) => (
                        <ListGroup.Item key={todo.id}>
                            <FaPencil onClick={() => editTodo(todo)} className="text-primary float-end me-2 mt-1" />
                            <FaTrash onClick={() => removeTodo(todo)}
                                     className="text-danger float-end mt-1" id="wd-remove-todo" />
                            <TiDelete onClick={() => deleteTodo(todo)} className="text-danger float-end me-2 fs-3" id="wd-delete-todo" />
                            <input type="checkbox" className="form-check-input me-2"
                                   checked={todo.completed}
                                   onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })} />
                            {!todo.editing ? (
                                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                    {todo.title}
                                </span>
                            ) : (
                                <FormControl 
                                    className="w-50 float-start" 
                                    value={todo.title}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            updateTodo({ ...todo, editing: false });
                                        }
                                    }}
                                    onChange={(e) =>
                                        updateTodo({ ...todo, title: e.target.value })
                                    }
                                />
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <hr />
            </div>
        </div>
    );
}

export default WorkingWithObjectsAsynchronously;
