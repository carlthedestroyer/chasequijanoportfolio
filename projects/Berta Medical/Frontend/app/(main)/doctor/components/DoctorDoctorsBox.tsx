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

const DoctorDoctorsBox = () => {
  return (
    <DataBox title="Doctors">
                        <div className="flex flex-row items-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                            <FaUserDoctor size={50} className="rounded-full outline outline-2" />
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold">Dr. Zhang</p>
                                <p className="text-sm lg:text-lg xl:text-xl opacity-80 text-indigo-500">Chief Software Officer</p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold text-green-400">Available</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                            <FaUserDoctor size={50} className="rounded-full outline outline-2" />
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold">Dr. Quijano</p>
                                <p className="text-sm lg:text-lg xl:text-xl opacity-80 text-indigo-500">Chief Executive Officer</p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold text-green-400">Available</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                            <FaUserDoctor size={50} className="rounded-full outline outline-2" />
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold">Dr. Sajjad</p>
                                <p className="text-sm lg:text-lg xl:text-xl opacity-80 text-indigo-500">Chief Business Officer</p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold text-green-400">Available</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                            <FaUserDoctor size={50} className="rounded-full outline outline-2" />
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold">Luke</p>
                                <p className="text-sm lg:text-lg xl:text-xl opacity-80 text-indigo-500">AWS/Cloud Administrator</p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold text-green-400">Available</p>
                            </div>
                        </div>
                </DataBox>
  )
}

export default DoctorDoctorsBox