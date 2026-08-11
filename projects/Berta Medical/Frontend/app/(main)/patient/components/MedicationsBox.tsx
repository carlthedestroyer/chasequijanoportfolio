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

const MedicationsBox = () => {
  return (
    <DataBox title="My Medications">

                    <div className="flex justify-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                        <div>
                            <div className="flex items-center justify-center h-[5rem]">
                                <Image src="/medicine.png" alt="neologo" width={80} height={80}/>
                            </div>
                            <div>
                                <p className="text-3xl lg:text-4xl xl:text-2xl font-bold">Bivaliruden</p>
                                <p className="text-sm lg:text-lg xl:text-xl opacity-80 text-red-500">Intravaneous Use Only</p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80">Refill by: <span className="font-bold">4/26/2024</span></p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold">Tap for drug information</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                        <div>
                            <div className="flex items-center justify-center h-[5rem]">
                                <Image src="/medicine3.png" alt="neologo" width={80} height={80}/>
                            </div>                            
                            <div>
                                <p className="text-3xl lg:text-4xl xl:text-2xl font-bold">Ibuprofen</p>
                                <p className="text-sm lg:text-lg xl:text-xl opacity-80 text-red-500"><span className="font-bold">1</span> pill every <span className="font-bold">4-6 hours</span></p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80">Refill by: <span className="font-bold">5/11/2024</span></p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold">Tap for drug information</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 bg-gray-200 p-2 rounded-[10px]">
                        <div>
                            <div className="flex items-center justify-center h-[5rem]">
                                <Image src="/medicine2.png" alt="neologo" width={80} height={80}/>
                            </div>                            
                            <div>
                                <p className="text-3xl lg:text-4xl xl:text-2xl font-bold">Lisinopril</p>
                                <p className="text-sm lg:text-lg xl:text-xl opacity-80 text-red-500"><span className="font-bold">1</span> pill every <span className="font-bold">24 hours</span></p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80">Refill by: <span className="font-bold">2/05/2024</span></p>
                                <p className="text-xs lg:text-base xl:text-xl opacity-80 font-bold">Tap for drug information</p>
                            </div>
                        </div>
                    </div>

                </DataBox>
  )
}

export default MedicationsBox