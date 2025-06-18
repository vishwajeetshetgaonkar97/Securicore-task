import React from 'react'
import LogoDark from '../assets/Securicore_White.svg'
import LogoWhite from '../assets/Securicore_Dark.svg'
import LightModeIcon from '../assets/light.png'
import DarkModeIcon from '../assets/dark.png'

interface TopNavProps {
    dark: boolean;
    toggleDark: () => void;
}

export default function TopNav({ dark, toggleDark }: TopNavProps) {
    return (
        <div className='p-2 border-b-1 dark:border-white/10 border-black/20 shadow-lg backdrop-blur-lg flex justify-between items-center'>

            <img className='w-auto h-7 object-cover' src={dark ? LogoDark : LogoWhite} alt="logo" />
            <div className='flex items-center'>
                <button className='bg-violet-500/15 px-4 py-2 rounded-xs text-xs font-medium border border-gray-500/10 cursor-pointer hover:bg-violet-500/20 uppercase'>Logout</button>
                <div onClick={toggleDark} className=" flex justify-end p-2  rounded-md transition cursor-pointer ">
                    <img src={dark ? LightModeIcon : DarkModeIcon} alt="Google" className="w-7 h-7" />
                </div>

            </div>


        </div>
    )
}
