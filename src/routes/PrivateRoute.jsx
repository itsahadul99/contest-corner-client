/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()
    if (loading) {
        return <div><Spinner /></div>
    }
    if (user) return children;
    return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default PrivateRoute;