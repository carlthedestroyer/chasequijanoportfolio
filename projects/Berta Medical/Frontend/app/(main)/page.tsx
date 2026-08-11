"use client"
import {motion} from 'framer-motion'
import TextboxContainer from '@/components/text-boxes/TextboxContainer';
import Textbox from '@/components/text-boxes/Textbox';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header-bar/Header';
import LandingPage from '@/components/content/landingPage/LandingPage';
import Divider from '@/components/Divider';
import Footer from '@/components/footer/Footer';
import ButtonHover from '@/components/interactive/ButtonHover';

export default function Home() {
  
  // <div className={`opacity-0 transition-opacity duration-1000 ease-in-out ${active ? 'opacity-100 delay-300' : 'opacity-0'}`}></div>
  // <div className={`transform ${active ? 'translate-y-0 delay-300' : 'translate-y-full'} p-3 transition-transform duration-1000 ease-in-out`}></div>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between z-0 bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]">
      
       {/* Header */}
      {/* <Header/> */}

      {/* Initial Landing Page */}  
      <LandingPage/>

      {/* Main Landing Page Body */}
      <div className="w-full">
        {/* <div className="absolute inset-x-0 w-full h-screen bg-black bg-opacity-0 backdrop-blur-[2px] opacity-80 z-10"></div> */}
        {/* <div className="absolute inset-x-0 h-screen w-full z-0 bg-opacity-0 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]"></div> */}
        <div className="absolute inset-x-0 mt-[18%] ml-[10%] h-96 max-w-6xl bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[88px]"></div>
        <div className="absolute inset-x-0 z-0 bg-gradient-to-b from-black w-full h-1/4"></div>

        {/* Content */}
        <div className="absolute inset-x-0 h-[100vh] bg-black z-0 opacity-85 blur-[50px]"></div>
        <div className="absolute inset-x-0 mt-[15%] h-[40vh] bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[88px]"></div>
        <div className="absolute inset-x-0 mt-[13%] h-[50vh] bg-black z-10"></div>
        <div id="content-component" className="w-full h-screen">
          <div className="flex h-full items-center">
          <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="z-30"
          animate={{y:-0}}
          transition={{ duration: 0.5, type: "spring", }}
          >
            <div id="textbox-container" className={`w-full pl-[5%] flex flex-col items-center`}>
              <Textbox title="Revolutionizing the Future.">
                  Berta Medical envisions a healthcare revolution that breaks down barriers and envisions a future where quality medical care is accessible to all.
              </Textbox>
            </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <Divider/>

        <div className="absolute inset-x-0 m-96 h-80 max-w-xl bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"></div>
        {/* <div className="absolute inset-x-0 w-full h-screen backdrop-blur-[2px] opacity-80 z-10"></div> */}
        {/* <div className="absolute inset-x-0 h-screen w-full z-0 bg-opacity-0 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]"></div>        Content */}
        
        {/* Content */}
        <div className="absolute inset-x-0 h-[100vh] bg-black z-0 opacity-85 blur-[50px]"></div>
        <div className="absolute inset-x-0 mt-[15%] h-[40vh] bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[88px]"></div>
        <div className="absolute inset-x-0 mt-[13%] h-[50vh] bg-black z-10"></div>
        <div id="content-component" className="w-full h-screen">
          <div className="flex h-full items-center">
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="z-30"
          animate={{y:-0}}
          transition={{ duration: 0.75, ease: "easeIn" }}
          >
            <div id="textbox-container" className={`w-full pl-[5%] flex flex-col items-center`}>
              <Textbox title="A new ecosystem.">
                Step into the future of healthcare with our revolutionary ecosystem of wearable medical devices. Imagine a seamlessly organized and efficient solution that empowers both patients and healthcare professionals.              </Textbox>
            </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <Divider/>

        <div className="absolute inset-x-0 m-40 h-80 max-w-8xl bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"></div>
        {/* <div className="absolute inset-x-0 w-full h-screen backdrop-blur-[2px] opacity-80 z-10"></div> */}
        {/* <div className="absolute inset-x-0 h-screen w-full z-0 bg-opacity-0 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]"></div> */}
        
        {/* Content */}
        <div className="absolute inset-x-0 h-[100vh] bg-black z-0 opacity-85 blur-[50px]"></div>
        <div className="absolute inset-x-0 mt-[15%] h-[40vh] bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[88px]"></div>
        <div className="absolute inset-x-0 mt-[13%] h-[50vh] bg-black z-10"></div>
        <div id="content-component" className="w-full h-screen">
          <div className="flex h-full items-center">
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="z-30"
          animate={{y:-0}}
          transition={{ duration: 0.75, ease: "easeIn" }}
          >
            <div id="textbox-container" className={`w-full pl-[5%] flex flex-col items-center`}>
              <Textbox title="Organized.">
                Our compact and comfortable wearables continuously monitor vital signs, connecting to a secure cloud database via an intuitive mobile app interface.              </Textbox>
            </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <Divider/>

        <div className="absolute inset-x-0 m-96 h-80 max-w-9xl bg-gradient-to-tr from-indigo-400 via-green-900 to-[#C084FC] blur-[118px]"></div>
        {/* <div className="absolute inset-x-0 w-full h-screen backdrop-blur-[2px] opacity-80 z-10"></div> */}
        {/* <div className="absolute inset-x-0 h-screen w-full z-0 bg-opacity-0 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]"></div> */}
        
        {/* Content */}
        <div className="absolute inset-x-0 h-[100vh] bg-black z-0 opacity-85 blur-[50px]"></div>
        <div className="absolute inset-x-0 mt-[15%] h-[40vh] bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[88px]"></div>
        <div className="absolute inset-x-0 mt-[13%] h-[50vh] bg-black z-10"></div>
        <div id="content-component" className="w-full h-screen">
          <div className="flex h-full items-center">
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="z-30"
          animate={{y:-0}}
          transition={{ duration: 0.75, ease: "easeIn" }}
          >
            <div id="textbox-container" className={`w-full pl-[5%] flex flex-col items-center`}>
              <Textbox title="Compact and Efficient.">
                Picture patented algorithms detecting early warning signs, from heart arrhythmias to strokes, facilitating preventative care. This ecosystem not only provides patients with self-monitoring capabilities but also streamlines remote diagnosis for doctors through easily digestible reports.              </Textbox>
            </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <Divider/>

        <div className="absolute inset-x-0 m-80 h-80 max-w-5xl bg-gradient-to-tr from-blue-400 via-purple-900 to-green-500 blur-[148px]"></div>
        {/* <div className="absolute inset-x-0 w-full h-screen backdrop-blur-[2px] opacity-80 z-10"></div> */}
        {/* <div className="absolute inset-x-0 h-screen w-full z-0 bg-opacity-0 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]"></div> */}
        
        {/* Content */}
        <div className="absolute inset-x-0 h-[100vh] bg-black z-0 opacity-85 blur-[50px]"></div>
        <div className="absolute inset-x-0 mt-[15%] h-[40vh] bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[88px]"></div>
        <div className="absolute inset-x-0 mt-[13%] h-[50vh] bg-black z-10"></div>
        <div id="content-component" className="w-full h-screen">
          <div className="flex h-full items-center">
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="z-30"
          animate={{y:-0}}
          transition={{ duration: 0.75, ease: "easeIn" }}
          >
            <div id="textbox-container" className={`w-full pl-[5%] flex flex-col items-center`}>
              <Textbox title="Cheap, Reliable, and Eco-Friendly.">
                Embark on a healthcare journey that is not only cutting-edge but also affordable, reliable, and environmentally conscious. Our wearables and telemedicine platform provide a cost-effective solution without compromising reliability, ensuring that quality healthcare is within reach for all.              </Textbox>
            </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <Divider/>

        <div className="absolute inset-x-0 m-80 h-80 max-w-3xl bg-gradient-to-b from-[#C084FC] via-teal-900 to-indigo-300 blur-[118px]"></div>
        {/* <div className="absolute inset-x-0 w-full h-screen backdrop-blur-[2px] opacity-80 z-10"></div> */}
        {/* <div className="absolute inset-x-0 h-screen w-full z-0 bg-opacity-0 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]"></div> */}
        
        {/* Content */}
        <div className="absolute inset-x-0 h-[100vh] bg-black z-0 opacity-85 blur-[50px]"></div>
        <div className="absolute inset-x-0 mt-[15%] h-[40vh] bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[88px]"></div>
        <div className="absolute inset-x-0 mt-[13%] h-[50vh] bg-black z-10"></div>
        <div id="content-component" className="w-full h-screen">
          <div className="flex h-full items-center">
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="z-30"
          animate={{y:-0}}
          transition={{ duration: 0.75, ease: "easeIn" }}
          >
            <div id="textbox-container" className={`w-full pl-[5%] flex flex-col items-center`}>
              <Textbox title="Interested?">
                Ready to revolutionize your approach to healthcare? Imagine a future where our seamlessly organized ecosystem of affordable wearables and telemedicine services empowers you to take charge of your health. With a commitment to accessibility, reliability, and eco-friendliness, we invite you to join us on this transformative journey. Experience a healthcare solution that not only improves outcomes but also envisions a more inclusive and sustainable future.              </Textbox>
            </div>
            </motion.div>
          </div>
        </div>
      </div>

{/* 
      Buttons
      <div className="mb-32 z-50 grid text-center py-6 pb-10 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <ButtonHover title="Services" link="https://google.com">
        Find out how we use cutting-edge medical solution to improve lives.
        </ButtonHover>
        <ButtonHover title="About" link="https://google.com">
        Learn about our mission, vision, and commitment to excellence in healthcare.
        </ButtonHover>
        <ButtonHover title="Contact" link="https://google.com">
        Have questions or need assistance? Reach out to our dedicated team.
        </ButtonHover>
        <ButtonHover title="Careers" link="https://google.com">
        Interested in joining our team? We are *not* hiring.
        </ButtonHover>
      </div>
*/}
    </main>
  );
}
