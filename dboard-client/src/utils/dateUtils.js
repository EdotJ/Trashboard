export const addHours = (date, h) => {
  date.setTime(date.getTime() + h * 60 * 60 * 1000);
  return date;
};

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDayOfWeek(day) {
  switch (day) {
    case 1:
    default:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    case 0:
      return "Sun";
  }
}
