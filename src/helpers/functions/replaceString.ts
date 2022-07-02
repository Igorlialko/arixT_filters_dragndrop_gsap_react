export function replaceString(el: any, width: any, setter: ([x]: any) => void) {
  const string = el.cloneNode(true);
  string.style.position = "absolute";
  string.style.opacity = "0";
  document.body.appendChild(string);
  while (string.offsetWidth > width) {
    string.textContent = `${string.textContent.slice(0, -4)}...`;
  }
  setter(string.textContent);
  document.body.removeChild(string);
}