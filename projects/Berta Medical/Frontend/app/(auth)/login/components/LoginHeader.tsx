"use client"
import MoveUp from '@/components/animations/MoveUp';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import neologo from '../../../../public/neologo.png'

const Header = () => {

    const [active, setActive] = useState(false);

    useEffect(() => {
      setActive(true);
    }, []);

    return (
        <div id="header" className={`bg-black bg-opacity-20 h-max w-full text-white text-shadow-lg font-sans z-50 fixed transition-opacity duration-1000 ease-in-out ${active ? 'opacity-100 delay-100' : 'opacity-0'}`}>
        <div className="p-3 flex text-white text-shadow-lg font-sans justify-center">
          <div className={`transform ${active ? 'translate-y-0 delay=100' : '-translate-y-full'} transition-transform duration-1000 ease-in-out flex-row flex text-5xl font-bold tracking-wider`}>
            <Link href="/" className="flex flex-row">
              <Image
              src={neologo}
              width={40}
              height={1}
              alt="Berta logo :D"
              className='hidden sm:block'
              />
              <section id="top-logo" className="text-5xl sm:ml-5 mb-1 font-bold tracking-wider">
                <h1>B E R T A</h1>
              </section>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Header;