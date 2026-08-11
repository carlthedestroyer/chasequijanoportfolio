"use client"
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import TextboxContainer from '@/components/text-boxes/TextboxContainer'
import MoveUp from '@/components/animations/MoveUp'
import Link from 'next/link'
import InputBox from './InputBox'
import LoginBackground from './LoginBackground'
import Image from 'next/image'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getCsrfToken, signIn } from 'next-auth/react'
import neologo from '../../../../public/neologo.png'
import { useRouter } from 'next/navigation'

const DebugComponent = () => {
  const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const tryLogin = () => {
    if (!username || !password) {
      setErrorMessage('Invalid Input, Berta. [400]');
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
      redirect: true, // Set false when fixed.
      callbackUrl: '/',
    })
    .then ((res) => {
        if (res?.error == 'CredentialsSignin') {
            setErrorMessage("Your username or password is invalid, Berta. [401]");
            setSuccessMessage('');
            return;
        }
        if (res?.ok) {
            setErrorMessage('');
            setSuccessMessage('Login Success, [200]');
            router.push('/');
        }
        console.log(res);
    })
    .catch((error) => {
        setErrorMessage(error.message);
    });
    }

  const handleClear = () => {
    setUsername('');
    // setEmail('');
    setPassword('');
  }

    return (
    <TextboxContainer className="relative z-10 flex flex-col items-center">    

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
        
        <div className='px-12 p-10'>
            <div className="space-y-4">

                <div className="justify-center flex pt-2 pb-10">
                    {/* <h1 className="text-[65px] font-bold py-3 pointer-events-none">
                    Welcome.
                    </h1> */}
                    <Image
                    src={neologo}
                    alt="neologo"
                    width={100} height={100}
                    />
                </div>

                <div className="min-w-max">
                {errorMessage && (<div className="text-red-400 font-bold">{errorMessage}</div>)}
                {successMessage && (<div className="text-green-400 font-bold">{successMessage}</div>)}
                </div>

                <div className="space-y-2">
                    <div className="space-y-2 text-[20px]">
                        <InputBox placeholder="Username" inputType="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="space-y-2 text-[20px]">
                        <InputBox placeholder="Password" inputType="password" value={password} onChange={(e) => setPassword(e.target.value)}/>  
                    </div>
                    <div className="w-full flex justify-center">
                        <motion.button 
                            onClick={() => {tryLogin(); handleClear();}}
                            whileHover={{opacity: 0.8}} 
                            whileTap={{scale: 0.975}} 
                            className="bg-gradient-to-tr from-indigo-400 to-[#C084FC] w-[100%] rounded-[10px] text-[25px] py-2">
                            Login
                        </motion.button>
                    </div>
                    <div className="flex flex-row gap-8">
                        <div className="w-full flex flex-col items-center">
                            <Link href="/password-reset" className="text-gray-400 text-base w-max">
                                <motion.button whileHover={{opacity: 0.8}} whileTap={{scale: 0.975}}>
                                    Forgot your password? 
                                </motion.button>
                            </Link>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <Link href="/register" className="text-gray-400 text-base w-max">
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

export default DebugComponent