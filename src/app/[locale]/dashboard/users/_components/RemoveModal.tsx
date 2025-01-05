import { Button, Form, Modal } from 'antd';
import { useUsersContext } from '../_viewModule/users.context';

export const RemoveModal = () => {
  const { selectedRowState, setOpenRemoveModal, openRemoveModal, removeUser } =
    useUsersContext();
  const initValue = selectedRowState[0];
  const { isPending, mutate } = removeUser;
  return (
    <Modal
      title="Edit user"
      onClose={() => setOpenRemoveModal(false)}
      onCancel={() => setOpenRemoveModal(false)}
      open={openRemoveModal}
      footer={false}
    >
      <Form
        initialValues={initValue}
        layout="vertical"
        onFinish={() => mutate({ id: initValue.id })}
      >
        <div className="py-4">Are you sure?</div>
        <Form.Item>
          <Button loading={isPending} type="primary" danger htmlType="submit">
            yes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
