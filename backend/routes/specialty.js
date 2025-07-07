import express from 'express';

const router = express.Router();

// Lista de especialidades com ícones e cores
router.get('/', (req, res) => {
    res.json([
        {
            id: 'AudioLines',
            name: 'Fonoaudiologia',
            icon: 'mic',
            color: '#4CAF50',
            sessionDuration: 30
        },
        {
            id: 'neuroped',
            name: 'Neuropediatria',
            icon: 'brain',
            color: '#2196F3',
            sessionDuration: 45
        },
        {
            id: 'psico',
            name: 'Psicologia',
            icon: 'psychology',
            color: '#FF9800',
            sessionDuration: 50
        },
        {
            id: 'to',
            name: 'Terapia Ocupacional',
            icon: 'accessibility',
            color: '#9C27B0',
            sessionDuration: 40
        },
        {
            id: 'fisio',
            name: 'Fisioterapia',
            icon: 'fitness_center',
            color: '#F44336',
            sessionDuration: 40
        },
        {
            id: 'pediatria',
            name: 'Pediatria',
            icon: 'child_care',
            color: '#00BCD4',
            sessionDuration: 30
        }
    ]);
});

export default router;