// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root',
// })
// export class SocketService {
//   private socket: Socket;

//   constructor() {
//     this.socket = io('http://localhost:3000'); // Replace with your backend URL
//   }

//   // Example: Emit an event
//   emitEvent(eventName: string, data: any) {
//     this.socket.emit(eventName, data);
//   }

//   // Example: Listen for an event
//   onEvent(eventName: string, callback: (data: any) => void) {
//     this.socket.on(eventName, callback);
//   }

//   // Example: Disconnect socket
//   disconnect() {
//     this.socket.disconnect();
//   }
// }
