import { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import useRole from '../../../hooks/useRole'
import UserMenu from './Menu/UserMenu'
import CreatorMenu from './Menu/CreatorMenu'
import AdminMenu from './Menu/AdminMenu'
const Sidebar = () => {
    const [isActive, setActive] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [role, isLoading] = useRole()
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between lg:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/' className="text-sm md:text-2xl lg:text-3xl text-primary font-black">Contest <span className=" text-secondary">Corner</span></Link>
                    </div>
                </div>
                <button onClick={handleToggle} className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'>
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'} md:translate-x-0  transition duration-200 ease-in-out`} >
                <div>
                    <div>
                        <div className='w-full hidden md:flex mx-auto px-2 py-2 shadow-lg rounded-sm'>
                            <Link to='/' className="text-sm md:text-2xl lg:text-3xl text-primary font-black">Contest <span className="text-secondary">Corner</span></Link>
                        </div>
                    </div>
                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {role === "user" && <UserMenu />}
                            {role === "creator" && <CreatorMenu />}
                            {role === "admin" && <AdminMenu />}
                        </nav>
                    </div>
                    <hr className='h-1 bg-gray-200' />
                </div>
            </div>
        </>
    )
}

export default Sidebar