import { Component } from 'react';
import io from 'socket.io-client';

let socket;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:8080/'
      // endpoint: 'http://localhost:3000'
    };
  socket = io(this.state.endpoint);
  }

  render() {
    return null
  }
}

export { Header, socket };
