import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

interface Todo { id?: string; title: string }
interface RootState { todosReducer: { todo: Todo } }

export default function TodoForm() {
    const todo = useSelector((state: RootState) => state.todosReducer.todo);
    const dispatch = useDispatch();

    return (
        <ListGroup.Item>
            <div className="d-flex align-items-start gap-2">
                <FormControl
                    className="flex-fill"
                    value={todo.title}
                    onChange={(e) =>
                        dispatch(setTodo({ ...todo, title: e.target.value }))
                    }
                />
                <Button
                    variant="warning"
                    id="wd-update-todo-click"
                    onClick={() => dispatch(updateTodo(todo))}
                >
                    Update
                </Button>
                <Button
                    variant="success"
                    id="wd-add-todo-click"
                    onClick={() => dispatch(addTodo(todo))}
                >
                    Add
                </Button>
            </div>
        </ListGroup.Item>
    );
}
