import { Profile, ProviderSocket } from '@/components';
import Participants from './participants';
import { Outlet } from 'react-router-dom';
import { useChatEffect } from '@/effect';
import styles from './index.module.less';

export default function Chat() {
  const { conversationId } = useChatEffect();

  return(
    <Profile>
      <ProviderSocket>
        <div className={styles.app}>
          <div className={styles.participants}>
            <Participants />
          </div>
          <div className={styles.content}>
            {!!conversationId ? <Outlet /> : 'no found'}
          </div>
        </div>
      </ProviderSocket>
    </Profile>
  )
}
