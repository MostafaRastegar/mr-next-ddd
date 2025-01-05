# **Pagination**

A customizable `Antd` pagination component for React applications. this component used by `ContentEditableTable`

# **Props**

Required Props

- `total`: The total number of items to be paginated.
- `pathUrl`: The URL path to be used for pagination.
- `Optional` Props
- `showQuickJumper`: A boolean indicating whether to show the quick jumper feature. Defaults to false.
- `showTotal`: A function that returns a custom total text element. Defaults to a built-in implementation.
- `rest`: Any additional props to be passed to the underlying Pagination component from antd.

# **Usage**

Import the component and use it in your React application:

```typescriptreact
import PaginationCP from "./Pagination/default";

const MyComponent = () => {
  return (
    <PaginationCP
      total={100}
      pathUrl="/my-path"
      showQuickJumper={true}
      showTotal={(total, range) => (
        <div>
          Custom total text: {range[0]} - {range[1]} of {total}
        </div>
      )}
    />
  );
};


```

## **Features**

- Customizable pagination component with support for quick jumper and total text.
- Automatically updates the URL path based on pagination changes.
- Supports custom total text rendering through the showTotal prop.
- Implementation Notes
- The component uses the useParamsChange hook to update the URL path based on pagination changes.
- The useLayoutEffect hook is used to customize the pagination layout and styling.
- The component uses the antd Pagination component under the hood.
