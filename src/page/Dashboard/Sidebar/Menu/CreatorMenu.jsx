import MenuItem from "./MenuItem";
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdAddToPhotos } from "react-icons/md";
import { FcSettings } from 'react-icons/fc'
const CreatorMenu = () => {
    return (
        <>
            <MenuItem icon={MdAddToPhotos} label='Add Contest' address='addContest' />
            <MenuItem icon={BsFillHouseAddFill} label='My Created Contest' address='myCreated' />
            <MenuItem icon={FcSettings} label='Contest Submitted Page' address='contestSubmitted' />
        </>
    );
};

export default CreatorMenu;