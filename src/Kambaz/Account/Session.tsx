import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();
    const fetchProfile = async () => {
        try {
            console.log("=== SESSION DEBUG ===");
            console.log("Attempting to fetch profile...");
            const currentUser = await client.profile();
            console.log("Profile fetch successful:", currentUser);
            dispatch(setCurrentUser(currentUser));
        } catch (err: any) {
            console.error("Profile fetch failed:", err);
            console.error("Error status:", err.response?.status);
            console.error("Error data:", err.response?.data);
            // Don't set current user if profile fetch fails
            dispatch(setCurrentUser(null));
        }
        setPending(false);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    if (!pending) {
        return children;
    }
}
