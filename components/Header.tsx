import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
  title: string;
  username: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, username, onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 flex justify-between items-center shadow-lg sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <LogoIcon className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <p className="text-xs text-purple-300 tracking-wider">Welcome, {username}</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;