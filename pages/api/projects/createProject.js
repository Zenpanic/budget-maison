import verifyToken from '../../../utilsApi/authentication/verifyToken';
import createProject from '../../../utilsApi/projects/createProject';

const handler = async (req, res) => {
    if (req.method === 'GET') {

        if (!req.headers.authorization) return res.status(400).json({ message: 'error' });
        const token = verifyToken(req.headers.authorization, 'accessToken');
        if (!token.id) return res.status(400).json({ message: 'error' });

        const project = await createProject({ userId: token.id });

        if (!project) return res.status(400).json({ message: 'error' });

        return res.json(project);
    };

    return res.status(400).json({ message: 'error' });
};

export default handler;