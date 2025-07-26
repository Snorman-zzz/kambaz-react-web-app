import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { Button, Form } from "react-bootstrap";
export default function AddRedux() {
    const [a, setA] = useState(12);
    const [b, setB] = useState(23);
    interface AddState { sum: number; }
    interface RootState { addReducer: AddState; }
    const sum = useSelector((state: RootState) => state.addReducer.sum);
    const dispatch = useDispatch();
    return (
        <div className="w-25" id="wd-add-redux">
            <h1>Add Redux</h1>
            <h2>{a} + {b} = {sum}</h2>
            <Form.Control type="number" defaultValue={a}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setA(parseInt(e.target.value))} />
            <Form.Control type="number" defaultValue={b}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setB(parseInt(e.target.value))} />
            <Button id="wd-add-redux-click"
                    onClick={() => dispatch(add({ a, b }))}>
                Add Redux
            </Button>
            <hr/>
        </div>
    );
}
