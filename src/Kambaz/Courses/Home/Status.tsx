import { Button, ButtonGroup } from "react-bootstrap";
import { FaBan, FaCheckCircle, FaFileImport, FaCloudDownloadAlt, FaHome, FaChartBar, FaBullhorn, FaChartLine, FaBell } from "react-icons/fa";

export default function CourseStatus() {
    const actionBtn = (id: string, icon: React.ReactNode, label: string) => (
        <Button id={id} variant="light" className="w-100 text-start border mb-2">
            <span className="me-2">{icon}</span>{label}
        </Button>
    );

    return (
        <div id="wd-course-status" className="pt-2" style={{ maxWidth: "220px" }}>
            <h5>Course Status</h5>
            <ButtonGroup className="w-100 mb-3">
                <Button variant="light" className="w-50 border" id="wd-unpublish-btn">
                    <FaBan className="me-2" />Unpublish
                </Button>
                <Button variant="success" className="w-50" id="wd-publish-btn">
                    <FaCheckCircle className="me-2" />Published
                </Button>
            </ButtonGroup>
            {actionBtn("wd-import-existing", <FaFileImport />, "Import Existing Content")}
            {actionBtn("wd-import-commons", <FaCloudDownloadAlt />, "Import from Commons")}
            {actionBtn("wd-choose-home", <FaHome />, "Choose Home Page")}
            {actionBtn("wd-view-stream", <FaChartBar />, "View Course Stream")}
            {actionBtn("wd-new-announcement", <FaBullhorn />, "New Announcement")}
            {actionBtn("wd-new-analytics", <FaChartLine />, "New Analytics")}
            {actionBtn("wd-view-notifications", <FaBell />, "View Course Notifications")}
        </div>
    );
}