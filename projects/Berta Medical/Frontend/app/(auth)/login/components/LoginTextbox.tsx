"use client"
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import TextboxContainer from '@/components/text-boxes/TextboxContainer'
import Link from 'next/link'
import InputBox from './InputBox'
import Image from 'next/image'
import { getCsrfToken, signIn } from 'next-auth/react'
import neologo from '../../../../public/neologo.png'
import { redirect, useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'

const LoginTextbox = () => {
  const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const tryLogin = () => {
    if (!username || !password) {
      setErrorMessage('Username or password is required. [400]');
      setSuccessMessage('');
      return;
    }
    response();
    return setErrorMessage('');
    // setSuccessMessage('Account successfully created, Berta! [200]');
  }

  const response = async () => {
    
    signIn('credentials', {
      username: username,
      password: password,
      redirect: false, // Set false when fixed.
      callbackUrl: '/',
    })
    .then ((res) => {
        console.log('Username: ' + username + ' Password: ' + password)
        console.log(res);
        if (res?.error) {
            setErrorMessage("Your username or password is invalid. [401]");
            setSuccessMessage('');
            return;
        }
        if (res?.ok) {
            setErrorMessage('');
            setSuccessMessage('Login Success. [200]');
            router.push('/'); // <- Login Fixed (somehow)
            // redirect('/');
            // NextResponse.redirect(new URL('/','http://localhost:3000'))
        }
    })
    .catch((error) => {
        setErrorMessage(error.message);
        console.log(error);
    });
    }

  const handleClear = () => {
    setUsername('');
    // setEmail('');
    setPassword('');
  }
  

    return (
    <TextboxContainer className="relative z-10 flex flex-col items-center w-full">    

        {/* <div className='flex-row flex justify-center w-full pb-5'>
            <motion.button className='bg-gray-400 bg-opacity-20 w-full rounded-tl-[20px] py-3 hover:bg-indigo-400 flex flex-row justify-center items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div>
                    Patient
                </div>
            </motion.button>
            <motion.button className='bg-gray-400 bg-opacity-20 w-full rounded-tr-[20px] py-3 hover:bg-indigo-400 flex flex-row justify-center items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
                <div>
                    Doctor
                </div>
            </motion.button>
        </div> */}
        
        <div className='px-4 py-2 sm:px-12 sm:p-10 w-full'>
            <div className="space-y-3 w-full">

                <div className="justify-center flex pt-2">
                    {/* <h1 className="text-[65px] font-bold py-3 pointer-events-none">
                    Welcome.
                    </h1> */}
                    <Image
                    src={neologo}
                    alt="neologo"
                    className='w-[25%] sm:w-[30%]'
                    />
                </div>

                <div className="w-full pt-2 pl-2">
                {errorMessage && (<div className="text-red-400 font-bold">{errorMessage}</div>)}
                {successMessage && (<div className="text-green-400 font-bold">{successMessage}</div>)}
                </div>

                <div className="space-y-4 sm:space-y-12 w-full">
                    <div className="text-[3vh] sm:text-[20px]">
                        <InputBox tabIndex={1} placeholder="Username" inputType="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="text-[3vh] sm:text-[20px]">
                        <InputBox tabIndex={2} placeholder="Password" inputType="password" value={password} onChange={(e) => setPassword(e.target.value)}/>  
                    </div>
                    <div className="w-full flex justify-center pt-3">
                        <motion.button 
                            onClick={() => {tryLogin(); handleClear();}}
                            whileHover={{opacity: 0.8}} 
                            whileTap={{scale: 0.975}} 
                            className="outline outline-1 outline-gray-300 hover:outline-0 bg-gradient-to-tr hover:from-indigo-500 hover:to-[#C084FC] w-[65%] sm:w-[100%] rounded-[5px] sm:rounded-[10px] text-[25px] py-1 sm:py-2">
                            Sign in
                        </motion.button>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-8 pb-2">
                        <div className="w-full flex flex-col items-center">
                            <Link href="/password-reset" className="text-gray-400 text-base w-max">
                                <motion.button whileHover={{opacity: 0.8}} whileTap={{scale: 0.975}}>
                                    Forgot your password? 
                                </motion.button>
                            </Link>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <Link href="/register" className="text-gray-400 text-sm w-max">
                                <motion.button whileHover={{opacity: 0.8}} whileTap={{scale: 0.975}}>
                                    Don&apos;t have an account?
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TextboxContainer>
  )
}

export default LoginTextbox