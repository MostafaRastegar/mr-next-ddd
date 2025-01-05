# QueryClientProvider

This file exports a custom `QueryClientProvider` component that wraps the `QueryClient` component from `@tanstack/react-query`. It sets up a new instance of `QueryClient` with default options for queries, including a retry count of 2.

## Usage

To use this provider, simply wrap your app with it:

### Example

```typescriptreact
import QueryClientProvider from './QueryClientProvider';

function App() {
  return (
    <QueryClientProvider>
      <!-- Your app components here -->
    </QueryClientProvider>
  );
}
```

### Features

- Provides a QueryClient instance with default options for queries
- Enables streamed hydration using ReactQueryStreamedHydration
- Includes ReactQueryDevtools for debugging and inspecting queries

### Configuration

You can customize the `QueryClient` instance by passing options to the `QueryClient` constructor. For example, you can change the retry count or add other default options.

### Note

This provider is marked as a `client` component, which means it will only be executed on the client-side. This is because `@tanstack/react-query` relies on browser-specific APIs and cannot be executed on the server.
