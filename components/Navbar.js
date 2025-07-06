"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";


const Navbar = () => {
    const pathname = usePathname()
    const showNavbar = ["/", "/generate"].includes(pathname)

    return (<>{showNavbar && <div className='flex justify-center'>
            <nav className='fixed z-10 bg-white w-[80vw] p-5 my-6 rounded-4xl flex items-center gap-30'>
                <Link href={"/"}><div className="logo flex">
                    <span className='font-bold text-2xl'>PlayLink</span>
                    <img src="/tree.svg" alt="" />
                </div></Link>
                <div className='ulandbuttons w-full flex justify-between items-center '>
                    <ul className='flex gap-6 text-lg'>
                        <Link href={"/"}><li>Templates</li></Link>
                        <Link href={"/"}><li>Marketplace</li></Link>
                        <Link href={"/"}><li>Discover</li></Link>
                        <Link href={"/"}><li>Pricing</li></Link>
                        <Link href={"/"}><li>Learn</li></Link>
                    </ul>

                    <div className="buttons flex gap-3">
                        <button className='font-bold bg-[#eff0ec] p-4 rounded-lg'>Login</button>
                        <button className='font-bold bg-black p-2 px-3 rounded-full text-white'>Sign up free</button>
                    </div>
                </div>

            </nav>
        </div>}</>
    )
}

export default Navbar
