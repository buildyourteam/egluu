import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export function useLoginLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.Login);
  const [loadState, setLoadState] = useState({
    open: false,
    text: '로딩 중...',
  }); // 메시지 상태메시지

  useEffect(() => {
    if (isLoading) {
      setLoadState({ ...loadState, open: true });
    } else if (isError) {
      setLoadState({ ...loadState, open: false });
    } else {
      setLoadState({ ...loadState, open: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return [{ loadState }, setLoadState, dispatch];
}

export const useLoginData = () => {
  const [loginState, setLoginState] = useState({
    id: '',
    password: '',
  });

  return [{ loginState }, setLoginState];
};

export const useLoginCheck = () => {
  const location = useLocation();
  const token = window.sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (token === null) {
      window.location.replace('/auth/login');
      sessionStorage.setItem('redirectUrl', location.pathname);
    }
  }, []);

  return token;
};
