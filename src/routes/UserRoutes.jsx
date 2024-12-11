import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={ <LoginPage />} />
            <Route path='/dashboard' element={ <DashboardPage /> } />
        </Routes>
    )
}

export default UserRoutes