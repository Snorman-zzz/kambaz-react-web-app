export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                {/* Complete on your own */}
                <tr>
                    <td align="right">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as" defaultValue="Percentage">
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Complete/Incomplete</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type" defaultValue="Online">
                            <option>Online</option>
                            <option>No Submission</option>
                            <option>On Paper</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td />
                    <td>
                        <fieldset>
                            <legend>Online Entry Options</legend>
                            <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br/>
                            <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br/>
                            <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                            <input type="checkbox" id="wd-student-annotation" /> <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                            <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Uploads</label>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="wd-assign-to">Assign to</label>
                    </td>
                    <td>
                        <input id="wd-assign-to" defaultValue="Everyone" />
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="wd-due-date">Due</label>
                    </td>
                    <td>
                        <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="wd-available-from">Available from</label>
                    </td>
                    <td>
                        <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
                        &nbsp; Until &nbsp;
                        <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
                    </td>
                </tr>
            </table>
            <br/>
            <button id="wd-cancel">Cancel</button>
            <button id="wd-save">Save</button>
        </div>
    );}
