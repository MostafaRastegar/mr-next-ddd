# useThemeProvider Hook

The `useThemeProvider` hook is a custom hook used to manage theme settings, including dark mode and RTL direction, in a Next.js application.

## Usage

The `useThemeProvider` hook returns an object with several properties and functions:

- `ConfigProvider`: a component that wraps the application with the Ant Design ConfigProvider, allowing for theme customization.
- `handleThemeMode`: a function to toggle dark mode.
- `handleThemeDirection`: a function to toggle RTL direction.
- `isDarkMode`: a boolean indicating whether dark mode is enabled.
- `isRtlMode`: a boolean indicating whether RTL direction is enabled.
- `setIsRtlMode`: a function to update the RTL direction state.

### Example

```jsx
import useThemeProvider from './useThemeProvider';

function MyApp() {
  const { ConfigProvider, handleThemeMode, handleThemeDirection } = useThemeProvider();

  return (
    <ConfigProvider>
      <button onClick={handleThemeMode}>Toggle Dark Mode</button>
      <button onClick={handleThemeDirection}>Toggle RTL Direction</button>
      <!-- Your application content here -->
    </ConfigProvider>
  );
}
```

## How it works

The `useThemeProvider` hook uses several dependencies, including `antd`, `antd-jalali`, and `next/navigation`, to manage theme settings. It initializes the theme settings based on local storage values and provides functions to update these settings.

## Note

This implementation assumes that the application uses Ant Design and Next.js. You may need to modify the implementation to fit your specific use case.
