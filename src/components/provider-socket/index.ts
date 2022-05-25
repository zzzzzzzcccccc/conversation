import React from 'react';
import ProviderSocket from "./provider-socket";
import { Socket } from 'socket.io-client';

export interface ProviderSocketProps {
  children?: React.ReactNode;
}

export interface IProviderSocketContext {
  io?: Socket;
  connected: boolean
}

export const ProviderSocketContext = React.createContext<IProviderSocketContext>({ connected: false })

export * from './socket-events'

export default ProviderSocket;
