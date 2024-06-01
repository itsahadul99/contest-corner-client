import { FaTrophy } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FcSettings } from 'react-icons/fc'
import MenuItem from './MenuItem'
const UserMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCheck} label='My Participated Contest' address='myContest'/>
      <MenuItem icon={FaTrophy} label='My Winning Contest Page' address='myWinningContest'/>
      <MenuItem icon={FcSettings} label='My Profile' address='profile'/>
    </>
  )
}

export default UserMenu