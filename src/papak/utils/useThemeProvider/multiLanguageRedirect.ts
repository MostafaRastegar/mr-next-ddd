export function multiLanguageRedirect(
  pathname: string,
  rtl: boolean,
  redirect: Function,
) {
  const redirectPath = pathname
    .split('/')
    .map((item, index) => {
      if (index === 1) {
        return rtl ? 'fa' : 'en';
      }
      return item;
    })
    .join('/');

  return redirect(redirectPath);
}
