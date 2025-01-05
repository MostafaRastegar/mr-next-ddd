import { Button, Form, Input, Modal } from 'antd';
import { useUsersContext } from '../_viewModule/users.context';

export const EditModal = () => {
  const { selectedRowState, setOpenEditModal, openEditModal, updateUser } =
    useUsersContext();
  const initValue = selectedRowState[0];
  const { isPending, mutate } = updateUser;
  return (
    <Modal
      title="Edit user"
      onClose={() => setOpenEditModal(false)}
      onCancel={() => setOpenEditModal(false)}
      open={openEditModal}
      footer={false}
    >
      <Form
        initialValues={initValue}
        layout="vertical"
        onFinish={(formData) => mutate({ ...formData, id: initValue.id })}
      >
        <Form.Item label="Username" name="username">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={isPending} htmlType="submit">
            update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
