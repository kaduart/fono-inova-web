// src/utils/clinicAnalytics.js
export const trackServiceClick = (serviceName) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'service_click', {
      event_category: 'Services',
      event_label: serviceName
    });
  }
};

export const trackAppointment = (serviceType, location = 'website') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'appointment_scheduled', {
      event_category: 'Conversions',
      event_label: serviceType,
      location: location,
      value: 1
    });
  }
};

export const trackPhoneCall = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'phone_call', {
      event_category: 'Conversions',
      event_label: 'Phone_Conversion'
    });
  }
};