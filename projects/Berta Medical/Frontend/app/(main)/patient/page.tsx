import Divider from "@/components/Divider";
import DataBox from "./components/DataBox";
import { FaUserCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";
import { BsLightningChargeFill } from "react-icons/bs";
import Image from "next/image";
import AnalyticsBox from "./components/AnalyticsBox";
import DoctorsBox from "./components/DoctorsBox";
import VitaminsBox from "./components/VitaminsBox";
import MedicationsBox from "./components/MedicationsBox";
import DevicesBox from "./components/DevicesBox";
import MyDoctorBox from "./components/MyDoctorBox";
import { FiSettings } from "react-icons/fi";
import { FaBell } from "react-icons/fa";







export default function Patient() {
    return (
        <div className="w-full h-full flex flex-col items-center">

            <div className="h-[4.5rem] w-full"></div>

            {/* User */}
            <div className="w-full flex">
                <div className="m-2 mb-8 flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                    <input type="text" placeholder="Search..." className="w-[80%] lg:w-[40%] h-12 px-4 outline outline-1 rounded-[15px] lg:ml-10 lg:mt-4 bg-white text-2xl"/>
                    <div className="flex flex-row items-center space-x-6 mr-10">
                        <FaUserCircle size={50} color="cyan" />
                        <h1 className="text-4xl font-bold">Joe Smith</h1>
                        <FiSettings size={30}/>
                        <FaBell size={30}/>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            {/* <div className="fixed top-[4.5rem] w-full h-screen">
                <div className="bg-gray-700 h-[90%] w-full z-10">
                    <div className="rounded-r-[20px] bg-gray-600 h-full w-[80%] z-20"/>
                </div>
            </div> */}

            {/* Content */}
            {/* SPACE Y IS CAUSING THE TOP MARGINWWWWWWWWWWWWWWW */}
            <div className="w-full h-full flex flex-col items-start space-y-10 lg:space-y-0 lg:grid">
                {/* mt-10??? */}
                <div className="w-full h-full flex flex-col items-center lg:col-start-1 lg:p-2">
                    <AnalyticsBox/>
                </div>
                <div className="w-full h-full flex flex-col items-center lg:col-start-2 lg:p-2">
                    <DoctorsBox/>
                </div>
                <div className="w-full h-full flex flex-col items-center lg:items-start lg:col-start-3 lg:p-2 space-y-4">
                    <VitaminsBox/>
                    <MedicationsBox/>
                </div>
                <div className="w-full h-full flex flex-col items-center lg:col-start-4 lg:row-start-1 lg:p-1 space-y-6">
                    <div className="h-96 w-full flex items-center justify-center">
                        <DevicesBox/>
                    </div>
                    <MyDoctorBox/>
                </div>
                {/* 
                <AnalyticsBox/>
                <DoctorsBox/>
                <VitaminsBox/>
                <MedicationsBox/>
                <DevicesBox/>
                <MyDoctorBox/> 
                */}
            </div>

            {/* Search */}
            <div className="">
                {/* <h1>Search</h1> */}
            </div>
        </div>
    )
}