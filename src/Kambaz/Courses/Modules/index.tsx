export default function Modules() {
    return (
        <div>
            <div className="wd-module-controls" style={{ marginBottom: "10px" }}>
                <button id="wd-collapse-all">Collapse All</button>
                <button id="wd-view-progress">View Progress</button>
                <select id="wd-publish-all">
                    <option>Publish All</option>
                    <option>Publish all items and modules</option>
                    <option>Unpublish all items and modules</option>
                </select>
                <button id="wd-add-module">+ Module</button>
            </div>
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Course Introduction Slides</li>
                                <li className="wd-content-item">Web Development Overview</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Intro to HTML</li>
                                <li className="wd-content-item">Working with Headings and Paragraphs</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Chapter 1 – Building React User Interfaces with HTML</li>
                                <li className="wd-content-item">Chapter 2 – Creating React Projects</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Formatting Content with Lists and Tables</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                </li>
            </ul>
        </div>
    );}
