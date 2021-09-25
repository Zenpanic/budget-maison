import verifyToken from '../../../utilsApi/authentication/verifyToken';
import deleteCategory from '../../../utilsApi/projects/deleteCategory';

const handler = async (req, res) => {
    if (req.method === 'POST') {

        if (!req.headers.authorization) return res.status(400).json({ message: 'error' });
        const token = verifyToken(req.headers.authorization, 'accessToken');
        if (!token.id) return res.status(400).json({ message: 'error' });

        const { category, projectId } = req.body;
        if (!category || !projectId) return res.status(400).json({ message: 'error' });

        const project = await deleteCategory({ category, projectId, userId: token.id });

        if (!project) return res.status(400).json({ message: 'error' });

        return res.json(project);
    };

    return res.status(400).json({ message: 'error' });
};

export default handler;