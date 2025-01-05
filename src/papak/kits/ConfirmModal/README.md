# ConfirmModal

A confirmation modal component that displays a title, content, and two buttons: Cancel and Yes.

## Props

### `open`: `boolean`

Whether the modal is open or not.

### `isPending`: `boolean`

Whether the modal is in a pending state or not.

### `handleOk`: `VoidFunction`

A function to be called when the Yes button is clicked.

### `handleCancel`: `DispatchSetStateAction<boolean>`

A function to be called when the Cancel button is clicked. It should update the `open` state to `false`.

### `title`: `string` (optional)

The title of the modal. Defaults to "Confirm".

### `content`: `React.ReactNode` (optional)

The content of the modal. Defaults to "Are you sure?".

## Example

```typescript
import React from "react";
import { ConfirmModal } from "./ConfirmModal";

const handleOk = () => {
  console.log("Yes button clicked!");
};

const handleCancel = (open: boolean) => {
  console.log("Cancel button clicked!");
  // Update the open state to false
};

const App = () => {
  return (
    <ConfirmModal
      open={true}
      isPending={false}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Delete File"
      content="Are you sure you want to delete this file?"
    />
  );
};
```
