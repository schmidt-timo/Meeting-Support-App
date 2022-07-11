export const validateEmailRegex = new RegExp(
  "[\u00C0-\u017Fa-z0-9._%+-]+@[\u00C0-\u017Fa-z0-9.-]+.[a-z]{2,4}$"
);

export const validateNumberRegex = new RegExp(
  "([1-9]|[0-9][0-9]|[1-9][0-9][0-9])"
);
