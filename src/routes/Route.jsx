import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../page/Home/Home";
import Login from "../page/Authentication/Login";
import SignUp from "../page/Authentication/SignUp";
import AllContest from "../page/AllContest";
import ContestDetails from "../page/ContestDetails";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
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
        path: 'login',
        element: <Login />
    },
    {
        path: 'signUp',
        element: <SignUp />
    }
])

export default router;