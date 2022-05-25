import { ProtectedRouteProps } from './index';
import { Navigate, useLocation } from 'react-router-dom';
import { BASE_LOGIN_PATH } from '@/config/constant'
import { validateToken } from "@/config/access.token";

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { children } = props;
  const location = useLocation();

  if (!validateToken()) {
    return <Navigate to={BASE_LOGIN_PATH} replace state={{ from: location }} />
  }

  return <>{children}</>;
}
