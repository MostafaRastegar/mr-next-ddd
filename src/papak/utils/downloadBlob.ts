export function downloadBlob(data: any, name: string, type: string) {
  const pdfBlob = new Blob([data]);
  const url = window.URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.${type}`; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return link;
}
