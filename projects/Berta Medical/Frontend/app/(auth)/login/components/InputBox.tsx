"use client"
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

type Input = {
    placeholder?: string
    inputType?: string
    value?: string
    tabIndex?: number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBox = ({placeholder, inputType, value, tabIndex, onChange} : Input) => {
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      setIsFocused(false);
    }, []);
  return (
  <div className="relative">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isFocused ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="absolute w-full rounded-md h-[0.1rem] bg-indigo-500 z-50"
      style={{ bottom: -1 }}
    />
    <motion.div
      whileHover={{ opacity: 0.8 }}
      whileTap={{ scale: 0.995 }}
    >
      <input
        type={inputType}
        value={value}
        onChange={(event) => onChange(event)}
        tabIndex={tabIndex}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="text-white rounded-[5px] text-[1.1rem] w-full min-h-[3rem] pl-2 py-2 bg-transparent outline-none 
        transition-all duration-300 ease-in-out sm:placeholder-shown:text-[1.1rem] sm:placeholder-shown:opacity-100 sm:focus:placeholder-shown:text-[0.9rem] sm:focus:placeholder-shown:opacity-100"
        placeholder={placeholder}
      />
      <div className="absolute w-full rounded-md h-[1px] sm:h-[0.01rem] bg-white z-0 opacity-40" />
    </motion.div> 
  </div>
  )
}

export default InputBox