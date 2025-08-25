// src/hooks/useFormTracking.js
import { useState } from 'react';
import { trackEvent } from './useAnalytics';

export const useFormTracking = (formName) => {
    const [formData, setFormData] = useState({});

    const trackFieldInteraction = (fieldName, value) => {
        trackEvent('form_field_interaction', formName, fieldName);
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const trackFormSubmission = (success = true) => {
        trackEvent('form_submission', formName, success ? 'success' : 'error');
    };

    return {
        trackFieldInteraction,
        trackFormSubmission,
        formData
    };
};