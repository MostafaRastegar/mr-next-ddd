import { Button, Modal } from "antd";
import type { DispatchSetStateAction, VoidFunction } from "papak/_utilsTypes";

interface ConfirmModalProps {
    open: boolean;
    isPending: boolean;
    handleOk: VoidFunction;
    handleCancel: DispatchSetStateAction<boolean>;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    content?: React.ReactNode;
}
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    handleCancel,
    handleOk,
    open,
    isPending,
    content = "Are you sure?",
    title = "Confirm",
    confirmText = "Yes",
    cancelText = "No",
}) => {
    return (
        <Modal
            open={open}
            title={title}
            onCancel={() => handleCancel(false)}
            footer={[
                <Button type="default" onClick={() => handleCancel(false)}>
                    {cancelText}
                </Button>,
                <Button
                    type="primary"
                    loading={isPending}
                    onClick={() => handleOk()}
                    danger
                >
                    {confirmText}
                </Button>,
            ]}
        >
            {content}
        </Modal>
    );
};
