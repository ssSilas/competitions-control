import moment from "moment";

export function currentDatetime() {
  return moment().tz('America/Sao_Paulo');
}

export function integerToSeconds(value, unit) {
  if (unit === 'min') return value * 60
  return value
}

export function convertToCentimeter(value, unit) {
  if (unit === 'met') return value * 100
  return value;
}

export function convertLiterToMilliliters(value, unit) {
  if (unit === 'lit') return value * 1000;
  return value;
}