"use client"
import React from 'react'
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { useEffect, useState } from 'react';

const DebugPanel = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addItem = () => {
    if (!username || !password) {
      setErrorMessage('One or more required fields are empty. [400]');
      setSuccessMessage('');
      return;
    }
    fetch('/api/add-user', {
      method: "POST",  
      body: 
        JSON.stringify({
          username: username,
          email: email,
          password: password
        })
    })
    return setErrorMessage(''), setSuccessMessage('Account successfully created! [200]');
  }

  const handleClear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  }
    

  const clearTable = () => {
    // DO NOT
    console.log("Request sent to Postgres to DROP table Pets. (Disfunctional duh)")
  }

  return (
    <div className="rounded-md z-10 relative w-max h-full flex flex-col gap-4 bg-gray-500 bg-opacity-30 p-3 justify-center items-center">
        <div className="flex flex-col justify-center items-center font-bold text-white">
          <h1 className="text-3xl bg-gradient-to-tr from-indigo-400 via-blue-400 to-[#C084FC] bg-clip-text text-transparent">
            Le Debug Panel
          </h1>
          <h2 className="text-red-500">
            Do not send sensitive data!
          </h2>
        </div>

        {errorMessage && (<div className="text-red-800 font-bold">{errorMessage}</div>)}
        {successMessage && (<div className="text-green-800 font-bold">{successMessage}</div>)}
        <input id="emailInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-md outline-2 text-black pl-2"/>
        <input id="nameInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="rounded-md outline-2 text-black pl-2"/>
        <input id="ownerInput" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-md outline-2 text-black pl-2"/>
        <div className="flex flex-col gap-2 items-center">
          <button onClick={() => {addItem(); handleClear();}} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold p-2 rounded w-max">
            Submit to Postgres
          </button>
        </div>
    </div>
  )
}

export default DebugPanel