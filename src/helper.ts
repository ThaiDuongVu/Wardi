export const removeFromArray = (element: any, array: any[]) => {
  const index = array.indexOf(element);
  if (index === -1) return array;
  array.splice(index, 1);
  return array;
}

export const fileToBase64 = (file?: File) => new Promise((resolve, reject) => {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => resolve(Buffer.from(reader.result as string, "base64").toString("base64"));
  reader.onerror = reject;
});
