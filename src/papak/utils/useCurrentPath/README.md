# useCurrentPath

### `request`

A custom hook that extracts and returns information about the current URL pathname.

## Import:

import { useCurrentPath } from './useCurrentPath';

#### Return Value

The `useCurrentPath` hook returns an object with the following properties:

- `pathname`: The full URL pathname.
- `pathnameList`: An array of URL pathname segments.
- `currentPath`: The last segment of the URL pathname (i.e., the current path).
- `currentPathParent`: The second-to-last segment of the URL pathname (i.e., the parent of the current path).
- `currentPathMainParent`: The third-to-last segment of the URL pathname (i.e., the grandparent of the current path).

### Example Usage

```javascript
import { useCurrentPath } from "./useCurrentPath";

function MyComponent() {
  const { pathname, currentPath, currentPathParent, currentPathMainParent } =
    useCurrentPath();

  return (
    <div>
      <h1>Current Path: {currentPath}</h1>
      <p>Parent Path: {currentPathParent}</p>
      <p>Main Parent Path: {currentPathMainParent}</p>
      <p>Full Pathname: {pathname}</p>
    </div>
  );
}
```

### `How it Works`

The `useCurrentPath` hook uses the `usePathname` hook from `next/navigation` to get the current URL pathname. It then splits the pathname into an array of segments using the `/` character as a separator. The last segment of the array is considered the current path, the second-to-last segment is considered the parent of the current path, and the third-to-last segment is considered the grandparent of the current path. The hook returns an object with these values, along with the original pathname and pathname list.
