import {useContext} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {AuthProviderContext} from "@/components/auth-provider";

export function useLoginEffect() {
  const location = useLocation();
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const paramsTenantTaxNo = urlParams.get('tenant_tax_no') || ''
  const authProviderContext  = useContext(AuthProviderContext)

  const onFinish = async (values: any) => {
    if (!values.tenant_tax_no) {
      values.tenant_tax_no = paramsTenantTaxNo
    }
    const result = await authProviderContext?.handleLogin(values)
    if (result) {
      const originPathname = (location.state as { from?: Record<string, any> })?.from?.pathname;
      navigate(originPathname || '/', { replace: true })
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // TODO
  };

  return {
    loading: !!authProviderContext?.loginLoading,
    paramsTenantTaxNo,
    onFinish,
    onFinishFailed
  }
}
