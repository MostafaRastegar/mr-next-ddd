# usePrevious Hook

The `usePrevious` hook is a custom hook used to store the previous value of a given state or prop in a React application.

## Usage

---

The `usePrevious` hook takes a single argument `value` and returns the previous value of `value`.

### Example

```jsx
import React from "react";
import usePrevious from "./usePrevious";

function MyComponent() {
  const [count, setCount] = React.useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## How it works

The `usePrevious` hook uses two `useRef` hooks to store the current and previous values of the given value. When the value changes, the `previousRef` is updated to store the previous value, and the `currentRef` is updated to store the new value.

## Note

This implementation assumes that the `value` is a primitive value or an object that can be compared using the `!==` operator. If you need to store the previous value of a more complex data structure, you may need to modify the implementation to fit your specific use case.
