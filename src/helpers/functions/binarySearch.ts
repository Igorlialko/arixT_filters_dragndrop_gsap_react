export function binarySearch(sortedArray:any, key:any, search:string) {
  let start = 0;
  let end = sortedArray.length - 1;
  if (search) {
    while (start <= end) {
      const middle = Math.floor((start + end) / 2);

      if (sortedArray[middle][`${search}`] === key) {
        // found the key
        return middle;
      } else if (sortedArray[middle][`${search}`] < key) {
        // continue searching to the right
        start = middle + 1;
      } else {
        // search searching to the left
        end = middle - 1;
      }
    }
  }else{
    while (start <= end) {
      const middle = Math.floor((start + end) / 2);

      if (sortedArray[middle] === key) {
        // found the key
        return middle;
      } else if (sortedArray[middle] < key) {
        // continue searching to the right
        start = middle + 1;
      } else {
        // search searching to the left
        end = middle - 1;
      }
    }
  }
  // key wasn't found
  return -1;
}