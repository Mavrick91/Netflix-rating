export function decodeString(str: string) {
  return decodeURIComponent(
    str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    })
  );
}
