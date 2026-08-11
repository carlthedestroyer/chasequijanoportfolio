import Divider from '@/components/Divider'
import React from 'react'

type inputProps = {
    children: React.ReactNode
    title: string
}

const DoctorDataBox = ({children, title}: inputProps) => {
  return (
    <section className="w-[80%] lg:w-[98%] lg:h-[97%] flex flex-col items-center bg-white text-black rounded-[20px] space-y-4 p-4">

        <h1 className='text-3xl font-bold'>{title}</h1>

        <Divider/>

        {/* width controls box size */}
        <div className='space-y-4 w-[80%] lg:w-full sm:space-y-0 sm:gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col'>
            {children}
        </div>      

    </section>
  )
}

export default DoctorDataBox