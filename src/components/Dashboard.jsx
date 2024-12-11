import React, { useEffect } from 'react'
import { fetchDashboardAPI } from '../api/UserAPI'

const Dashboard = () => {

    useEffect(() => {
        const fetchDashboard = async() => {
            const response = await fetchDashboardAPI();
        }
        fetchDashboard()
    }, [])
    
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard