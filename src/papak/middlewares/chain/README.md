# Middleware Chain

=============================

The `chain` function is a utility function used to create a chain of middleware functions.

## Usage

---

The `chain` function takes an array of `MiddlewareFactory` functions as an argument and returns a single `CustomMiddleware` function.

### Example

```jsx
import { chain } from "./chain";

const middleware1: MiddlewareFactory =
  (next) => async (request, event, response) => {
    // Middleware 1 logic
    return next(request, event, response);
  };

const middleware2: MiddlewareFactory =
  (next) => async (request, event, response) => {
    // Middleware 2 logic
    return next(request, event, response);
  };

const middlewareChain = chain([middleware1, middleware2]);

export default middlewareChain;
```

## **How it works**

The `chain` function:

- Iterates through the array of `MiddlewareFactory` functions.
- Calls each `MiddlewareFactory` function with the next middleware function in the chain.
- Returns a single `CustomMiddleware` function that represents the entire chain of middleware functions.

## **Note**

This implementation assumes that each MiddlewareFactory function returns a CustomMiddleware function that takes request, event, and response objects as arguments. You may need to modify the implementation to fit your specific use case.
