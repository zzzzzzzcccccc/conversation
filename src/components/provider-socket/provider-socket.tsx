import { useEffect, useState } from 'react';
import { ProviderSocketContext, ProviderSocketProps, MessageData, USER_STATUS_CHANGE } from './index';
import { io, Socket } from 'socket.io-client';
import { getSocketGateWay } from "@/config/env";
import { useAppSelector } from "@/store";
import {getAccessToken} from "@/config/access.token";

export default function ProviderSocket(props: ProviderSocketProps) {
  const [socketIo, setSocketIo] = useState<Socket | undefined>(undefined)
  const [connected, setConnected] = useState(false);
  const { user, tenant } = useAppSelector(state => state.global)

  useEffect(() => {
    const _io = io(getSocketGateWay(), {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: getAccessToken()
          }
        }
      },
      query: {
        user_id: user.id || '',
        tenant_id: tenant.id || ''
      }
    })

    _io.on('connect', () => {
      setSocketIo(_io)
      setConnected(true)
    })

    _io.on(USER_STATUS_CHANGE, (data: MessageData) => {
      console.log(USER_STATUS_CHANGE, data)
    })

    return () => {
      setConnected(false)
      setSocketIo(undefined)
      _io.disconnect()
    }
  }, [tenant.id, user.id])

  return (
    <ProviderSocketContext.Provider value={{ io: socketIo, connected }}>
      {props.children}
    </ProviderSocketContext.Provider>
  )
}
