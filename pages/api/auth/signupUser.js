import createUser from '../../../utilsApi/authentication/createUser';

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const { username, password, email } = req.body;

        if (!username || !password || !email) return res.json({ message: 'error' });
        const user = await createUser({ username, password, email });
        if (!user) return res.json({ message: 'error' });
        if (user === 'clone') {
            return res.json({ message: 'clone' });
        };
        return res.json({ message: 'ok' });
    };
    return res.json({ message: 'error' });
};

export default handler;