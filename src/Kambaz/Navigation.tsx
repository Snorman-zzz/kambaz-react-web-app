import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
export default function KambazNavigation() {
    const location = useLocation();
    const isActive = (pathStarts: string) => location.pathname.startsWith(pathStarts);
    const activeClasses = "text-center border-0 bg-white text-danger";
    const defaultClasses = "text-center border-0 bg-black text-white";
    const iconClasses = "fs-1 text-danger";

    return (
        <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }}
                   className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <ListGroup.Item id="wd-neu-link" target="_blank" action
                            href="https://www.northeastern.edu/"
                            className="bg-black border-0 text-center">
                <img src="/images/NEU.png" width="75px" />
            </ListGroup.Item>

            <ListGroup.Item to="/Kambaz/Account" as={Link}
                            className={defaultClasses}>
                <FaRegCircleUser className="fs-1 text-white" /><br />
                Account
            </ListGroup.Item>

            <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
                            className={isActive("/Kambaz/Dashboard") ? activeClasses : defaultClasses}>
                <AiOutlineDashboard className={iconClasses} /><br />
                Dashboard
            </ListGroup.Item>

            <ListGroup.Item to="/Kambaz/Courses/1234/Home" as={Link}
                            className={isActive("/Kambaz/Courses") ? activeClasses : defaultClasses}>
                <LiaBookSolid className={iconClasses} /><br />
                Courses
            </ListGroup.Item>

            <ListGroup.Item to="/Kambaz/Calendar" as={Link}
                            className={isActive("/Kambaz/Calendar") ? activeClasses : defaultClasses}>
                <IoCalendarOutline className={iconClasses} /><br />
                Calendar
            </ListGroup.Item>

            <ListGroup.Item to="/Kambaz/Inbox" as={Link}
                            className={isActive("/Kambaz/Inbox") ? activeClasses : defaultClasses}>
                <FaInbox className={iconClasses} /><br />
                Inbox
            </ListGroup.Item>

            <ListGroup.Item to="/Labs" as={Link}
                            className={isActive("/Labs") ? activeClasses : defaultClasses}>
                <LiaCogSolid className={iconClasses} /><br />
                Labs
            </ListGroup.Item>
        </ListGroup>
    );
}