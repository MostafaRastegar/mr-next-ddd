# Service Response Handler

The `serviceHandler` function is a utility function used to handle responses from services.

## Usage

The `serviceHandler` function takes two arguments:

- `service`: a function that returns a response object.
- `options`: an optional object with two properties:
  - `onSuccess`: a function to be called when the response is successful.
  - `onError`: a function to be called when an error occurs.

The function returns a promise that resolves to the response object.

### Example

```jsx
import serviceHandler from "./serviceHandler";

const myService = async () => {
  // Simulate a service call
  return {
    status: 200,
    data: { foo: "bar" },
  };
};

const options = {
  onSuccess: (response) => console.log("Success:", response),
  onError: (error) => console.error("Error:", error),
};

serviceHandler(myService, options)
  .then((response) => console.log("Response:", response))
  .catch((error) => console.error("Error:", error));
```

## How it works

The `objectToQueryString` function iterates over the object's keys and values, and for each key-value pair:

- If the value is an array, it maps each item in the array to a key-value pair and joins them with `&`.
- If the value is not an array, it simply concatenates the key and value with `=`.
- It filters out any undefined or null values.
- Finally, it joins all the key-value pairs with `&` and returns the query string.

## Note

This implementation assumes that the application uses Ant Design and its `Form` component. You may need to modify the implementation to fit your specific use case.
