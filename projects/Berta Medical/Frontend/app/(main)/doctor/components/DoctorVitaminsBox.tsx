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

const DoctorVitaminsBox = () => {
  return (
    <DataBox title="Assigned Vitamins">
                    <div className="flex justify-center items-center w-full">
                        <p className="text-3xl font-bold text-blue-500">B12</p>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <p className="text-3xl font-bold text-blue-500">Omega 3</p>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <p className="text-3xl font-bold text-blue-500">D12</p>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <p className="text-3xl font-bold text-blue-500">C2</p>
                    </div>
                </DataBox>
  )
}

export default DoctorVitaminsBox