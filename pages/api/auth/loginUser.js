import getUser from '../../../utilsApi/authentication/getUser';
import createToken from '../../../utilsApi/authentication/createToken';
import Cookies from 'cookies';

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const { username, password } = req.body;
        if (!username || !password) return res.json({ message: 'error' });

        const user = await getUser({ username, password });
        if (!user) return res.json({ message: 'error' });

        const accessToken = await createToken({ username: user.username, id: user.id, tokenType: 'access' });
        const refreshToken = await createToken({ username: user.username, id: user.id, tokenType: 'refresh' });

        if (!accessToken.token || !accessToken.tokenExpiry || !refreshToken) return res.json({ message: 'error' });
        const cookies = new Cookies(req, res)
        cookies.set('refreshToken', refreshToken.token, {
            httpOnly: true,
            secure: false, // set true in production
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        });

        return res.json({ accessToken: accessToken.token, tokenExpiry: accessToken.tokenExpiry, pseudo: user.username, id: user.id, vip: accessToken.vip });
    };
    return res.json({ message: 'error' });
};

export default handler;