import verifyToken from '../../../utilsApi/authentication/verifyToken';
import renameCategory from '../../../utilsApi/projects/renameCategory';

const handler = async (req, res) => {
    if (req.method === 'POST') {

        if (!req.headers.authorization) return res.status(400).json({ message: 'error' });
        const token = verifyToken(req.headers.authorization, 'accessToken');
        if (!token.id) return res.status(400).json({ message: 'error' });

        const { newName, oldName, projectId } = req.body;
        if (!newName || !oldName || !projectId) return res.status(400).json({ message: 'error' });

        const project = await renameCategory({ newName, oldName, projectId });

        if (!project) return res.status(400).json({ message: 'error' });

        return res.json(project);
    };

    return res.status(400).json({ message: 'error' });
};

export default handler;