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
"2008" - error 'year must be number'
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
});
