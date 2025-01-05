# clientUniversalCookie

This API route provides a way to retrieve a cookie value by its key.

## Usage

To use this API route, simply call the `getCookie` function and pass the desired cookie key as an argument.

### Example

```typescript
import { getCookie } from "./cookie-api";

const cookieValue = getCookie("my-cookie-key");
if (cookieValue) {
  console.log(`Cookie value: ${cookieValue}`);
} else {
  console.log("Cookie not found");
}
```

### Functionality

The getCookie function takes a single argument key of type string and returns the value of the cookie with the specified key. If the cookie is not found, the function returns null.
