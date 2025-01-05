# **HandleNoData Component**

The `HandleNoData` component is a utility component that helps handle cases where data is pending or empty. It provides a simple way to render a loading skeleton or an empty state message when no data is available.

## **Props**

The component accepts the following props:

- `dataLength`: An optional number indicating the length of the data. Defaults to 0.
- `isPending`: A boolean indicating whether the data is pending. Defaults to false.
- `children`: The React node to render when data is available.

## **Behavior**

The component behaves as follows:

- When `isPending` is true, it renders an Ant Design `Skeleton` component to indicate that data is loading.
- When `dataLength` is 0, it renders an Ant Design `Empty` component with a simple presented image to indicate that no data is available.
- When `dataLength` is greater than 0, it renders the `children` component.

## **Example Usage**

Here's an example of how to use the `HandleNoData` component:

```typescriptreact
import HandleNoData from './HandleNoData';

const MyComponent = () => {
  const data = []; // assume this is your data
  const isLoading = true; // assume this is your loading state

  return (
    <HandleNoData dataLength={data.length} isPending={isLoading}>
      {/* render your data here */}
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </HandleNoData>
  );
};
```
