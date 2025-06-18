import React from 'react'
import LightModeIcon from '../assets/light.png'
import DarkModeIcon from '../assets/dark.png'
import TopNav from '../Components/TopNav';

interface HomeProps {
    dark: boolean;
    toggleDark: () => void;
}
export default function Home({ dark, toggleDark }: HomeProps) {
    return (
        <div className='min-h-screen w-screen overflow-x-clip bg-white text-black dark:bg-neutral-950 dark:text-white transition transition-colors duration-300'>
            <TopNav dark={dark} toggleDark={toggleDark} />
            <div className="relative h-full w-screen bg-slate-950 opacity-0 dark:opacity-100">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>
       
        </div>
    )
}
