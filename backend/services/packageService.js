export const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Domingo, 6 = Sábado
};

// Função para pular fins de semana
export const skipWeekends = (date) => {
    while (isWeekend(date)) {
        date.setDate(date.getDate() + 1);
    }
    return date;
};

// Função para calcular datas das sessões
export const calculateSessionDates = (startDate, totalSessions, sessionsPerWeek) => {
    const sessionDates = [];
    const date = new Date(startDate);

    // Primeira sessão na data inicial
    sessionDates.push(new Date(date));

    // Para as demais sessões
    for (let i = 1; i < totalSessions; i++) {
        // Calcula o número de dias até a próxima sessão
        const daysToAdd = Math.floor(7 / sessionsPerWeek);
        date.setDate(date.getDate() + daysToAdd);

        // Pula fins de semana
        skipWeekends(date);

        sessionDates.push(new Date(date));
    }

    return sessionDates;
};