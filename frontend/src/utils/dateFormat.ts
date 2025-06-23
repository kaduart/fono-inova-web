export const dateFormat = (date: any): string => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
};

export const formatValidDate = (date: Date) => ({
  dateStr: date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  }),
  timeStr: date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
});

    // Função para formatar as datas no formato brasileiro (DD/MM/YYYY)
export const formatDateBrazilian = (date) => {
  if (!date) return '-';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
};
