import { useState, useEffect } from 'react';

import validator from 'validator';

import styles from './auth.module.css';

const Signup = ({ loading, changeLoading, loginAndRedirect, changeMessage }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
            setUsername('');
            setPassword('');
            setEmail('');
            changeLoading(false);
            return;
        };

        loginAndRedirect(data);
        return;
    };

    // Signup
    const signup = async () => {

        if (!email || !username || !password || loading) return;

        changeMessage('');
        changeLoading(true);
        if (!username || !password || !email) {
            changeLoading(false);
            return;
        };
        if (!validator.isEmail(email)) {
            changeMessage('Adresse e-mail non valide.');
            changeLoading(false);
            return;
        };
        if (!validator.isStrongPassword(password, { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 0 })) {
            changeMessage("Votre mot de passe doit comporter au moins 8 caractères, dont une lettre minuscule, une majuscule et un chiffre.");
            changeLoading(false);
            return;
        };
        if (username.length < 2) {
            changeMessage("Votre nom d'utilisateur doit comporter au moins 2 caractères.");
            changeLoading(false);
            return;
        };
        const res = await fetch('/api/auth/signupUser', {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                username,
                password,
                email
            }),
            credentials: 'include'
        });
        const data = await res.json();
        if (data && data.message) {
            if (data.message === 'ok') {
                await login({ email: email, password: password });
                return;
            };
            if (data.message === 'clone') {
                changeMessage('Ce compte existe déjà.');
                changeLoading(false);
                return;
            };
        };
        changeLoading(false);
        return;
    };

    return (
        <div className={styles.globalContainer}>
            <h3 className={styles.title}>S'enregistrer</h3>
            <div className={styles.formContainer}>
                <div className={styles.formElement}>
                    <label htmlFor="username" className={styles.formLabel}>Nom d'utilisateur</label>
                    <input name="username" type="text" value={username} className={styles.formInput} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="email" className={styles.formLabel}>Adresse e-mail</label>
                    <input name="email" type="email" value={email} className={styles.formInput} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="password" className={styles.formLabel}>Mot de passe</label>
                    <input name="password" type="password" value={password} className={styles.formInput} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={styles.formElement}>
                    <button className={styles.submitButton} onClick={signup}>Valider</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;