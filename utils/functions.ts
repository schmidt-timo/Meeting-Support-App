export function getNameInitials(name: string) {
  const nameParts = name.split(" ");
  var result = nameParts[0].substring(0, 1).toUpperCase();
  if (nameParts.length > 1) {
    result += nameParts[nameParts.length - 1].substring(0, 1).toUpperCase();
  }
  return result;
}
