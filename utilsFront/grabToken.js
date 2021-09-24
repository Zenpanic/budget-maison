const grabToken = async ({
    addToken,
    changeTokenExpiry,
    changeLoggedIn,
}) => {

    const res = await fetch(`/api/auth/newToken`, {
        credentials: 'include'
    });
    const data = await res.json();

    if (!data.token || !data.tokenExpiry) return;

    addToken(data.token);
    changeTokenExpiry(new Date(data.tokenExpiry));
    changeLoggedIn(true);

    return;
};

export default grabToken;