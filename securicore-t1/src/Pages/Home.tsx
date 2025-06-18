import React from 'react'
import LightModeIcon from '../assets/light.png'
import DarkModeIcon from '../assets/dark.png'

interface HomeProps {
  dark: boolean;
  toggleDark: () => void;
}
export default function Home({ dark, toggleDark }: HomeProps) {
    return (
        <div className='min-h-screen w-screen overflow-x-clip bg-white text-black dark:bg-neutral-950 dark:text-white transition transition-colors duration-300'>
            <div className="relative h-full w-screen bg-slate-950 opacity-0 dark:opacity-100">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>
                  <div onClick={toggleDark} className="fixed flex justify-end p-2 px-2 py-2 rounded-md transition cursor-pointer top-0 right-0">
        <img src={dark ? LightModeIcon : DarkModeIcon} alt="Google" className="w-7 h-7" />
       
      </div>
        </div>
    )
}
