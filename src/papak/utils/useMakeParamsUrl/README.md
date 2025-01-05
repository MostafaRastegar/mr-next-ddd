# useMakeParamsUrl and useMakeSort Hooks

The `useMakeParamsUrl` and `useMakeSort` hooks are custom hooks used to handle URL parameter manipulation in a Next.js application.

## Dependencies

---

- `next/navigation`: provides the `useRouter` and `usePathname` hooks for client-side routing
- `papak/helpers/objectToQueryString`: provides a function to convert an object to a query string
- `papak/utils/useSearchParamsToObject`: provides a hook to convert search parameters to an object

## Usage

---

### useMakeParamsUrl

The `useMakeParamsUrl` hook returns an object with a `resetPage` function, which resets the page number and page size parameters in the URL.

### useMakeSort

The `useMakeSort` hook returns an object with an `onSort` function, which updates the ordering parameter in the URL, and several other properties:

- `orderingParams`: the current ordering parameter value
- `originalPath`: the original URL path without ordering parameter
- `hasOrder`: a boolean indicating whether an ordering parameter is present

## How it works

---

### useMakeParamsUrl

1. The `useMakeParamsUrl` hook uses `usePathname` to get the current URL pathname.
2. It uses `useSearchParamsToObject` to convert the search parameters to an object.
3. It extracts the `page` and `page_size` parameters from the search parameters, defaulting to `1` and `50` respectively.
4. The `resetPage` function is defined, which resets the page number and page size parameters in the URL using `router.push`.

### useMakeSort

1. The `useMakeSort` hook uses `usePathname` to get the current URL pathname.
2. It uses `useSearchParamsToObject` to convert the search parameters to an object.
3. It extracts the `page_size` parameter from the search parameters, defaulting to `50`.
4. The `onSort` function is defined, which updates the ordering parameter in the URL using `router.push`.
5. The `orderingParams`, `originalPath`, and `hasOrder` properties are calculated based on the current search parameters.

## Note

---

These implementations assume that the search parameters are stored in the URL and can be accessed using `useSearchParamsToObject`. You may need to modify the implementation to fit your specific use case.
