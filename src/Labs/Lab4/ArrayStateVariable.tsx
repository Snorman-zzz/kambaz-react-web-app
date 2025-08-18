import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((_item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h1 className="mb-4">Array State Variable</h1>
            <Button
                variant="success"
                className="mb-3 px-4 py-3 fs-4 rounded-3"
                onClick={addElement}
            >
                Add Element
            </Button>
            <ListGroup className="mb-3">
                {array.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <span className="fs-3">{item}</span>
                        <Button
                            variant="danger"
                            className="px-4 py-2 fs-5 rounded-3"
                            onClick={() => deleteElement(index)}
                        >
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr/>
        </div>);}