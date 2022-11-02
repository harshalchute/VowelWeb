import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("user");
    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};