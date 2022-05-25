import { HashRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components';
import Login from './login'
import Chat from './chat'
import Manager from './manager';
import Messages from './chat/messages'
import { BASE_LOGIN_PATH, BASE_MANAGER_PATH } from '@/config/constant';
import { AuthProvider } from '@/components'

export default function Pages() {
  return(
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path={BASE_LOGIN_PATH} element={<Login />} />
          <Route path={BASE_MANAGER_PATH} element={<ProtectedRoute><Manager /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>}>
            <Route path=":conversation_id" element={<Messages />} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}
