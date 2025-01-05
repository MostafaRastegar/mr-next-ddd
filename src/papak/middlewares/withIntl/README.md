# withIntl Middleware

=============================

The `withIntl` function is a utility function used to create a middleware that integrates with Next.js's internationalization (i18n) features.

## Usage

---

The `withIntl` function takes a `CustomMiddleware` function as an argument and returns a new middleware function.

### Example

````jsx
import { withIntl } from './withIntl';

const customMiddleware = async (request, event, response) => {
  // Custom middleware logic
  return response;
};

const intlMiddleware = withIntl(customMiddleware);

export default intlMiddleware;

## **Usage**

To use the `withAuthentication` middleware, simply wrap your custom middleware function with it:

```javascript
import { withAuthentication } from "./withAuthentication";

const customMiddleware = async (request, event, response) => {
  // Your custom middleware logic here
};

export default withAuthentication(customMiddleware);
````

## **How it works**

The withIntl function:

- Creates an instance of the intl middleware using next-intl/middleware.
- Configures the intl middleware with a list of supported locales and a default locale.
- Calls the intl middleware with the request object and returns the resulting response object.
- Passes the request, event, and response objects to the CustomMiddleware function.

## **Note**

This implementation assumes that you have already set up Next.js's `i18n` features in your project. You may need to modify the implementation to fit your specific use case.
