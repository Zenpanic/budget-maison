import verifyToken from '../../../utilsApi/authentication/verifyToken';
import createToken from '../../../utilsApi/authentication/createToken';
import checkRefresh from '../../../utilsApi/authentication/checkRefresh';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.json({ message: 'error1' });

        const verified = verifyToken(refreshToken, 'refreshToken');
        if (!verified || !verified.username) return res.json({ message: 'error2' });
        const { username, id } = verified;

        const checked = await checkRefresh({ token: refreshToken, userId: id });
        if (!checked) return res.json({ message: 'error3' });

        const accessToken = await createToken({
            username,
            id,
            tokenType: 'access'
        });
        if (!accessToken) return res.json({ message: 'error' });

        return res.json({ token: accessToken.token, tokenExpiry: accessToken.tokenExpiry, id: id });
    };
};

export default handler;