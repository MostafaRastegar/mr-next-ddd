import { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useUsersContext } from '../_viewModule/users.context';

export const AddModal = () => {
  const { setOpenAddModal, openAddModal, addUser } = useUsersContext();
  const { isPending, mutate } = addUser;
  const [form] = Form.useForm();
  useEffect(() => {
    if (openAddModal) {
      form.resetFields();
    }
  }, [openAddModal]);

  return (
    <Modal
      title="Edit user"
      onClose={() => setOpenAddModal(false)}
      onCancel={() => setOpenAddModal(false)}
      open={openAddModal}
      footer={false}
    >
      {openAddModal && (
        <Form
          layout="vertical"
          onFinish={(formData) => mutate(formData)}
          form={form}
        >
          <Form.Item label="ID" name="id">
            <Input />
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button loading={isPending} htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
