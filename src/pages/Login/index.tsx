import React, { FC, useEffect } from 'react';
import styles from './styles.module.css';
import { Button } from '../../components/atoms';
import logo from '../../assets/AnyfinLogo.png';
import useStore from '../../store';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  let navigate = useNavigate();
  const { setToken, setUser } = useStore((state) => state);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => setToken(`Bearer ${token}`));
      setUser({
        email: user?.email || '',
        name: user?.name || '',
      });
      navigate('home');
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.amountContainer}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p>Anyfin Calculator</p>
        <Button
          title="Login"
          onPress={() => loginWithRedirect()}
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonTitle}
        />
      </div>
    </div>
  );
};

export default Login;
