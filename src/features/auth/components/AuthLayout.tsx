import Logo from '../../../assets/images/logo.webp'
import Clothes from '../../../assets/images/rightClothes.webp'
import { PiStarFourFill } from "react-icons/pi";
import { FiTruck } from "react-icons/fi";
import { IoFlowerOutline } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa";
import type { ReactNode } from 'react';


type Children = {
    children: ReactNode
}


function AuthLayout({children}: Children) {
    return (
        <div className="md:h-screen overflow-hidden w-full grid md:grid-cols-2 bg-white lg:p-8 md:p-6 p-4 relative">
            <div className="absolute bg-linear-360 from-orange-500 to-amber-400
        w-70 h-70 -top-35 -right-35 rounded-full shadow-2xl"></div>
            <div className="absolute bg-linear-90 from-orange-500 to-amber-400
        w-100 h-100 -bottom-35 -right-35 rounded-full shadow-2xl"></div>

            {/* Left Side */}
            <div className="lg:p-8 md:rounded-l-2xl md:rounded-t-none md:h-auto h-100
            rounded-t-2xl overflow-hidden md:p-6 p-4 z-1 relative">
                <img src={Clothes} alt="clothes"
                    className='absolute inset-0 h-full w-full object-cover -z-1' />
                {/* Left Side Text on image */}
                <div className='grid h-full items-start'>
                    <div className='flex gap-2'>
                        <PiStarFourFill className='text-orange-600 text-2xl' />
                        <div className='grid gap-1'>
                            <p className='tracking-wider uppercase text-secondary-text'>Made for you.</p>
                            <p className='tracking-wider uppercase text-secondary-text'>Designed for life.</p>
                            <div className='bg-orange-600 h-px w-22'></div>
                        </div>
                    </div>

                    <div className="bg-base-light/70 rounded-2xl p-4 self-end grid gap-4 lg:grid-cols-3">
                        <div className="card flex lg:justify-center gap-2 items-center">
                            <div className="rounded-full grid place-items-center md:p-4 p-2 bg-linear-60 from-orange-dark to-amber-400 shadow">
                                <FiTruck className='text-white text-xl' />
                            </div>
                            <p className='tracking-wider uppercase text-sm'>Fast <br className='lg:block hidden'/> Delivery</p>
                        </div>
                        <div className="card flex lg:justify-center gap-2 items-center">
                            <div className="rounded-full grid place-items-center md:p-4 p-2 bg-linear-60 from-orange-dark to-amber-400 shadow">
                                <IoFlowerOutline className='text-white text-xl' />
                            </div>
                            <p className='tracking-wider uppercase text-sm'>Best <br className='lg:block hidden'/> Quality</p>
                        </div>
                        <div className="card flex lg:justify-center gap-2 items-center">
                            <div className="rounded-full grid place-items-center md:p-4 p-2 bg-linear-60 from-orange-dark to-amber-400 shadow">
                                <FaHeadset className='text-white text-xl' />
                            </div>
                            <p className='tracking-wider uppercase text-sm'>24/7 <br className='lg:block hidden'/> support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="lg:p-8 rounded-r-2xl overflow-hidden md:p-6 p-4 z-1 grid gap-6 relative bg-white/70">
                <div className="logo">
                    <img src={Logo} alt="Logo" className='h-15 m-auto' />
                    <div className='flex gap-2 items-center'>
                        <div className='bg-linear-90 from-orange-light via-orange-dark to-orange-light
              h-px w-full'></div>
                        <p className='shrink-0 uppercase tracking-wider'>Style that speaks <span className='font-bold text-orange-dark'>PANJAB</span></p>
                        <div className='bg-linear-90 from-orange-light via-orange-dark to-orange-light
              h-px w-full'></div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout