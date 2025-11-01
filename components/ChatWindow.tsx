import React, { useState, useRef, useEffect, FormEvent, useCallback } from 'react';
import { ChatMessage } from '../types';
import Message from './Message';
import { Loader } from './Loader';
import { SendIcon } from './icons/SendIcon';
import { useSocket } from '../hooks/useSocket';
import { sendMessageToAI } from '../services/geminiService';


interface IssueDiscussionProps {
  user: { username: string };
  issueId: string;
}

const IssueDiscussion: React.FC<IssueDiscussionProps> = ({ user, issueId }) => {
  const { messages, sendMessage, isConnected } = useSocket(issueId, user.username);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || !isConnected) return;

    setIsSending(true);
    
    if (trimmedInput.startsWith('/ai ')) {
      const prompt = trimmedInput.substring(4);
      sendMessage({ username: user.username, text: trimmedInput });
      
      try {
        const aiResponse = await sendMessageToAI(prompt);
        sendMessage({ username: 'AI Assistant', text: aiResponse, isAI: true });
      } catch (error) {
        sendMessage({ username: 'AI Assistant', text: "Sorry, I couldn't process that request.", isAI: true });
      }
    } else {
      sendMessage({ username: user.username, text: trimmedInput });
    }

    setInputValue('');
    setIsSending(false);

  }, [inputValue, isConnected, sendMessage, user.username]);

  return (
    <div className="h-full flex flex-col bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <Message key={msg.id || index} message={msg} currentUser={user} />
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
               <div className="p-3 bg-gray-700 rounded-full flex items-center justify-center">
                    <Loader />
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-4 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isConnected ? "Join the discussion..." : "Connecting..."}
            className="flex-1 w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            disabled={!isConnected || isSending}
          />
          <button
            type="submit"
            disabled={!isConnected || isSending || !inputValue.trim()}
            className="p-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueDiscussion;
