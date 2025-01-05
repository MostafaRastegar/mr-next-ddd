import React from 'react';

# (ContentEditableTable)

## Overview

The `ContentEditableTable` component is a reusable table component designed to handle various data display and editing scenarios. It provides features such as pagination, row selection, and expandable rows.

## Props

### ContentEditableTableProps

The `ContentEditableTableProps` interface defines the properties that can be passed to the `ContentEditableTable` component.

- `data`: An array of objects representing the table data.
- `count`: The total number of data items (used for pagination).
- `isPending`: A boolean indicating whether the data is being loaded.
- `onSelectNone`: A boolean indicating whether to select none by default.
- `rowKey`: The key to use for each row (defaults to an empty string).
- `paginationPath`: The path to use for pagination.
- `columns`: An array of column definitions.
- `setSelectedRowsState`: A function to update the selected rows state.
- `selectedRowsState`: The current selected rows state.
- `expandable`: An object defining the expandable row configuration.
- `selectionType`: The type of selection to use (either 'checkbox' or 'radio', defaults to 'checkbox').
- `showTotal`: A function to display the total count.
- `showTotalCount`: A boolean indicating whether to show the total count.
- `showQuickJumper`: A boolean indicating whether to show the quick jumper.
- `actions`: An array of action definitions.

### Action Definitions

Each action definition should have the following properties:

- `icon`: An optional JSX element to use as the action icon.
- `label`: The label to display for the action.
- `key`: A unique key for the action.
- `disabled`: An optional boolean indicating whether the action is disabled.
- `onClick`: An optional function to call when the action is clicked.

## Example Usage

```typescript
import React from "react";
import { ContentEditableTable } from "./ContentEditableTable/default";

const data = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Doe", age: 25 },
  { id: 3, name: "Bob Smith", age: 40 },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
];

const actions = [
  {
    label: "Edit",
    key: "edit",
    icon: <EditOutlined />,
    onClick: () => console.log("Edit clicked"),
  },
  {
    label: "Delete",
    key: "delete",
    icon: <DeleteOutlined />,
    onClick: () => console.log("Delete clicked"),
  },
];

const App = () => {
  const [selectedRowsState, setSelectedRowsState] = React.useState([]);

  return (
    <ContentEditableTable
      data={data}
      columns={columns}
      selectedRowsState={selectedRowsState}
      setSelectedRowsState={setSelectedRowsState}
      actions={actions}
      paginationPath="/users"
      showQuickJumper
    />
  );
};
```
