import Divider from '@/components/Divider'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const DoctorInfo = () => {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4 lg:w-full">
                {/* User */}
                <div className="flex flex-col items-center outline outline-1 rounded-[20px] px-4 w-full">
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <FaUserCircle color={"cyan"} size={100} />
                        <h1 className="text-3xl">Logged in as:</h1>
                        <h1 className="text-4xl font-bold">James Taylor</h1>
                        <h1 className="text-2xl">Cardiologist</h1>
                        <Divider/>
                    </div>
                    <div className="flex flex-row items-center gap-4 my-2 mb-6 bg-gray-200 bg-opacity-10 rounded-[10px] p-4">
                        <FaUserCircle color={"gray"} size={40} />
                        <div>
                            <h1 className="text-xl">My Patient:</h1>
                            <h2>John Doe</h2>
                            <h2>Age: 27 Sex: M</h2>
                            <h2>+1-123-456-7890</h2>
                            <h2>johndoe@gmail.com</h2>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center outline outline-1 rounded-[20px] px-4 h-96 w-full">
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <h1 className="text-3xl">My Appointments:</h1>
                        <Divider/>
                    </div>
                    <div className="h-full overflow-scroll">
                        <div className="flex flex-row items-center gap-4 my-6">
                            <FaUserCircle color={"gray"} size={40} />
                            <div className="flex flex-col">
                                <h1 className="text-xl">Patient: John Doe</h1>
                                <h2>12:30PM - 1:30PM</h2>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 my-6">
                            <FaUserCircle color={"gray"} size={40} />
                            <div className="flex flex-col">
                                <h1 className="text-xl">Patient: Jason Hart</h1>
                                <h2>12:30PM - 1:30PM</h2>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 my-6">
                            <FaUserCircle color={"gray"} size={40} />
                            <div className="flex flex-col">
                                <h1 className="text-xl">Patient: Emily Tan</h1>
                                <h2>12:30PM - 1:30PM</h2>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 my-6">
                            <FaUserCircle color={"gray"} size={40} />
                            <div className="flex flex-col">
                                <h1 className="text-xl">Patient: Chris Hunt</h1>
                                <h2>12:30PM - 1:30PM</h2>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 my-6">
                            <FaUserCircle color={"gray"} size={40} />
                            <div className="flex flex-col">
                                <h1 className="text-xl">Patient: Michael Li</h1>
                                <h2>12:30PM - 1:30PM</h2>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 my-6">
                            <FaUserCircle color={"gray"} size={40} />
                            <div className="flex flex-col">
                                <h1 className="text-xl">Patient: Chase Quijano</h1>
                                <h2>12:30PM - 1:30PM</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
  )
}

export default DoctorInfo