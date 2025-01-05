# objectToQueryString Function

The `objectToQueryString` function is a utility function used to convert an object into a query string.

## Usage

---

The `objectToQueryString` function takes an object as an argument and returns a query string.

### Example

```ts
import objectToQueryString from "./objectToQueryString";

const params = {
  foo: "bar",
  baz: ["qux", "quux"],
  corge: null,
};

const queryString = objectToQueryString(params);
console.log(queryString); // Output: "foo=bar&baz=qux&baz=quux"
```

## How it works

The `objectToQueryString` function iterates over the object's keys and values, and for each key-value pair:

- If the value is an array, it maps each item in the array to a key-value pair and joins them with `&`.
- If the value is not an array, it simply concatenates the key and value with `=`.
- It filters out any undefined or null values.
- Finally, it joins all the key-value pairs with `&` and returns the query string.

## Note

This implementation assumes that the application uses Ant Design and its `Form` component. You may need to modify the implementation to fit your specific use case.
