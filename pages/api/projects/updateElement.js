import verifyToken from '../../../utilsApi/authentication/verifyToken';
import updateElement from '../../../utilsApi/projects/updateElement';

const handler = async (req, res) => {
    if (req.method === 'POST') {

        if (!req.headers.authorization) return res.status(400).json({ message: 'error' });
        const token = verifyToken(req.headers.authorization, 'accessToken');
        if (!token.id) return res.status(400).json({ message: 'error' });

        const { element } = req.body;
        if (!element) return res.status(400).json({ message: 'error' });

        const project = await updateElement(element);

        if (!project) return res.status(400).json({ message: 'error' });

        return res.json(project);
    };

    return res.status(400).json({ message: 'error' });
};

export default handler;