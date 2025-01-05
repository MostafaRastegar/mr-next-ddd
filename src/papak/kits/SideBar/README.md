# **SideBar Component Documentation**

The SideBar component is a collapsible sidebar navigation menu built with React and Ant Design. It provides a responsive and customizable sidebar solution for applications.

## **Props**

SideBarProps

- `items`: An array of MenuItemType objects that represent the menu items to be displayed in the sidebar.

## **Component Structure**

The SideBar component consists of the following elements:

- A collapsible Ant Design Sider component with a custom trigger element.
- A MainMenu component that renders the menu items.

## **Custom Trigger Element**

The custom trigger element is a div container with a flex layout that contains:

- An IconLayoutSidebarLeftCollapse icon from @tabler/icons-react.
- A span element with a text label that toggles its opacity and width based on the collapsed state of the sidebar.

## **Usage**

To use the SideBar component, simply import it and pass an array of MenuItemType objects as the items prop:

```typescriptreact

import SideBar from './SideBar';

const menuItems: MenuItemType[] = [
  // Define your menu items here
];

const App = () => {
  return (
    <SideBar items={menuItems} />
  );
};

```

## **Customization**

The SideBar component can be customized by modifying the following:

- The collapsed state can be controlled by passing a custom collapsed prop and an onCollapse callback function.
- The breakpoint prop can be adjusted to change the responsive behavior of the sidebar.
- The width prop can be adjusted to change the width of the sidebar.
- The className prop can be used to add custom CSS classes to the sidebar container.
- The trigger prop can be customized by passing a custom trigger element.
