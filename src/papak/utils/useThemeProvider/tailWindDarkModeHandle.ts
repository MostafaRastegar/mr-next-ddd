export function tailWindDarkModeHandle(isDarkLocalStorage: boolean) {
  if (isDarkLocalStorage) {
    window.document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    window.document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  return isDarkLocalStorage;
}
