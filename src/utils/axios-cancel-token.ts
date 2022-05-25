import axios from "axios";
import { CANCEL_CURRENT_REQUEST } from '@/config/constant'

export function axiosCancelToken(signal: AbortSignal, abortCallback?: () => void) {
  const source = axios.CancelToken.source();

  signal.addEventListener('abort', () => {
    source.cancel(CANCEL_CURRENT_REQUEST)
    abortCallback?.();
  })

  return {
    source
  }
}
