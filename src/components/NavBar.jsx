import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeIndianRupee, ClipboardList, Home, LogOutIcon, Menu, Users, X } from 'lucide-react'
import { userLogoutAPI } from '../api/UserAPI';
import toast from 'react-hot-toast';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await userLogoutAPI();
        if(response.status === 200) {
            toast.success(response.data.message)
            navigate('/login')
        } else {
            toast.error("Logout failed. Please try again!")
        }
    }
    return (
        <>
            <nav className='bg-black/40 h-16 w-full p-3'>
                <div className='flex justify-between items-center'>
                    {/* Hamburger Menu Icon*/}
                    <div className='md:hidden'>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className='text-white focus:outline-none'
                        >
                            {menuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                        </button>
                    </div>

                    <div className='p-2'>
                        <img 
                            src='/logo.svg' 
                            className='w-36'
                        />
                    </div>

                    <div 
                        className={`flex-col md:flex md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 absolute md:relative md:top-0 bg-black/40 md:bg-transparent md:visible transition-all duration-300 ${
                            menuOpen ? 'top-16 left-0 w-full p-4' : 'hidden md:flex'
                        }`}
                    >
                        <Link to='/dashboard' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <Home className='h-5 w-5' />
                            <span>Home</span>
                        </Link>
                        <Link to='/customers' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <Users className='h-5 w-5' />
                            <span>Customers</span>
                        </Link>
                        <Link to='/sales' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <BadgeIndianRupee className='h-5 w-5' />
                            <span>Record Sales</span>
                        </Link>
                        <Link to='/reports' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <ClipboardList className='h-5 w-5' />
                            <span>Report</span>
                        </Link>
                    </div>
                    <div className='flex'>
                        <div 
                            className='flex items-center px-4 hover:text-gray-300 space-x-2'
                            onClick={handleLogout}
                        >
                            <LogOutIcon />
                            <span className='hidden sm:inline-block'>Logout</span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar