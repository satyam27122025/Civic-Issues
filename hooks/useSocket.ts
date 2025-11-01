import { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from '../types';

// In a real application, this would be a configurable environment variable.
const WEBSOCKET_URL = 'wss://socketsbay.com/wss/v2/1/demo/';

export const useSocket = (room: string, username: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!room || !username) return;

    // This is a mock public WebSocket server.
    // In a real Django Channels app, the URL would be something like:
    // const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    // const socketURL = `${protocol}://${window.location.host}/ws/chat/${room}/`;
    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      // Announce user joining
      const joinMessage: ChatMessage = {
          id: Date.now(),
          type: 'system_message',
          username: 'system',
          text: `${username} has joined the room.`
      };
      setMessages(prev => [...prev, joinMessage]);
      // In a real app, you would authenticate and fetch message history here.
    };

    socketRef.current.onmessage = (event) => {
      // For this public echo server, we parse the message we sent.
      // A real backend would send structured JSON.
      try {
        const incomingMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      } catch (e) {
         // The demo server just echos text, so we'll wrap it.
         const systemMessage: ChatMessage = {
           id: Date.now(),
           type: 'system_message',
           username: 'system',
           text: event.data
         };
         setMessages(prev => [...prev, systemMessage]);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      const errorMessage: ChatMessage = {
          id: Date.now(),
          type: 'system_message',
          username: 'system',
          text: 'Connection error. Please try refreshing.'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
       const leaveMessage: ChatMessage = {
          id: Date.now(),
          type: 'system_message',
          username: 'system',
          text: 'You have been disconnected.'
      };
      setMessages(prev => [...prev, leaveMessage]);
      setIsConnected(false);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [room, username]);

  const sendMessage = useCallback((messagePayload: Omit<ChatMessage, 'id' | 'type'> | {type: string, prompt: string}) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
       // A real backend would handle different message types.
       // Here we stringify and send.
       if ('text' in messagePayload) {
            const message: ChatMessage = {
                id: Date.now(),
                type: 'user_message',
                ...messagePayload,
            };
            socketRef.current.send(JSON.stringify(message));
            // The public server echos back, so we don't add it to state here.
            // In a real app with a proper backend, you would likely add it optimistically.
       } else if ('prompt' in messagePayload) {
           // Simulate AI request for the demo
           const aiRequestMessage: ChatMessage = {
               id: Date.now(),
               type: 'user_message',
               username,
               text: `/ai ${messagePayload.prompt}`
           };
            socketRef.current.send(JSON.stringify(aiRequestMessage));
       }
    }
  }, [username]);

  return { messages, sendMessage, isConnected };
};
