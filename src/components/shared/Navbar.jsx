import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const links = <>
        <li>
            <NavLink to='/' className={({ isActive }) =>
                isActive
                    ? "text-primary pb-1 border-b-0 lg:border-b-2 border-secondary font-bold"
                    : "font-bold hover:text-secondary "
            }>
                Home</NavLink>
        </li>
        <li>
            <NavLink to='/allContest' className={({ isActive }) =>
                isActive
                    ? "text-primary pb-1 border-b-0 lg:border-b-2 border-secondary font-bold"
                    : "font-bold hover:text-secondary"
            }>
                All Contest</NavLink>
        </li>
        <li>
            <NavLink to='/leaderBoard' className={({ isActive }) =>
                isActive
                    ? "text-primary pb-1 border-b-0 lg:border-b-2 border-secondary font-bold"
                    : "font-bold hover:text-secondary"
            }>
                Leaderboard</NavLink>
        </li>

    </>
    const [theme, setTheme] = useState('light')
    // set theme state in localStorage on mount & also update localStorage on state change
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme]);

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light')
        }
    }
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully logged out!')
            })
            .catch(error => {
                toast.error(`${error.message}`)
            })
    }
    if (loading) {
        return <Spinner />
    }
    return (
        <div className="bg-base-50 shadow-md my-1 ">
            <div className="navbar py-3 lg:pt-6 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    {/* <Link> */}
                    {/* <img className=" w-[100px] h-[30px] bg-cover rounded-lg mr-1 lg:mr-3" src='/logo.png' alt="" /></Link> */}
                    <Link to='/' className="text-sm md:text-2xl lg:text-3xl text-primary font-black">Contest <span className=" text-secondary">Corner</span></Link>
                </div>
                <div className="navbar-end">
                    <div className="flex justify-center gap-3 items-center">
                        <div className="hidden lg:block">
                            <ul className="flex gap-5 items-center mr-3">
                                {links}
                            </ul>
                        </div>
                        <div className="dropdown dropdown-end">
                            {
                                user ?
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img alt="User pic" src={user?.photoURL} />
                                            </div>
                                        </div>
                                        <div tabIndex={0} className="mt-3 z-20 bg-base-200 space-y-2 shadow menu menu-sm dropdown-content rounded-box w-52 font-bold *:p-2 text-center">
                                            <p className="w-full hover:bg-gray-200">{user?.displayName}</p>
                                            <Link to='/dashboard' className="w-full hover:bg-gray-200 cursor-pointer">Dashboard</Link>
                                            <button className="hover:bg-gray-200" onClick={handleLogOut}>Logout</button>
                                        </div>
                                    </div>
                                    : <>
                                        <div className="flex gap-2 items-center">
                                            <Link to="login"><button className="btn btn-outline btn-xs hover:bg-secondary lg:btn-sm border-primary text-primary">LogIn </button></Link>
                                        </div>
                                    </>
                            }
                        </div>
                        <div>
                            <label className="cursor-pointer grid place-items-center">
                                <input onClick={handleToggle} type="checkbox" value="dark]" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                                <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                                <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar;