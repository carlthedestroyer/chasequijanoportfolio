"use client";
import Image from "next/image";
import { motion, useCycle } from 'framer-motion';

const ECGDBimages = ["/renders/ecgdevboardp1.png", "/renders/ecgdevboardp2.png", "/renders/ecgdevboardp3.png", "/renders/ecgdevboardp4.png"];
const ECGPimages = ["/renders/ecgpuck.png", "/renders/ecgpuck1.png", "/renders/ecgpuck2.png", "/renders/ecgpuck3.png", "/renders/ecgpuck4.png", "/renders/ecgpuck5.png"];

export default function Products() {
    const [currentImage, nextImage] = useCycle(...ECGDBimages);
    const [currentPuck, nextPuck] = useCycle(...ECGPimages);
    return (
        <>
            {/* Product Overall */}
            <div>
                {/* Product Landing Page */}
                <div className="h-screen w-full">
                    <Image className="blur-[9px] z-0" src="/assembly.webp" alt="ecgdevboardp1" fill/>
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="h-max w-max p-10 bg-gray-300 bg-opacity-40 z-10 rounded-[20px] sm:rounded-[60px]">
                            <h1 className="text-[3rem] sm:text-[10rem] font-bold text-blue-700">
                                Products
                            </h1>
                        </div>
                    </div>
                </div>

                {/* ECG Dev Board Section */}
                <div className="h-screen w-full bg-blue-600">
                    <div className="flex flex-col items-center">
                        <motion.img
                        key={currentImage}
                        src={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => nextImage()}
                        className="h-96 w-96"
                        />
                    </div>
                </div>

                {/* ECG Puck Section */}
                <div className="h-screen w-full bg-blue-700">
                    <div className="flex flex-col items-center">
                        <motion.img
                        key={currentPuck}
                        src={currentPuck}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => nextPuck()}
                        className="h-96 w-96"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}