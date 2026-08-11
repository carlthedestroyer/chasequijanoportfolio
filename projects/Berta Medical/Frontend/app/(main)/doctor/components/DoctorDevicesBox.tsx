import React from 'react'
import Divider from "@/components/Divider";
import { FaUserCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";
import { BsLightningChargeFill } from "react-icons/bs";
import Image from "next/image";
import DataBox from './DoctorDataBox';

const DoctorDevicesBox = () => {
  return (
    <DataBox title="My Devices">

        <div className='2xl:space-x-4 space-y-4 2xl:space-y-0 lg:flex h-max sm:w-[65%] md:w-full sm:flex sm:flex-row sm:space-y-0 sm:space-x-4 lg:flex-col lg:space-x-0 lg:space-y-4 2xl:flex-row sm:h-48 lg:overflow-scroll 2xl:overflow-hidden'>
            <div className="relative text-center items-start justify-start flex flex-col outline outline-1 h-full w-full  outline-gray-400 rounded-[20px] p-6">
                <Image src="/renders/ecgdevboardp2.png" alt="neologo" width={130} height={80} className="ml-auto"/>
                <div className="">
                    <div className="flex flex-col gap-2 min-w-40">
                        <h1 className="text-left text-5xl font-bold absolute left-4 top-2">
                            EEG
                        </h1>
                        <h2 className="font-bold text-left absolute bottom-0">
                            <p className="absolute bottom-12 -left-2">
                            Status
                            </p>
                            <p className="bg-green-400 px-2 py-1 rounded-full text-center mt-1 absolute bottom-2 left-[4.5rem]">
                            Connected
                            </p>
                            <p className="bg-yellow-400 px-2 py-1 rounded-full text-center absolute bottom-2 -left-4">
                                Logging
                            </p>
                        </h2>
                    </div>
                </div>
            </div>
            <div className="relative text-center items-start justify-start flex flex-col outline outline-1 h-full w-full  outline-gray-400 rounded-[20px] p-6">
                <Image src="/renders/ecgpuck1.png" alt="neologo" width={100} height={80} className="ml-auto mt-4"/>
                <div className="">
                    <div className="flex flex-col gap-2 min-w-40">
                        <h1 className="text-left text-5xl font-bold absolute left-4 top-2">
                            ECG
                        </h1>
                        <h2 className="font-bold text-left absolute bottom-0">
                            <p className="absolute bottom-12 -left-2">
                            Status
                            </p>
                            <p className="bg-green-400 px-2 py-1 rounded-full text-center mt-1 absolute bottom-2 left-[4.5rem]">
                            Connected
                            </p>
                            <p className="bg-yellow-400 px-2 py-1 rounded-full text-center absolute bottom-2 -left-4">
                                Logging
                            </p>
                        </h2>
                    </div>
                </div>
            </div>
            <div className="relative text-center items-start justify-start flex flex-col outline outline-1 h-full w-full  outline-gray-400 rounded-[20px] p-6">
                <Image src="/renders/ecgpuck4.png" alt="neologo" width={100} height={80} className="ml-auto mt-4"/>
                <div className="">
                    <div className="flex flex-col gap-2 min-w-40">
                        <h1 className="text-left text-5xl font-bold absolute left-4 top-2">
                            Dev
                        </h1>
                        <h2 className="font-bold text-left absolute bottom-0">
                            <p className="absolute bottom-12 -left-2">
                            Status
                            </p>
                            <p className="bg-green-400 px-2 py-1 rounded-full text-center mt-1 absolute bottom-2 left-[4.5rem]">
                            Connected
                            </p>
                            <p className="bg-yellow-400 px-2 py-1 rounded-full text-center absolute bottom-2 -left-4">
                                Logging
                            </p>
                        </h2>
                    </div>
                </div>
            </div>
            
        </div>

    </DataBox>
  )
}

export default DoctorDevicesBox