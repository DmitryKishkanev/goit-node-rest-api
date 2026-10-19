/*
1. Given integer
2. Return true is year is leap or false if not
3. If given not valid argument throw error with message.

2008 - true
2003 - false
1900 - false
2000 - true

41 - error 'year must 42 or more'
2008.4 - error 'year must be integer'
() - error 'year must be exist'
'2008' - error 'year must be number'
null - error 'year must be number'
true - error 'year must be number'
false - error 'year must be number'
()=>{} - error 'year must be number'
{} - error 'year must be number'
[] - error 'year must be number'
*/

import isLeapYear from "./isLeapYear.js";

// describe() - создаёт группу тестов
describe("test isLeapYear function", () => {
  test("2008 - true", () => {
    const result = isLeapYear(2008);
    expect(result).toBe(true);
  });

  test("2003 - false", () => {
    expect(isLeapYear(2003)).toBe(false);
  });

  // it - это синоним test
  it("1900 - false", () => {
    expect(isLeapYear(1900)).toBe(false);
  });

  it("2000 - false", () => {
    expect(isLeapYear(2000)).toBe(true);
  });

  test("41 - error 'year must 42 or more'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear(41)).toThrow("year must 42 or more");
  });

  test("2008.4 - error 'year must be integer'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear(2008.4)).toThrow("year must be integer");
  });

  test("() - error 'year must be exist'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear()).toThrow("year must be exist");
  });

  test("'2008' - error 'year must be number'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear("2008")).toThrow("year must be number");
  });
  test("null - error 'year must be number'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear(null)).toThrow("year must be number");
  });

  test("true - error 'year must be number'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear(true)).toThrow("year must be number");
  });

  test("false - error 'year must be number'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear(false)).toThrow("year must be number");
  });

  test("()=>{} - error 'year must be number'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear(() => {})).toThrow("year must be number");
  });

  test("{} - error 'year must be number'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear({})).toThrow("year must be number");
  });

  test("[] - error 'year must be number'", () => {
    // Если функция должна вернуть error - нужно её вызывать внутри колбэка
    // toThrow() - проверяет наличие ошибки, а потом сравнивает message ошибки с тем, что ему передали
    expect(() => isLeapYear([])).toThrow("year must be number");
  });
});
