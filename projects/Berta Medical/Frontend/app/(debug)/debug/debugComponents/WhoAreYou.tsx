import Link from 'next/link'
import React from 'react'

const WhoAreYou = () => {
  return (
    <div className="absolute w-full h-full bg-black flex flex-col justify-center items-center">
          <div className="text-red-500 text-[100px]">
            I don&apos;t recognize you...
          </div>
          <div className="text-red-400 text-[50px]">
            How did you get here?
          </div>
          <Link href="/login" className="bg-red-400 hover:bg-red-500 rounded-[20px] p-2 mt-10 text-[30px]">
            Go Back
          </Link>
        </div>
  )
}

export default WhoAreYou