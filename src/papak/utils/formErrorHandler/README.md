# formErrorHandler Function

The `formErrorHandler` function is a utility function used to handle form errors in an Ant Design application.

## Usage

The `formErrorHandler` function takes two arguments:

- `form`: an instance of the Ant Design `FormInstance` class.
- `error`: an object with error messages, where each key is a field name and each value is an array of error messages.

The function returns an array of error objects, where each object contains the field name and an array of error messages.

### Example

```jsx
import { FormInstance } from "antd";
import { formErrorHandler } from "./formErrorHandler";

const MyForm = () => {
  const [form] = Form.useForm();
  const error = {
    username: ["Username is required"],
    password: ["Password is required"],
  };

  formErrorHandler(form, error);
  // ...
};
```

## How it works

The `formErrorHandler` function iterates over the error object and creates an array of error objects, where each object contains the field name and an array of error messages. It then uses the `setFields` method of the `FormInstance` class to set the error messages for each field.

## Note

This implementation assumes that the application uses Ant Design and its `Form` component. You may need to modify the implementation to fit your specific use case.
