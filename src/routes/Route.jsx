import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../page/Home/Home";
import Login from "../page/Authentication/Login";
import SignUp from "../page/Authentication/SignUp";
import AllContest from "../page/AllContest";
import ContestDetails from "../page/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import Welcome from "../page/Dashboard/Welcome";
import ErrorPage from "../page/ErrorPage";
import AddContest from "../page/Dashboard/AddContest";
import ManageUsers from "../page/Dashboard/Admin/ManageUsers";
import ManageContests from "../page/Dashboard/Admin/ManageContests";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/allContest',
                element: <AllContest />
            },
            {
                path: '/contestDetails/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/contestDetails/${params.id}`),
                element: <PrivateRoute><ContestDetails /></PrivateRoute>
            }
        ],
    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage />,
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Welcome />
            },
            // Creator path
            {
                path: 'addContest',
                element: <AddContest />
            },
            // Admin path
            {
                path: 'manageUser',
                element: <ManageUsers />
            },
            {
                path: 'manageContest',
                element: <ManageContests />
            }
        ]
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'signUp',
        element: <SignUp />
    }
])

export default router;