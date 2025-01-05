# useAccessTokenPayload

==========================

A utility function to extract the payload from an access token stored in a cookie.

## Usage

---

```typescript
import { useAccessTokenPayload } from "./useAccessTokenPayload";

const payload = useAccessTokenPayload("my_access_token");
```

## Function Signature

```typescript
function useAccessTokenPayload<T>(token: string): T;
```

## Parameters

`token`: The name of the cookie that stores the access token.

## Return Value

The decoded payload of the access token as type `T`.

## Dependencies

- `universal-cookie`: A library for working with cookies in a universal (server and client-side) way.
- `jsonwebtoken`: A library for working with JSON Web Tokens.

## How it Works

This function uses the `universal-cookie` library to retrieve the access token from a cookie with the given name. It then uses the `jsonwebtoken` library to decode the access token and extract its payload. The payload is returned as type `T`, which can be any type that matches the structure of the payload.

## Note

This function assumes that the access token is stored in a cookie with the given name. If the cookie does not exist or the access token is invalid, this function will throw an error.
