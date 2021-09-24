import { useState, useEffect } from 'react';

import styles from './auth.module.css';

const Login = ({ loading, changeLoading, loginAndRedirect, changeMessage }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Login
    const login = async () => {
        if (loading) return;
        changeLoading(true);
        changeMessage('');
        if (!username || !password) {
            changeLoading(false);
            return;
        };

        const res = await fetch(`/api/auth/loginUser`, {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8", 'Accept': 'application/json', },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await res.json();
        if (!data.accessToken) {
            changeLoading(false);
            return;
        };

        loginAndRedirect(data);
        return;
    };

    return (
        <div className={styles.globalContainer}>
            <h3 className={styles.title}>Connexion</h3>
            <div className={styles.formContainer}>
                <div className={styles.formElement}>
                    <label htmlFor="username" className={styles.formLabel}>Nom d'utilisateur</label>
                    <input name="username" type="text" value={username} className={styles.formInput} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="password" className={styles.formLabel}>Mot de passe</label>
                    <input name="password" type="password" value={password} className={styles.formInput} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={styles.formElement}>
                    <button className={styles.submitButton} onClick={login}>Valider</button>
                </div>
            </div>
        </div>
    );
};

export default Login;