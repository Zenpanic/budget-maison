import { useEffect } from 'react';
import { useAuthState } from '../../context/authContext';
import Head from 'next/head';

import grabToken from '../../utilsFront/grabToken';

const Header = () => {

    const {
        accessToken,
        tokenExpiry,
        addToken,
        changeTokenExpiry,
        changeLoggedIn } = useAuthState();

    // Grab new access token if there is none
    useEffect(async () => {
        if (!addToken ||
            !changeTokenExpiry ||
            !changeLoggedIn ||
            accessToken) return;

        await grabToken({
            addToken,
            changeTokenExpiry,
            changeLoggedIn
        });
    }, [accessToken]);

    // Grab new access token before the current one expires
    useEffect(async () => {
        if (!tokenExpiry ||
            !addToken ||
            !changeTokenExpiry ||
            !changeLoggedIn) return;

        setTimeout(async () => {
            await grabToken({
                addToken,
                changeTokenExpiry,
                changeLoggedIn
            });
        }, 43140000); // 1min before exp
    }, [tokenExpiry]);

    return (
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <title>Budget Maison</title>
            <meta charSet="UTF-8" />
            <meta name="author" content="ZenTown"></meta>
        </Head>
    );
};

export default Header;