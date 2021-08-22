export const isCyrillic = (word) => {
   const pattern = /^\p{Script=Cyrillic}+$/u
   if (cyrillicPattern.test(word)) {
      return true
   } else {
      return false
   }
}