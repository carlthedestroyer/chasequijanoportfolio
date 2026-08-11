"use client"
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import TextboxContainer from '@/components/text-boxes/TextboxContainer'
import MoveUp from '@/components/animations/MoveUp'
import Link from 'next/link'
import InputBox from './InputBox'
import LoginBackground from './LoginBackground'
import Image from 'next/image'
import LoginTextbox from './LoginTextbox'
import DebugComponent from './DebugComponent'

const LoginPanel = () => {
    const [active, setActive,] = useState(false);

    useEffect(() => {
      setActive(true);
    }, []);

  return (
    <div className="w-full h-full flex justify-center items-center snap-center">
        {/* Control size of panel here Default: w-full */}
        <div id="inputComponent" className="w-[80%] sm:w-max mx-7">
            <div className={`relative w-[100%] transition-opacity duration-[800ms] ease-in-out ${active ? 'opacity-100 delay-[100ms]' : 'opacity-0'}`}>
                <LoginBackground/>
                <MoveUp>
                    <LoginTextbox/>
                </MoveUp>
            </div>
        </div>
    </div>
  )
}

export default LoginPanel