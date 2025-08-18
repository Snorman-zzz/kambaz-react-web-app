import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
    const dispatch = useDispatch();

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>{todo.title}</span>
            <div>
                <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    id="wd-set-todo-click"
                    onClick={() => dispatch(setTodo(todo))}
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="danger"
                    id="wd-delete-todo-click"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                >
                    Delete
                </Button>
            </div>
        </ListGroup.Item>
    );
}