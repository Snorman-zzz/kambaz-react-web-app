import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
export default function TodoList() {
    
    interface Todo { id: string; title: string; }
    interface RootState { todosReducer: { todos: Todo[] } }
    const { todos } = useSelector((state: RootState) => state.todosReducer);

    return (
        <div id="wd-todo-list-redux">
            <h1 className="mb-4">Todo List</h1>
            <ListGroup>
                <TodoForm />
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}