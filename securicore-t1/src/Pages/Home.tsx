import { useEffect, useState } from 'react';
import TopNav from '../Components/TopNav';
import EditIcon from '../assets/editIcon.png'
import DeleteIcon from '../assets/deleteIcon.png'

interface User {
    id: number;
    name: string;
    email: string;
}

interface HomeProps {
    dark: boolean;
    toggleDark: () => void;
}

export default function Home({ dark, toggleDark }: HomeProps) {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Michael Brown', email: 'michael@example.com' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
        { id: 5, name: 'David Wilson', email: 'david@example.com' },
    ]);

    useEffect(() => {
    window.scrollTo(0, 0);
}, []);

    const [editOrAddUser, setEditOrAddUser] = useState<User | null>(null);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [isAddingNewUser, setIsAddingNewUser] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '' });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors = { name: '', email: '' };
        let isValid = true;

        if (!editOrAddUser?.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!editOrAddUser?.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(editOrAddUser.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const isFormValid = () => {
        return editOrAddUser?.name.trim() &&
            editOrAddUser?.email.trim() &&
            validateEmail(editOrAddUser.email);
    };

    const handleUpdateOrAddUser = () => {
        if (!editOrAddUser || !validateForm()) return;

        if (isAddingNewUser) {
            const newUser = {
                ...editOrAddUser,
                id: Math.max(0, ...users.map(u => u.id)) + 1
            };
            setUsers([...users, newUser]);
        } else {
            setUsers(users.map(user => user.id === editOrAddUser.id ? editOrAddUser : user));
        }
        setEditOrAddUser(null);
        setIsAddingNewUser(false);
    };

    const handleAddNewUser = () => {
        setEditOrAddUser({ id: 0, name: '', email: '' });
        setIsAddingNewUser(true);
        setErrors({ name: '', email: '' });
    };

    const handleDeleteUser = () => {
        if (deleteUserId !== null) {
            setUsers(users.filter(user => user.id !== deleteUserId));
            setDeleteUserId(null);
        }
    };

    return (
        <div className='min-h-screen w-screen overflow-x-clip bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors duration-300'>
            <TopNav dark={dark} toggleDark={toggleDark} />

            <div className="relative h-full w-full bg-slate-950 opacity-0 dark:opacity-100">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>

            <div className="p-4 md:p-8">
                <div className='flex  justify-between items-end gap-2 sm:gap-0 flex-col sm:flex-row'>
                    <div className='w-full'>
                        <h3 className="text-2xl font-bold uppercase opacity-80 dark:opacity-90">Welcome!</h3>
                        <p className="mt-1 text-sm font-medium text-gray-500 dark:text-white/60">
                            Here are the list of Users in database
                        </p>
                    </div>
                    <button type='button' onClick={handleAddNewUser} className='w-full sm:max-w-fit bg-yellow-400/75 dark:bg-yellow-400/70 hover:bg-yellow-500/90 text-white px-4 py-2 rounded-sm text-xs font-bold border border-gray-500/10 cursor-pointer uppercase relative'>
                        Add New user
                    </button>
                </div>

                <div className="mt-4 hidden p-4 rounded-md flex flex-col gap-3 border dark:border-white/10 border-black/20 backdrop-blur-lg shadow-lg">
                    {/* Desktop */}
                    <div className="hidden md:flex font-normal text-black/80 dark:text-white/80 p-2 px-4 bg-black/3 dark:bg-white/5 rounded-sm backdrop-blur-lg">
                        <div className="w-1/2 text-md">Name</div>
                        <div className="w-1/2 text-md">Email</div>
                        <div className="w-[100px] text-md flex justify-center">Edit</div>
                        <div className="w-[60px] text-md flex justify-center">Delete</div>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden font-normal text-black/80 dark:text-white/80 p-2 px-4 bg-black/3 dark:bg-white/5 rounded-sm backdrop-blur-lg">
                        All Users
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:block">
                        {users.map(user => (
                            <div key={user.id} className="flex font-normal text-black/80 dark:text-white/80 p-2 px-4 hover:bg-black/2 dark:hover:bg-white/2 rounded-sm backdrop-blur-lg cursor-pointer">
                                <div className="w-1/2">{user.name}</div>
                                <div className="w-1/2">{user.email}</div>
                                <div className="w-[100px] flex justify-center">
                                    <img
                                        src={EditIcon}
                                        className='w-auto h-5 dark:invert opacity-50 hover:opacity-80'
                                        onClick={() => {
                                            setEditOrAddUser(user);
                                            setErrors({ name: '', email: '' });
                                        }}
                                        alt="edit_icon"
                                    />
                                </div>
                                <div className="w-[60px] flex justify-center">
                                    <img
                                        src={DeleteIcon}
                                        className='w-auto h-5 dark:invert opacity-50 hover:opacity-80'
                                        onClick={() => setDeleteUserId(user.id)}
                                        alt="delete_icon"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden space-y-3">
                        {users.map(user => (
                            <div key={user.id} className="font-normal text-black/80 dark:text-white/80 p-3 hover:bg-black/2 dark:hover:bg-white/2 rounded-sm backdrop-blur-lg cursor-pointer border dark:border-white/10 border-black/20">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm opacity-80">{user.email}</div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setEditOrAddUser(user);
                                                setErrors({ name: '', email: '' });
                                            }}
                                            className="opacity-50 hover:opacity-80"
                                        >
                                            <img
                                                src={EditIcon}
                                                className='w-5 h-5 dark:invert'
                                                alt="edit_icon"
                                            />
                                        </button>
                                        <button
                                            onClick={() => setDeleteUserId(user.id)}
                                            className="opacity-50 hover:opacity-80"
                                        >
                                            <img
                                                src={DeleteIcon}
                                                className='w-5 h-5 dark:invert'
                                                alt="delete_icon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit/Add Modal */}
            {editOrAddUser && (
                <div className="fixed inset-0 dark:bg-white/1 bg-black/20 flex justify-center items-center backdrop-blur-[2px]">
                    <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg min-w-[94%]  md:min-w-[450px]">
                        <h2 className="text-lg p-2 rounded-xs font-semibold mb-4 bg-black/3 dark:bg-white/3">
                            {isAddingNewUser ? 'Add New User' : 'Edit User'}
                        </h2>

                        <div className="group relative rounded-md border dark:border-white/10 border-black/20 focus-within:border-blue-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-blue-300/30 mb-4">
                            <div className="flex justify-between">
                                <label className="text-xs font-medium text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white">
                                    Name
                                </label>
                                {editOrAddUser.name && !errors.name && (
                                    <div className="absolute right-3 translate-y-2 text-green-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                            <path
                                                fillRule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={editOrAddUser.name}
                                onChange={(e) => setEditOrAddUser({ ...editOrAddUser, name: e.target.value })}
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="group relative rounded-md border dark:border-white/10 border-black/20 focus-within:border-blue-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-blue-300/30 mb-4">
                            <div className="flex justify-between">
                                <label className="text-xs font-medium text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white">
                                    Email
                                </label>
                                {editOrAddUser.email && validateEmail(editOrAddUser.email) && (
                                    <div className="absolute right-3 translate-y-2 text-green-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                            <path
                                                fillRule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={editOrAddUser.email}
                                onChange={(e) => setEditOrAddUser({ ...editOrAddUser, email: e.target.value })}
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="flex mt-4 justify-end gap-2">
                            <button
                                onClick={() => {
                                    setEditOrAddUser(null);
                                    setIsAddingNewUser(false);
                                }}
                                className="px-4 py-2 border text-sm border-gray-400/70 cursor-pointer rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateOrAddUser}
                                disabled={!isFormValid()}
                                className={`px-6 py-2 text-sm text-white cursor-pointer rounded ${isFormValid()
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isAddingNewUser ? 'Add' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteUserId !== null && (
                <div className="fixed inset-0 dark:bg-white/1 bg-black/20 flex justify-center items-center backdrop-blur-[2px]">
                    <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setDeleteUserId(null)} className="px-3 py-1 border text-md border-gray-400/70 cursor-pointer rounded">Cancel</button>
                            <button onClick={handleDeleteUser} className="px-4 py-1 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}