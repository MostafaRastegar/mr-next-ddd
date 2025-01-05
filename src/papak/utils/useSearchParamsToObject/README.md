# useSearchParamsToObject Hook

The `useSearchParamsToObject` hook is a custom hook used to convert search parameters to an object in a Next.js application.

## Usage

The `useSearchParamsToObject` hook returns an object with the search parameters, including `page` and `page_size` properties.

### Example

```jsx
import useSearchParamsToObject from "./useSearchParamsToObject";

function MyComponent() {
  const searchParams = useSearchParamsToObject();

  return (
    <div>
      <p>Page: {searchParams.page}</p>
      <p>Page size: {searchParams.page_size}</p>
    </div>
  );
}
```

## How it works

The `useSearchParamsToObject` hook uses the `useSearchParams` hook from `next/navigation` to get the search parameters. It then extracts the `page` and `page_size` parameters, defaulting to `1` and `50` respectively. The hook also iterates over the remaining search parameters, storing them in an object.

## Note

This implementation assumes that the search parameters are stored in the URL and can be accessed using `useSearchParams`. You may need to modify the implementation to fit your specific use case.
