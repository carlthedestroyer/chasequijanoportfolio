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
import DataBox from './DataBox';

const MyDoctorBox = () => {
  return (
    <DataBox title="My Doctor">
                    <div className="flex flex-row items-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                        <FaUserDoctor size={50} className="rounded-full outline outline-2" />
                        <div>
                            <p className="text-3xl lg:text-4xl font-bold">Dr. Sajjad II</p>
                            <p className="text-sm lg:text-lg xl:text-xl opacity-80">Chief Cardiologist</p>
                            <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold text-green-400">Available</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-3xl lg:text-4xl font-bold">Appointment</p>
                        <p className="text-sm lg:text-lg xl:text-xl opacity-80">Scheduled for:</p>
                        <p className="text-sm lg:text-lg xl:text-xl opacity-80 bg-purple-700 w-max rounded-xl p-2">4/5/2024 5:30 PM EST</p>
                    </div>
                    <div>
                        <p className="text-base lg:text-lg xl:text-xl opacity-80">Doctor&apos;s Notes:</p>
                        <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold">- Take cholesterol medication twice a day with water.</p>
                        <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold">- Consume less saturated fats and avoid red meat.</p>
                    </div>
                </DataBox>
  )
}

export default MyDoctorBox