// Função utilitária (coloque em um arquivo helpers.js)
export function extractTimeFromDateTime(datetimeString) {
    if (typeof datetimeString !== 'string') return '00:00';

    const timeMatch = datetimeString.match(/\d{2}:\d{2}/);
    return timeMatch ? timeMatch[0] : '00:00';
}
