import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ProfileProps} from "@/components/profile";
import {useAppDispatch, useAppSelector} from '@/store';
import {profileFetch} from '@/fetch/profile.fetch';
import {FetchStatus} from '@/model/fetch.status';

export function useProfileEffect(props: ProfileProps) {
  const { children } = props;
  const { profileStatus } = useAppSelector(state => state.global)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileLoaded = profileStatus === FetchStatus.fulfilled

  useEffect(() => {
    dispatch(profileFetch())
  }, [dispatch])

  return {
    profileLoaded,
    navigate,
    children
  }
}
