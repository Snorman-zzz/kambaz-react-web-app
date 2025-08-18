import { useSelector } from "react-redux";
export default function HelloRedux() {
    interface HelloState { message: string; }
    interface RootState { helloReducer: HelloState; }
    const { message } = useSelector((state: RootState) => state.helloReducer);
    return (
        <div id="wd-hello-redux">
            <h3>Hello Redux</h3>
            <h4>{message}</h4> <hr />
        </div>
    );
}
