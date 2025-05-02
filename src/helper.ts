export const removeFromArray = (element: any, array: any[]) => {
  const index = array.indexOf(element);
  if (index === -1) return array;
  array.splice(index, 1);
  return array;
}