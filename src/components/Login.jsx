import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { LockKeyhole, LogIn, MailIcon } from 'lucide-react'

import InputField from './ui/InputField'
import Button from './ui/Button'
import { userLoginAPI } from '../api/UserAPI'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault();
        
        try {
            const response = await userLoginAPI(email, password);
            if(response.status === 200) {
                navigate('/dashboard');
                toast.success(response.data.message)
            } else {
                toast.error("Login Failed. Please try again!")
            }
        } catch (error) {
            if(axios.isAxiosError(error) && error.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Unexpected error occured. Please try again!")
            }
        }
    }

    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <div className='absolute inset-0 z-0'>
                <img 
                    src='../src/assets/layered-waves.svg'
                    alt='waves'
                    className='absolute bottom-0 left-0 w-full'
                />
            </div>
            
            <div className='relative z-10 w-auto px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md mx-auto lg:max-w-xl'>
                    <div className='bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden'>
                        <form onSubmit={handleLogin} className='p-6 sm:p-10 space-y-6'>
                            <div className='flex justify-center'>
                                <img 
                                    src='../src/assets/logo.svg'
                                    alt='invocloud'
                                    className='w-40'
                                />
                            </div>
                            <h1 className='text-sm sm:text-sm text-center font-bold'>
                                Login to Your Account
                            </h1>

                            {errorMessage && (
                                <p className='text-red-500 text-center'>{errorMessage}</p>
                            )}
                            
                            <div className='space-y-4'>
                                <InputField 
                                    name='email'
                                    type='email'
                                    id='email'
                                    placeholder='Email'
                                    label='Email'
                                    icon={MailIcon}
                                    className='w-full'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputField 
                                    name='password'
                                    type='password'
                                    id='password'
                                    placeholder='Password'
                                    label='Password'
                                    icon={LockKeyhole}
                                    className='w-full'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                
                                <div className='flex justify-center items-center pt-4'>
                                    <Button 
                                        type='submit' 
                                        icon={LogIn}
                                        className='w-full sm:w-auto'
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login