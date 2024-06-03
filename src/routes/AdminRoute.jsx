/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()
    const [role, , isLoading] = useRole()
    if (loading || isLoading) {
        return <div><Spinner /></div>
    }
    if (user && role === 'admin') return children;
    return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default AdminRoute;