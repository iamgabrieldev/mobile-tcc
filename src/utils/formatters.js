/**
 * Utilitários de formatação
 */

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
};

export const formatEmission = (value) => {
  return `${value.toFixed(2)} kg CO₂`;
};

export const formatMonth = (monthString) => {
  const [year, month] = monthString.split('-');
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  return `${months[parseInt(month) - 1]}/${year}`;
};
