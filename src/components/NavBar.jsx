import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, Home, LogOutIcon, Menu, Users, X } from 'lucide-react'

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                            src='../src/assets/logo.svg' 
                            className='w-36'
                        />
                    </div>

                    <div 
                        className={`flex-col md:flex md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 absolute md:relative md:top-0 bg-black/40 md:bg-transparent md:visible transition-all duration-300 ${
                            menuOpen ? 'top-16 left-0 w-full p-4' : 'hidden md:flex'
                        }`}
                    >
                        <Link to='#' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <Home className='h-5 w-5' />
                            <span>Home</span>
                        </Link>
                        <Link to='#' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <Users className='h-5 w-5' />
                            <span>Customers</span>
                        </Link>
                        <Link to='#' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <ClipboardList className='h-5 w-5' />
                            <span>Report</span>
                        </Link>
                    </div>
                    <div className='flex'>
                        <Link to='/logout' className='flex items-center px-4 hover:text-gray-300 space-x-2'>
                            <LogOutIcon />
                            <span className='hidden sm:inline-block'>Logout</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar