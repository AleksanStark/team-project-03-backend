export const validateDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Регулярний вираз для формату "YYYY-MM-DD"

  // Перевірка чи відповідає рядок формату
  if (!dateString.match(regex)) {
    return false;
  }

  // Додаткова перевірка для впевненості, що дата реальна
  const date = new Date(dateString);
  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  // Перевірка чи рядок дати відповідає значенню об'єкта Date
  return date.toISOString().startsWith(dateString);
};
