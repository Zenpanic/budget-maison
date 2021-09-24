import verifyToken from '../../../utilsApi/authentication/verifyToken';
import getUserProjects from '../../../utilsApi/projects/getUserProjects';

const handler = async (req, res) => {
    if (req.method === 'GET') {

        if (!req.headers.authorization) return res.status(400).json({ message: 'error' });
        const token = verifyToken(req.headers.authorization, 'accessToken');
        if (!token.id) return res.status(400).json({ message: 'error' });

        const projects = await getUserProjects({ userId: token.id });

        if (!projects) return res.status(400).json({ message: 'error' });

        return res.json(projects);
    };

    return res.status(400).json({ message: 'error' });
};

export default handler;