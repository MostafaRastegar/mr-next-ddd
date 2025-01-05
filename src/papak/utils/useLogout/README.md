# useLogOut Hook

The `useLogOut` hook is a custom hook used to handle logout functionality in a Next.js application.

## Dependencies

- `next/navigation`: provides the `useRouter` hook for client-side routing
- `universal-cookie`: provides a way to manage cookies in a universal (client and server) context

## Usage

The `useLogOut` hook takes an array of cookie keys as an argument and returns an object with a `logout` function.

### Example

```jsx
import { useLogOut } from "./useLogOut";

const MyComponent = () => {
  const { logout } = useLogOut(["token", "refreshToken"]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
```

## How it works

- The `useLogOut` hook creates a new instance of the `Cookies` class from `universal-cookie`, with the path set to `/`.

- The `logout` function is defined, which iterates over the provided array of cookie keys and removes each cookie using the `cookies.remove()` method.

- After removing the cookies, the `logout` function uses the `useRouter` hook from `next/navigation` to redirect the user to the `/login` page.

## Note

This implementation assumes that the cookie keys are stored in an array and passed as an argument to the `useLogOut` hook. You may need to modify the implementation to fit your specific use case.
