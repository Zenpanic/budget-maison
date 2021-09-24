import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuthState } from '../context/authContext';

import Login from '../components/auth/login';
import Signup from '../components/auth/signup';

import styles from './index.module.css';

const Home = () => {

  const { accessToken, addToken, changeTokenExpiry, changeLoggedIn, loggedIn } = useAuthState();
  const router = useRouter();

  // Page state
  const [choice, setChoice] = useState('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Manipulate page state
  const changeLoading = (value) => {
    setLoading(value);
    return;
  };
  const changeMessage = (value) => {
    setMessage(value);
    return;
  };

  // Log in and redirect
  const loginAndRedirect = (data) => {
    if (!data) return;
    addToken(data.accessToken);
    changeTokenExpiry(new Date(data.tokenExpiry));
    changeLoggedIn(true);
    setLoading(false);
    router.push('/dashboard');
    return;
  };

  // Dashboard redirection if connected
  useEffect(() => {
    if (!loggedIn || !accessToken) return;
    router.push(`/dashboard`);
    return;
  }, [loggedIn, accessToken]);

  return (
    <div className={styles.globalContainer}>
      <div className={styles.choiceContainer}>
        <p className={styles.choice} onClick={() => setChoice('login')}>Connexion</p>
        <p className={styles.choice} onClick={() => setChoice('signup')}>Créer un compte</p>
      </div>
      <div className={styles.contentContainer}>
        {choice === 'login' ?
          <Login loginAndRedirect={loginAndRedirect} loading={loading} changeLoading={changeLoading} changeMessage={changeMessage} />
          : <Signup loginAndRedirect={loginAndRedirect} loading={loading} changeLoading={changeLoading} changeMessage={changeMessage} />}
        {message ? <p className={styles.message}>{message}</p> : null}
      </div>
    </div>
  );
};

export default Home;
