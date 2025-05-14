import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('tokennn', token)

    if (!token) {
        return res.status(401).json({ error: 'Token format invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreta');
        req.user = decoded; // por ex: { id, email, role }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        next();
    };
};


export const adminOrSecretary = (req, res, next) => {
    console.log('requisicao lsitar packages', req)

    if (!req.user || !req.user.role) {
        return res.status(401).json({ message: 'Usuário não autenticado ou role não definida' });
    }

    if (req.user.role === 'admin' || req.user.role === 'secretary') {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado' });
    }
};
