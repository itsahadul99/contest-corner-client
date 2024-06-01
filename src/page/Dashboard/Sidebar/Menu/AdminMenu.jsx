import { MdManageHistory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import MenuItem from './MenuItem'
const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={FaUsers} label='Manage User' address='manageUser' />
            <MenuItem icon={MdManageHistory} label='Manage Contests' address='manageContest' />
        </>
    );
};

export default AdminMenu;