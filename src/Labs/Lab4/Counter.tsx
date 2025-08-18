import { useState } from "react";
import { Button } from "react-bootstrap";
export default function Counter() {
    const [count, setCount] = useState(7);
    console.log(count);
    return (
        <div id="wd-counter-use-state">
            <h1 className="mb-4">Counter: {count}</h1>
            <Button
                variant="success"
                className="me-3 px-5 py-4 fs-4 rounded-3"
                onClick={() => setCount(count + 1)}
                id="wd-counter-up-click"
            >
                Up
            </Button>
            <Button
                variant="danger"
                className="px-5 py-4 fs-4 rounded-3"
                onClick={() => setCount(count - 1)}
                id="wd-counter-down-click"
            >
                Down
            </Button>
            <hr/></div>);}