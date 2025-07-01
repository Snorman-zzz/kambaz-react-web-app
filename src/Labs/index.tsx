import Lab1 from "./Lab1"
import {Navigate, Route, Routes} from "react-router";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";
import { Link } from "react-router-dom";

function Index() {
    return null;
}

export default function Labs() {
    return (
        <div id="wd-labs">
            <h3 id="wd-student-id">Mingze Yuan</h3>
            <TOC />
            <a id="wd-github" href="https://github.com/Snorman-zzz/kambaz-react-web-app">
                GitHub Repository
            </a>
            <Link to="/Labs" id="wd-labs-link">Back to Labs Landing</Link>
            <Index />
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2/*" element={<Lab2 />} />
                <Route path="Lab3/*" element={<Lab3 />} />
            </Routes>

        </div>
    );
}