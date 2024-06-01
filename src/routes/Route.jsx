import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../page/Home/Home";
import Login from "../page/Authentication/Login";
import SignUp from "../page/Authentication/SignUp";
import AllContest from "../page/AllContest";
import ContestDetails from "../page/ContestDetails";

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
                path: '/contestDetails',
                element: <ContestDetails />
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