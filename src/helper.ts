export const removeStringFromArray = (element: string, array: string[]) => {
  const index = array.indexOf(element);
  if (index === -1) return array;
  array.splice(index, 1);
  return array;
};

export const fileToBase64 = (file?: File) => new Promise((resolve, reject) => {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => resolve(Buffer.from(reader.result as string, "base64").toString("base64"));
  reader.onerror = reject;
});

//#region Bootstrap functions

/* eslint-disable */
export const initTooltip = (bootstrap: any) => {
  const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

/* eslint-disable */
export const showToast = (bootstrap: any, id: string) => {
  const element = document.getElementById(id);
  const toast = bootstrap.Toast.getOrCreateInstance(element);
  toast.show();
};

//#endregion