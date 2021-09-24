import { createContext, useContext, useState, useEffect } from 'react';

const AuthStateContext = createContext();

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState();
    const [tokenExpiry, setTokenExpiry] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    const addToken = value => {
        setAccessToken(value);
        return;
    };

    const changeTokenExpiry = value => {
        setTokenExpiry(value);
    };

    const removeToken = () => {
        setAccessToken();
        setTokenExpiry();
        setLoggedIn(false);
        return;
    };

    const changeLoggedIn = value => {
        setLoggedIn(value);
        return;
    };

    // Window size detector
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        };
    }, []);

    let authState = {
        accessToken,
        tokenExpiry,
        loggedIn,
        addToken,
        removeToken,
        changeTokenExpiry,
        changeLoggedIn,
        windowSize,
    };

    return (
        <AuthStateContext.Provider value={authState}>
            {children}
        </AuthStateContext.Provider>
    );
};

export function useAuthState() {
    const state = useContext(AuthStateContext);
    return state;
};