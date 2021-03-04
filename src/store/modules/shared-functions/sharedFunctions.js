export function checkIfElementIsInArray(array, id, childData) {
  const index = array.findIndex((x) => x.id === id);
  if (index === -1) array.push(childData);
}
