export const isCyrillic = (word) => {
   const cyrillicPattern = /^\p{Script=Cyrillic}+$/u
   if (cyrillicPattern.test(word)) { return true }
   else { return false }
}