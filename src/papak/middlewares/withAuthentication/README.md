# **withAuthentication Middleware**

The `withAuthentication` middleware is a custom middleware function designed to handle authentication and authorization for Next.js applications. It provides a flexible way to manage access to protected routes and redirect users to the login page when necessary.

## **Functionality**

The `withAuthentication` middleware takes a `CustomMiddleware` function as an argument and returns a new middleware function that wraps the original middleware. This allows developers to easily integrate authentication logic into their Next.js applications.

The middleware performs the following tasks:

- 1. Checks for authentication pages
     The middleware checks if the requested URL is an authentication page (e.g., `/login`, `/register`, `/`). If it is, the middleware proceeds to verify the authentication token.

- 2. Verifies authentication token
     The middleware retrieves the `access_token` cookie from the request and checks if it exists. If the token is present, the middleware considers the user authenticated.

- 3. Redirects to dashboard or login page
     Depending on the authentication status and the requested URL, the middleware redirects the user to either the dashboard or the login page.

If the user is authenticated and requests an authentication page, the middleware redirects them to the dashboard.
If the user is not authenticated and requests a protected page, the middleware redirects them to the login page with the original URL as a query parameter (`next`).

- 4. Deletes invalid authentication token
     If the user is not authenticated, the middleware deletes the `access_token` cookie to prevent further unauthorized access.

## **Configuration**

The middleware uses the following constants and variables:

`AUTH_PAGES`: An array of authentication page URLs.
`NEXT_LOCALE`: The current locale, retrieved from the `NEXT_LOCALE` cookie.

## **Usage**

To use the `withAuthentication` middleware, simply wrap your custom middleware function with it:

```javascript
import { withAuthentication } from "./withAuthentication";

const customMiddleware = async (request, event, response) => {
  // Your custom middleware logic here
};

export default withAuthentication(customMiddleware);
```

## **Note**

This middleware assumes that the `verifyJwtToken` function from `papak/helpers/auth` is implemented and available. You may need to modify the middleware to accommodate your specific authentication implementation.
