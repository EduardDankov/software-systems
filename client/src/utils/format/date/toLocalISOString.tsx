function toLocalISOString(date: Date): string {
  const formatDateComponent = (value: number, characters: number): string => ('0' + value).slice(-characters);
  const timeZoneOffset: number = Math.abs(date.getTimezoneOffset());
  const timeZoneSign: string = timeZoneOffset > 0 ? '-' : '+';
  return date.getFullYear() + '-'
    + formatDateComponent(date.getMonth() + 1, 2) + '-' +
    formatDateComponent(date.getDate(), 2) + 'T' +
    formatDateComponent(date.getHours(), 2) + ':' +
    formatDateComponent(date.getMinutes(), 2) + ':' +
    formatDateComponent(date.getSeconds(), 2) + '.' +
    formatDateComponent(date.getMilliseconds(), 3) +
    timeZoneSign + formatDateComponent(timeZoneOffset / 60 | 0, 2) +
    ':' + formatDateComponent(timeZoneOffset % 60, 2);
}

export {toLocalISOString};
