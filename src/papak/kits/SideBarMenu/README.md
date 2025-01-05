# **SideBarMenu Component Documentation**

The `SideBarMenu` component is a custom React component designed to render a menu system with Ant Design's Menu component. It provides a flexible way to define menu items and their properties, and automatically selects and opens menu items based on the current path.

## **Props**

SideBarProps

- `items`: An array of menu items, where each item is an object with the following properties.
  - `key`: A unique key for the menu item (optional)
  - `icon`: An icon to display next to the menu item (optional)
  - `children`: An array of child menu items (optional)
  - `label`: The text to display for the menu item

## **Functions**

`getItem(label, key, icon, children)`
A utility function to create a new menu item object with the specified properties.

## **Hooks**

`useCurrentPath()`
A custom hook that returns the current path and an array of pathnames.

## **Implementation**

The `SideBarMenu` component uses the useCurrentPath hook to determine the current path and an array of pathnames. It then uses this information to automatically select and open menu items by setting the defaultSelectedKeys and `defaultOpenKeys` props on the `Menu` component.

The component also applies custom styles to the menu items using CSS-in-JS syntax.

## **Usage**

To use the `SideBarMenu` component, simply import it and pass an array of menu items as a prop:

```typescriptreact

import SideBarMenu from './SideBarMenu';

const menuItems = [
  getItem('Home', 'home', <HomeIcon />, []),
  getItem('About', 'about', <AboutIcon />, [
    getItem('Team', 'team', <TeamIcon />, []),
    getItem('Contact', 'contact', <ContactIcon />, []),
  ]),
];

const App = () => {
  return (
    <SideBarMenu items={menuItems} />
  );
};

```

This will render a menu system with the specified menu items, automatically selecting and opening items based on the current path.
