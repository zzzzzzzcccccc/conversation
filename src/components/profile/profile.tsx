import { ProfileProps } from './index';
import { useProfileEffect } from '@/effect';

export default function Profile(props: ProfileProps) {
  const { children, profileLoaded } = useProfileEffect(props);

  return (
    <>
      {profileLoaded ? children : 'loading...'}
    </>
  );
}
