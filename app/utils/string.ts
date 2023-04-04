export function decodeString(str: string) {
  return decodeURIComponent(
    str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    })
  );
}

export function removeHashAtBeginning(str: string): string {
  if (str.charAt(0) === "#") {
    return str.slice(1);
  } else {
    return str;
  }
}
