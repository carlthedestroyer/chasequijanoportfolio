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

const DoctorAnalyticsBox = () => {
  return (
    <DataBox title="Patient Analytics">
        
        <div className="text-center items-center flex flex-col outline outline-1 h-full w-full outline-gray-400 rounded-[20px] p-6">
            <FaHeart color="crimson" size={50}/>
            <p className="text-3xl mt-2">67 <span className="text-sm">bpm</span></p>
            <p>avg. resting heart rate</p>
            <div className="flex flex-row gap-1 items-center">
            <TbTriangleInvertedFilled color="red" size={11} /><p className="text-sm opacity-80">2 bpm since last week</p>
            </div>
        </div>
        
        <div className="text-center items-center flex flex-col outline outline-1 h-full w-full  outline-gray-400 rounded-[20px] p-6">
            <BsLightningChargeFill color="#ffe600" size={50} />
            <p className="text-3xl mt-2">360</p>
            <p>total active minutes</p>
            <div className="flex flex-row gap-1 items-center">
                <IoTriangle color="lime" size={11}/><p className="text-sm opacity-80">138 min since last week</p>
            </div>
        </div>
        
        <div className="text-center items-center flex flex-col outline outline-1 h-full w-full  outline-gray-400 rounded-[20px] p-6">
            <FaFire color="orange" size={50}/>
            <p className="text-3xl mt-2">3,122</p>
            <p>avg. daily calorie burn</p>
            <div className="flex flex-row gap-1 items-center">
                <IoTriangle color="lime" size={11}/><p className="text-sm opacity-80">284 cals. over last week</p>
            </div>
        </div>

    </DataBox>
  )
}

export default DoctorAnalyticsBox