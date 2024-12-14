import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import CustomerPage from '../pages/CustomerPage'

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={ <LoginPage />} />
            <Route path='/' element={ <LoginPage />} />
            
            <Route path='/dashboard' element={ <DashboardPage /> } />
            <Route path='/customers' element={ <CustomerPage /> } />
        </Routes>
    )
}

export default UserRoutes