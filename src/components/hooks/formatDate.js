export const formatDate = () => {
  let today = new Date(); // текущая дата строка Sat Oct 08 2022 23:34:39 GMT+0300 (Москва, стандартное время)
  let year = today.getFullYear(); // 2022
  let month = today.getMonth(); // текущий месяц
  let day = today.getDate(); // текущий день

  return [year, month, day];
};
