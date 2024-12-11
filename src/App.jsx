import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import './App.css'
import UserRoutes from './routes/UserRoutes';

const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<UserRoutes />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App