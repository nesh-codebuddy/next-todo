import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { Modal, Button } from "@mantine/core";
import EditTodo from "@/pages/tasks/[id]/edit";

interface EditTodoModalInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditTodoModal: React.FC<EditTodoModalInterface> = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <div>
      <Modal
        opened={open}
        onClose={() => {
          setOpen(false);
          router.back();
        }}
        title="Edit Todo"
        centered
      >
        <EditTodo />
      </Modal>
    </div>
  );
};

export default EditTodoModal;
