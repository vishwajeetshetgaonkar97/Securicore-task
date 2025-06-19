import React, { useState } from 'react';
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

    const [editOrAddUser, setEditOrAddUser] = useState<User | null>(null);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [isAddingNewUser, setIsAddingNewUser] = useState(false);

    const handleUpdateOrAddUser = () => {
        if (editOrAddUser) {
            if (isAddingNewUser) {
                // Add new user with a new ID
                const newUser = {
                    ...editOrAddUser,
                    id: Math.max(...users.map(u => u.id)) + 1
                };
                setUsers([...users, newUser]);
            } else {
                // Update existing user
                setUsers(users.map(user => user.id === editOrAddUser.id ? editOrAddUser : user));
            }
            setEditOrAddUser(null);
            setIsAddingNewUser(false);
        }
    };

    const handleAddNewUser = () => {
        setEditOrAddUser({ id: 0, name: '', email: '' });
        setIsAddingNewUser(true);
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

            <div className="relative h-full w-screen bg-slate-950 opacity-0 dark:opacity-100">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>

            <div className="p-8">
                <div className='flex justify-between items-end'>
                    <div>
                        <h3 className="text-2xl font-bold uppercase opacity-80 dark:opacity-90">Welcome!</h3>
                        <p className="mt-1 text-sm font-medium text-gray-500 dark:text-white/60">
                            Here are the list of Users in database
                        </p>
                    </div>
                    <button type='button' onClick={handleAddNewUser} className='bg-yellow-400/75 dark:bg-yellow-400/70 hover:bg-yellow-500/90 text-white px-4 py-2 rounded-sm text-xs font-bold border border-gray-500/10 cursor-pointer uppercase'>
                        Add New user
                    </button>
                </div>

                <div className="mt-4 p-4 rounded-md flex flex-col gap-3 border dark:border-white/10 border-black/20 backdrop-blur-lg shadow-lg">
                    <div className="flex font-normal text-black/80 dark:text-white/80 p-2 px-4 bg-black/3 dark:bg-white/5 rounded-sm backdrop-blur-lg">
                        <div className="w-1/2 text-md">Name</div>
                        <div className="w-1/2 text-md">Email</div>
                        <div className="w-[9%] text-md flex justify-center">Edit</div>
                        <div className="w-[5%] text-md flex justify-center">Delete</div>
                    </div>

                    {users.map(user => (
                        <div key={user.id} className="flex font-normal text-black/80 dark:text-white/80 p-2 px-4 hover:bg-black/2 dark:hover:bg-white/2 rounded-sm backdrop-blur-lg cursor-pointer">
                            <div className="w-1/2">{user.name}</div>
                            <div className="w-1/2">{user.email}</div>
                            <div className="w-[9%] flex justify-center">
                                <img 
                                    src={EditIcon} 
                                    className='w-auto h-5 dark:invert opacity-50 hover:opacity-80' 
                                    onClick={() => setEditOrAddUser(user)} 
                                    alt="edit_icon" 
                                />
                            </div>
                            <div className="w-[5%] flex justify-center">
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
            </div>

            {/* Edit/Add Modal */}
            {editOrAddUser && (
                <div className="fixed inset-0 dark:bg-white/1 bg-black/20 flex justify-center items-center backdrop-blur-[2px]">
                    <div className="bg-white dark:bg-neutral-900 p-3 rounded-lg">
                        <h2 className="text-md p-2 rounded-xs font-semibold mb-4 bg-black/3 dark:bg-white/3">
                            {isAddingNewUser ? 'Add New User' : 'Edit User'}
                        </h2>
                        <input
                            type="text"
                            className="w-full mb-2 p-2 border dark:border-white/10 border-black/20 rounded-xs"
                            value={editOrAddUser.name}
                            onChange={(e) => setEditOrAddUser({ ...editOrAddUser, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            className="w-full mb-3 p-2 border dark:border-white/10 border-black/20 rounded-xs"
                            value={editOrAddUser.email}
                            onChange={(e) => setEditOrAddUser({ ...editOrAddUser, email: e.target.value })}
                            placeholder="Email"
                        />
                        <div className="flex mt-1 justify-end gap-2">
                            <button 
                                onClick={() => {
                                    setEditOrAddUser(null);
                                    setIsAddingNewUser(false);
                                }} 
                                className="px-3 py-1 border text-md border-gray-400/70 cursor-pointer rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleUpdateOrAddUser} 
                                className="px-6 py-1 text-md bg-green-500 text-white cursor-pointer rounded"
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