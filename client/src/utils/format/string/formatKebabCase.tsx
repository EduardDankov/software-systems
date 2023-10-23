function formatKebabCase(str: string): string {
  const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
  const match = str.match(regex);
  return match!.join('-').toLowerCase();
}

export {formatKebabCase};
