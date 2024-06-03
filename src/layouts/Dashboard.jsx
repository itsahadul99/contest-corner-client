import { Outlet } from "react-router-dom";
import Sidebar from "../page/Dashboard/Sidebar/Sidebar";
import Container from "../components/shared/Container";

const Dashboard = () => {
    return (
        <div className='relative min-h-screen md:flex'>
            <Sidebar />
            <div className='flex-1 lg:ml-64 bg-white'>
                <div className='p-5'>
                    <Container>
                        <Outlet />
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;