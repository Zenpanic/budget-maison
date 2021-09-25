import verifyToken from '../../../utilsApi/authentication/verifyToken';
import addCategory from '../../../utilsApi/projects/addCategory';

const handler = async (req, res) => {
    if (req.method === 'POST') {

        if (!req.headers.authorization) return res.status(400).json({ message: 'error' });
        const token = verifyToken(req.headers.authorization, 'accessToken');
        if (!token.id) return res.status(400).json({ message: 'error' });

        const { newName, projectId } = req.body;
        if (!newName || !projectId) return res.status(400).json({ message: 'error' });

        const project = await addCategory({ newName: newName, userId: token.id, projectId: projectId });

        if (!project) return res.status(400).json({ message: 'error' });

        return res.json(project);
    };

    return res.status(400).json({ message: 'error' });
};

export default handler;