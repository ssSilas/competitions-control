import moment from "moment";

export function currentDatetime() {
  return moment().tz('America/Sao_Paulo');
}