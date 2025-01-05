# **Client Locale Detector**

This file contains a client-side locale detector function that retrieves the user's preferred locale from a cookie.

### Code Explanation

The code starts by importing the `getCookie` function from the `../clientUniversalCookie` module.

#### `clientLocaleDetector` function

The `clientLocaleDetector` function is exported as the default function of this module. It is responsible for detecting the user's preferred locale.

Here's a step-by-step breakdown of what the function does:

- **Retrieve `NEXT_LOCALE` cookie value**: The function retrieves the value of the `NEXT_LOCALE` cookie using the `getCookie` function.
- **Return default locale if cookie value is falsy**: If the cookie value is falsy (i.e., it doesn't exist or is empty), the function returns the default locale, which is `'en'`.
- **Return cookie value if it exists**: If the cookie value exists, the function returns the value of the `NEXT_LOCALE` cookie, which represents the user's preferred locale.

### Code

```typescript
"use client";

import { getCookie } from "../clientUniversalCookie";

export const clientLocaleDetector = () => {
  const localeKey = getCookie("NEXT_LOCALE");
  if (!localeKey) return "en";
  return localeKey;
};
```
