"use client"
import React from 'react'
import {motion} from 'framer-motion'

type input = {
  children? : React.ReactNode
}

const LoginBackground = ({children} : input) => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        // 105px
        id="login-background"
        className="my-0 absolute w-full h-full bg-black bg-opacity-60 opacity-60 bg-gradient-to-tr from-indigo-400 via-teal-800 to-[#C084FC] rounded-[20px] blur-[60px] sm:blur-[110px]"
        transition={{ duration: 1, ease: "easeIn", delay: 0.25 }}
    >
        {children}
    </motion.div>
  );
}

export default LoginBackground