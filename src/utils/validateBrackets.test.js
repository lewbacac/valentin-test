import validateBrackets from "./validateBrackets";

test('examples', () => {
  expect(validateBrackets("{asd}")).toBe(true);
  expect(validateBrackets("{[(asd)]}")).toBe(true);
  expect(validateBrackets("[{asd}]")).toBe(false);
  expect(validateBrackets("[(asd])")).toBe(false);
  expect(validateBrackets("{aaa[bbb(ccc)ddd]eee}")).toBe(true);
});

test('custom', () => {
  expect(validateBrackets("{dke[kld](glsl)asd(mvn)[pl]}")).toBe(true);
  expect(validateBrackets("{#[(asd)]}#")).toBe(true);
  //negative balance:
  expect(validateBrackets("[{asd}}}]]]")).toBe(false);

  expect(validateBrackets("[(asd]}")).toBe(false);
  expect(validateBrackets("{[()](dd)aaa(d)[bbb(ccc)ddd]e[ee]}")).toBe(true);
});