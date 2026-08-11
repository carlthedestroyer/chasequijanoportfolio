import Divider from "@/components/Divider";
import { FaUserCircle } from "react-icons/fa";
import DoctorAnalyticsBox from "./components/DoctorAnalyticsBox";
import DoctorDoctorsBox from "./components/DoctorDoctorsBox";
import DoctorVitaminsBox from "./components/DoctorVitaminsBox";
import DoctorMedicationsBox from "./components/DoctorMedicationsBox";
import DoctorDevicesBox from "./components/DoctorDevicesBox";
import DoctorMyDoctorBox from "./components/DoctorMyDoctorBox";
import DoctorInfo from "./components/DoctorInfo";
import DataBox from "../patient/components/DataBox";
import HeartRhythmGraph from "./components/graphs/HeartRhythmGraph";
import { FaFire, FaHeart } from "react-icons/fa6";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { BsLightningChargeFill } from "react-icons/bs";
import { IoTriangle } from "react-icons/io5";
import HRVvsAgePlot from "./components/graphs/HRVGraph";
import HRVPlot from "./components/graphs/HRVDataGraph";
import HRVDataGraph from "./components/graphs/HRVDataGraph";
import HRVGraph from "./components/graphs/HRVGraph";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";


export default function Doctor() {
    return (
        <div className="w-full h-full flex flex-col items-center lg:items-start">

            <div className="h-[4.5rem] w-full"></div>

            {/* Search Bar */}
            <div className="w-full flex flex-wrap gap-24 items-center">
                <div className="w-[60%] lg:w-[40%]">
                    <input type="text" placeholder="Search..." className="w-full h-10 px-4 outline outline-1 rounded-[20px] my-4 lg:ml-20 bg-transparent"/>
                </div>
                <div className="flex flex-wrap space-x-8 ml-24 bg-gray-200 bg-opacity-20 p-2 m-2 rounded-[10px]">
                    <FaRegCalendarAlt size={40} />
                    <HiOutlineChatAlt2 size={40} />
                    <BsFillCameraVideoFill size={40} />
                    <IoStatsChart size={40} />
                    <IoDocumentTextOutline size={40} />
                    <FaUserCog size={40} />
                    <IoSettingsOutline size={40} />
                    <ImExit size={40} />
                </div>
            </div>

            {/* Sidebar */}
            {/* <div className="fixed top-[4.5rem] w-full h-screen">
                <div className="bg-gray-700 h-[90%] w-full z-10">
                    <div className="rounded-r-[20px] bg-gray-600 h-full w-[80%] z-20"/>
                </div>
            </div> */}

            {/* Content */}
            <div className="w-full h-full flex flex-col xl:flex-row xl:flex items-start space-y-10 lg:space-y-0 lg:grid lg:px-16">
                <div className="w-full xl:w-[30%] h-max flex flex-col items-center lg:items-start lg:col-start-1 lg:p-2">
                    {/* Doctor Info */}
                    <DoctorInfo/>
                </div>
                <div className="w-full h-full flex flex-col items-center lg:items-start lg:col-start-2 lg:p-2">
                    <section className="w-[80%] lg:w-[98%] lg:h-[97%] flex flex-col items-center bg-white text-black rounded-[20px] space-y-4 p-4">
                        <h1 className='text-3xl font-bold'>Patient Analytics</h1>
                        <Divider/>
                        {/* width controls box size */}
                        <div className='space-y-4 w-[80%] lg:w-full sm:space-y-0 sm:gap-4 sm:grid lg:flex lg:flex-col'>
                            <div className="flex flex-col space-y-4 gap-4 lg:space-y-0 lg:flex-row justify-between w-full">
                                <div className="bg-gray-100 p-2 rounded-[10px]">
                                    <h1 className="text-2xl">Sinus Rhythm : <span className="text-green-700">NORMAL</span></h1>
                                    <p><span className="font-bold">John&apos;s</span> heart rhythm appears normal.</p>
                                </div>
                                <div className="flex flex-row space-x-4 bg-gray-100 p-2 rounded-[10px] mr-48">
                                    <FaHeart color="crimson" size={50}/>
                                    <div className="flex flex-col">
                                        <p>Average</p>
                                        <h1 className="text-2xl">85<span className="text-sm"> bpm</span></h1>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-4 bg-gray-100 p-2 rounded-[10px]">
                                    {/* <Image src="/renders/ecgproduct.png" width={50} height={50} alt="ECG"/> */}
                                    <div className="flex flex-col">
                                        <p>ECG</p>
                                        <h1 className="text-2xl">Model:<span className="text-sm"> SN28081280740998409812</span></h1>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 justify-end">
                                <div className="overflow-hidden col-span-2">
                                <HeartRhythmGraph hours={6} minutes={60} seconds={30} label graphName="Heart Rate 6H"/>
                                <HeartRhythmGraph hours={24} minutes={60} seconds={30} graphName="Heart Rate 24H"/>
                                </div>
                                <div className="w-full flex flex-wrap justify-end">
                                    <div className="text-center items-center flex flex-col outline outline-1 h-max w-[60%] outline-gray-400 rounded-[20px] p-6">
                                        <FaHeart color="crimson" size={50}/>
                                        <p className="text-3xl mt-2">67 <span className="text-sm">bpm</span></p>
                                        <p>avg. resting heart rate</p>
                                        <div className="flex flex-row gap-1 items-center">
                                        <TbTriangleInvertedFilled color="red" size={11} /><p className="text-sm opacity-80">2 bpm since last week</p>
                                        </div>
                                    </div>
                                    <div className="text-center items-center flex flex-col outline outline-1 h-max w-[60%]  outline-gray-400 rounded-[20px] p-6">
                                        <BsLightningChargeFill color="#ffe600" size={50} />
                                        <p className="text-3xl mt-2">360</p>
                                        <p>total active minutes</p>
                                        <div className="flex flex-row gap-1 items-center">
                                            <IoTriangle color="lime" size={11}/><p className="text-sm opacity-80">138 min since last week</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center items-center flex flex-col outline outline-1 h-max w-[60%]  outline-gray-400 rounded-[20px] p-6">
                                        <FaFire color="orange" size={50}/>
                                        <p className="text-3xl mt-2">3,122</p>
                                        <p>avg. daily calorie burn</p>
                                        <div className="flex flex-row gap-1 items-center">
                                            <IoTriangle color="lime" size={11}/><p className="text-sm opacity-80">284 cals. over last week</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="outline outline-1 w-full h-64 p-4 rounded-[10px]">
                                <p className="text-3xl lg:text-3xl font-bold">AI Analytics</p>
                                <p className="mt-2 bg-gray-200 h-[80%] p-2 rounded-[10px]">Based on the provided heart rate data and your medical history, it appears to be within a normal range (75-90). 
                                    There are outliers in the data but this can be expected in standard heart rates.
                                    If you feel that your health is not in line with the data, please contact your doctor.</p>
                                </div>
                            </div>


                        </div>      
                    </section>
                </div>

                <div className="w-full h-full xl:w-[40%] flex flex-col items-center lg:items-start lg:col-start-2 lg:p-2">
                    <section className="w-[80%] lg:w-[98%] lg:h-[97%] flex flex-col items-center bg-white text-black rounded-[20px] space-y-4 p-4">
                        <h1 className='text-3xl font-bold'>Data</h1>
                        <Divider/>
                        {/* width controls box size */}
                        <div className='space-y-4 w-[80%] lg:w-full sm:space-y-0 sm:gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col'>
                            <HRVGraph/>
                            <HRVDataGraph/>
                        </div>      
                    </section>
                </div>
                {/* <div className="w-full h-max flex flex-col items-center lg:items-start lg:col-start-3 lg:p-2 space-y-4">
                    <DoctorVitaminsBox/>
                    <DoctorMedicationsBox/>
                </div>
                <div className="w-full h-max flex flex-col items-center lg:items-start lg:col-start-4 lg:row-start-1 lg:p-2 space-y-6">
                    <DoctorMyDoctorBox/>
                </div> */}
            </div>

            {/* Search */}
            <div className="">
                {/* <h1>Search</h1> */}
            </div>
        </div>
    )
}