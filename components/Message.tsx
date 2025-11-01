import React from 'react';
import { ChatMessage } from '../types';
import { AiIcon } from './icons/AiIcon';
import { UserIcon } from './icons/UserIcon';

interface MessageProps {
  message: ChatMessage;
  currentUser: { username: string };
}

const Message: React.FC<MessageProps> = ({ message, currentUser }) => {
  const isSelf = message.username === currentUser.username;
  const isAI = message.isAI;
  const isSystem = message.type === 'system_message';

  if (isSystem) {
    return (
      <div className="text-center text-xs text-gray-400 italic py-2 animate-fade-in-up">
        {message.text}
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isSelf ? 'justify-end' : 'justify-start'}`}>
      {!isSelf && (
        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${isAI ? 'bg-purple-500' : 'bg-gray-600'}`}>
          {isAI ? <AiIcon className="w-6 h-6 text-white" /> : <UserIcon className="w-6 h-6 text-white" />}
        </div>
      )}

      <div>
        {!isSelf && (
            <p className="text-xs text-gray-400 mb-1 ml-2">{message.username}</p>
        )}
        <div
          className={`max-w-md md:max-w-2xl px-5 py-3 rounded-2xl animate-fade-in-up ${
            isSelf
              ? 'bg-blue-600 text-white rounded-br-none'
              : isAI
              ? 'bg-gray-800 border border-purple-500/50 text-gray-200 rounded-bl-none'
              : 'bg-gray-700 text-gray-200 rounded-bl-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>

      {isSelf && (
         <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
};

// Add keyframes for animation in a style tag for simplicity, as it can't be done directly in Tailwind config here.
const style = document.createElement('style');
if (!document.head.querySelector('#animation-styles')) {
    style.id = 'animation-styles';
    style.innerHTML = `
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
}

export default Message;
