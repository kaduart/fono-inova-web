// hooks/useAccessibility.js
import { useEffect, useState } from 'react';

export const useAccessibility = () => {
    const [settings, setSettings] = useState(() => {
        // Carregar configurações salvas do localStorage
        const saved = localStorage.getItem('accessibilitySettings');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        // Salvar configurações no localStorage
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));

        // Aplicar configurações
        applySettings(settings);
    }, [settings]);

    const applySettings = (newSettings) => {
        const body = document.body;

        // Reset todas as classes
        body.classList.remove(
            'accessibility-mode',
            'text-large',
            'text-x-large',
            'high-contrast',
            'inverted-colors',
            'simplified-ui'
        );

        // Aplicar novas configurações
        if (newSettings.visual) {
            if (newSettings.visual.text_size === 'large') {
                body.classList.add('text-large');
            } else if (newSettings.visual.text_size === 'x_large') {
                body.classList.add('text-x-large');
            }

            if (newSettings.visual.contrast === 'high') {
                body.classList.add('high-contrast');
            } else if (newSettings.visual.contrast === 'inverted') {
                body.classList.add('inverted-colors');
            }
        }

        if (newSettings.enableAccessibility) {
            body.classList.add('accessibility-mode', 'simplified-ui');
        }
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return { settings, updateSettings };
};