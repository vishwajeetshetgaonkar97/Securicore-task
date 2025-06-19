import React, { useState, useEffect } from 'react';

export interface User {
  id?: string;
  username: string;
  email: string;
  role: string;
}

interface UserModalProps {
  mode: 'add' | 'edit';
  initialData?: User;
  onSubmit: (data: User) => void;
  onClose: () => void;
}

export default function UserModal({ mode, initialData, onSubmit, onClose }: UserModalProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username);
      setEmail(initialData.email);
      setRole(initialData.role);
    } else {
      setUsername('');
      setEmail('');
      setRole('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, email, role });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-950 text-black dark:text-white p-6 rounded-lg w-full max-w-md border dark:border-white/10 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 uppercase opacity-80 dark:opacity-90">
          {mode === 'add' ? 'Add User' : 'Edit User'}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="group relative rounded-lg border focus-within:border-blue-400 px-3 pb-1.5 pt-2.5 mb-4 duration-200 focus-within:ring focus-within:ring-blue-300/30">
            <label className="text-xs font-medium text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Email */}
          <div className="group relative rounded-lg border focus-within:border-blue-400 px-3 pb-1.5 pt-2.5 mb-4 duration-200 focus-within:ring focus-within:ring-blue-300/30">
            <label className="text-xs font-medium text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Role */}
          <div className="group relative rounded-lg border focus-within:border-blue-400 px-3 pb-1.5 pt-2.5 mb-6 duration-200 focus-within:ring focus-within:ring-blue-300/30">
            <label className="text-xs font-medium text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
              placeholder="Enter role"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded">
              {mode === 'add' ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
