import Lab1 from "./Lab1"
import {Navigate, Route, Routes} from "react-router";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";

function Index() {
    return null;
}

export default function Labs() {
    return (
        <div id="wd-labs">
            <h1>Mingze Yuan</h1>
            <TOC />
            <a id="wd-github" href="https://github.com/Snorman-zzz/kambaz-react-web-app">
                GitHub Repository
            </a>
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