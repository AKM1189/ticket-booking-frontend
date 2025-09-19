import { modalStyle } from "@/constants/styleConstants";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { Button, Modal, Text } from "@mantine/core";

const ConfirmModal = () => {
  const { isOpen, title, message, onConfirm, onCancel, close } =
    useConfirmModalStore();

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      title={title}
      centered
      classNames={modalStyle}
    >
      <Text size="sm">{message}</Text>
      <div className="flex justify-end mt-5 gap-5">
        <Button
          className="dashboard-btn !text-text !text-sm"
          variant="none"
          onClick={() => {
            onCancel?.();
            close();
          }}
        >
          Cancel
        </Button>

        <Button
          className="dashboard-btn !text-sm !h-[35px] !w-[90px] !p-0 !bg-red-500/90 hover:!bg-red-500/80 transition-color duration-100"
          color="red"
          onClick={() => {
            onConfirm?.();
            close();
          }}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
