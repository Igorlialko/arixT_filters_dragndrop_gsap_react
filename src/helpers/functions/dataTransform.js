export function dataTransform(date) {
  const monthArr = [
    "January", "February",
    "March", "April",
    "May", "June",
    "July", "August",
    "September", "October",
    "November", "December"
  ];
  return date.slice(8, 10) + " " + monthArr[Number(date.slice(5, 7)) - 1] + " " + date.slice(0, 4);
}