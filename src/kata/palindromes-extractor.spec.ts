import { extractPalindromes } from "./palindromes-extractor.ts";

describe("Palindromes extractor", () => {
  describe("One-word sentence", () => {
    it("should extract that sole word if it is a palindrome", () => {
      expect(extractPalindromes("")).toEqual([]);
      expect(extractPalindromes("A")).toEqual([]);
      expect(extractPalindromes("AA")).toEqual(["AA"]);
      expect(extractPalindromes("AB")).toEqual([]);
      expect(extractPalindromes("AAB")).toEqual([]);
      expect(extractPalindromes("ABCA")).toEqual([]);
      expect(extractPalindromes("Anna")).toEqual(["ANNA"]);
    });
  });

  describe("Multi-words sentence", () => {
    it("should extract all palindromes", () => {
      expect(extractPalindromes("AA ")).toEqual(["AA"]);
      expect(extractPalindromes("AA AA")).toEqual(["AA", "AA"]);
    });
  });
});
