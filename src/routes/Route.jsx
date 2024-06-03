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
import ManageUsers from "../page/Dashboard/Admin/ManageUsers";
import ManageContests from "../page/Dashboard/Admin/ManageContests";
import MyCreatorContest from "../page/Dashboard/Creator/MyCreatorContest";
import AddContest from "../page/Dashboard/Creator/AddContest";
import MySubmittedPage from "../page/Dashboard/Creator/MySubmittedPage";
import Profile from "../page/Dashboard/NormalUser/Profile";
import Payment from "../page/Payment/Payment";
import MyParticipantContest from "../page/Dashboard/NormalUser/MyParticipantContest";
import EditContest from "../page/Dashboard/Creator/EditContest";

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
                element: <AllContest />,
                loader: () =>  fetch(`${import.meta.env.VITE_API_URL}/contestCount`)
            },
            {
                path: '/contestDetails/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/contestDetails/${params.id}`),
                element: <PrivateRoute><ContestDetails /></PrivateRoute>
            },
            {
                path: '/payment/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/payment/${params.id}`),
                element: <Payment />
            }
        ],
    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage />,
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
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
            {
                path: 'myCreated',
                element: <MyCreatorContest />
            },
            {
                path: 'contestSubmitted',
                element: <MySubmittedPage />
            },
            {
                path: 'editContest/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/editContest/${params.id}`),
                element: <EditContest />
            },
            // Admin path
            {
                path: 'manageUser',
                element: <ManageUsers />
            },
            {
                path: 'manageContest',
                element: <ManageContests />
            },
            // Normal user
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'myContest',
                element: <MyParticipantContest />
            },

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