const isLeapYear = (year) => {
  // Если год равен undefined - возвращаем throw new Error("year must be exist");
  if (year === undefined) {
    throw new Error("year must be exist");
  }

  // если тип данных года не число возвращаем throw new Error("year must be number");
  if (typeof year !== "number") {
    throw new Error("year must be number");
  }

  // isInteger(year) - проверяет целое ли число
  if (!Number.isInteger(year)) {
    throw new Error("year must be integer");
  }

  // Если год меньше чем 42 - вернуть ошибку throw new Error("year must 42 or more")
  if (year < 42) {
    throw new Error("year must 42 or more");
  }

  // Верни нулевой день марта выбранного года, но по факту он возвращает последний день февраля, таким образоб можно определить год высокосный или нет
  const date = new Date(year, 2, 0);

  // getDate() - возвращает номер дня в месяце т.е. сколько дней в феврале
  const days = date.getDate();

  // Если год высокосный то вернётся true (т.е. 29 дней), если нет - false (т.е. 28 дней)
  return 29 === days;
};

export default isLeapYear;
