import Lab1 from "./Lab1"
import {Navigate, Route, Routes} from "react-router-dom";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";
import Lab4 from "./Lab4";
import {Provider} from "react-redux";
import store from "./store";
import Lab5 from "./Lab5";
function Index() {
    return null;
}

export default function Labs() {
    return (
        <Provider store={store}>
            <div id="wd-labs">
                <h3 id="wd-student-id">Mingze Yuan</h3>
                <TOC/>
                <a id="wd-github" href="https://github.com/Snorman-zzz/kambaz-react-web-app">
                    GitHub Repository
                </a>
                <br />
                <a id="wd-github" href="https://github.com/Snorman-zzz/kambaz-node-server-app">
                    Backend GitHub Repository
                </a>
                <br />
                <a id="wd-github" href="https://kambaz-node-server-app-2ur0.onrender.com">
                    root of the server running on Render
                </a>
                <Index/>
                <Routes>
                    <Route path="/" element={<Navigate to="Lab1"/>}/>
                    <Route path="Lab1" element={<Lab1/>}/>
                    <Route path="Lab2/*" element={<Lab2/>}/>
                    <Route path="Lab3/*" element={<Lab3/>}/>
                    <Route path="Lab4/*" element={<Lab4/>}/>
                    <Route path="Lab5/*" element={<Lab5/>}/>
                </Routes>
            </div>
        </Provider>
    );
}