import React, { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

const Header = () => {
  useEffect(() => {
    const endpoint = 'http://localhost:8080/';
    socket = io(endpoint);
    
    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export { Header, socket };