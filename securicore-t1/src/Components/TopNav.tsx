import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import LogoDark from '../assets/Securicore_White.svg'
import LogoWhite from '../assets/Securicore_Dark.svg'
import LightModeIcon from '../assets/light.png'
import DarkModeIcon from '../assets/dark.png'

interface TopNavProps {
    dark: boolean;
    toggleDark: () => void;
}

export default function TopNav({ dark, toggleDark }: TopNavProps) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        
        navigate('/login');
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    // Portal for the modal
    const ModalPortal = () => {
        return createPortal(
            <div className={`fixed inset-0 ${dark?"text-white":"text-black"} dark:bg-white/1 bg-black/20 flex justify-center items-center backdrop-blur-[2px] z-50`}>
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
                    <p>Are you sure you want to logout?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button 
                            onClick={handleCancelLogout} 
                            className="px-3 py-1 border text-md border-gray-400/70 cursor-pointer rounded"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleConfirmLogout} 
                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>,
            document.getElementById('modal-root') as HTMLElement
        );
    };

    return (
        <div className='p-2 w-full max-w-screen overflow-x-hidden border-b-1 dark:border-white/10 border-black/20 shadow-lg backdrop-blur-lg flex justify-between items-center'>
            <img className='w-auto h-7 object-cover' src={dark ? LogoDark : LogoWhite} alt="logo" />
            <div className='flex items-center'>
                <button 
                    onClick={handleLogoutClick}
                    className='bg-yellow-400/75 dark:bg-yellow-400/70 hover:bg-yellow-500/90 text-white px-4 py-2 rounded-sm text-xs font-bold border border-gray-500/10 cursor-pointer uppercase'
                >
                    Logout
                </button>
                <div onClick={toggleDark} className="flex justify-end p-2 rounded-md transition cursor-pointer">
                    <img src={dark ? LightModeIcon : DarkModeIcon} alt="Theme toggle" className={`w-auto ${dark?"h-7":"h-6"}`} />
                </div>
            </div>

            {showLogoutModal && <ModalPortal />}
        </div>
    )
}