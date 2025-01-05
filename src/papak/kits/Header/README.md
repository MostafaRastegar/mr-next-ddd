# **Header Component**

## **Description**

A customizable header component for React applications, built with Ant Design and Next.js.

## **Features**

- Supports light and dark modes
- Allows for custom logo and logo text
- Includes a language switcher menu
- Provides a theme direction toggle button
- Displays a help icon and a notification bell with a badge
- Supports custom profile menu

## **Props**

- `handleThemeMode`: a function to toggle the theme mode
- `isDarkMode`: a boolean indicating whether the theme is in dark mode
- `handleThemeDirection`: a function to toggle the theme direction
- `isRtlMode`: a boolean indicating whether the theme is in RTL mode
- `profileMenu`: a React node for the profile menu
- `children`: a React node for additional content
- `customLogo`: a React node for a custom logo
- `logoText`: a string for the logo text

## **Installation**

This component is designed to be used with Next.js and Ant Design. Make sure you have these dependencies installed in your project.

## **Usage**

Import the component and use it in your React application:

```typescriptreact
import Header from './Header';

const App = () => {
  const handleThemeMode = () => {
    // toggle theme mode logic
  };

  const handleThemeDirection = () => {
    // toggle theme direction logic
  };

  return (
    <Header
      handleThemeMode={handleThemeMode}
      isDarkMode={true}
      handleThemeDirection={handleThemeDirection}
      isRtlMode={true}
      profileMenu={<Menu>...</Menu>}
      customLogo={<img src="/custom-logo.svg" />}
      logoText="My App"
    >
      <!-- additional content -->
    </Header>
  );
};

```
