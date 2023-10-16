export const extractPalindromes = (sentence: string): string[] => {
  const palindromes: string[] = [];
  for (const word of sentence.split(" ").map((c) => c.toUpperCase()))
    if (isPalindrome(word)) palindromes.push(word);
  return palindromes;
};

const isPalindrome = (word: string): boolean => {
  if (word.length <= 1) return false;
  for (let i = 0; i < word.length; i++)
    if (word.charAt(i) !== word.charAt(word.length - 1 - i)) return false;
  return true;
};
