import wordBank from "../wordle-bank.txt";

export const generateWordSet = async () => {
  let wordArr;
  let word;
  let wordSet;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      wordArr = result.split("\n");
      word = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return { wordSet, word };
};
