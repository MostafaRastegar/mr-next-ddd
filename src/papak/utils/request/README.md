# request utils

This utility provides a convenient way to make HTTP requests with Axios, with built-in support for JSON content type and optional authentication.

### `request`

The default export, `request`, is a function that creates an Axios instance with JSON content type headers. It takes an optional `configs` object that can be used to customize the request.

## note:

it used for api call with `Authorization` request header

#### Example

```javascript
import request from "./request";

request({
  headers: { "content-type": "json-ap...." },
}).get("https://example.com/api/admin");
```

### `requestWithoutAuth`

This function is similar to `request`, but it does not include authentication interceptors.

#### Example

```javascript
import { requestWithoutAuth } from "./request";

requestWithoutAuth({
  headers: { "content-type": "json-ap...." },
}).get("https://example.com/api/login");
```

### `Configuration`

Both `request` and `requestWithoutAuth` functions take an optional `configs` object that can be used to customize the request. This object can contain any valid Axios configuration options.

### `Interceptors`

The `setupInterceptorsTo` function is used to set up interceptors for the Axios instance. This function is not exported, but it is used internally to add authentication interceptors to the `request` function.
