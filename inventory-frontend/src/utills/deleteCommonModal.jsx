import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Text } from '@mantine/core';

const DeleteConfirmationModal = ({
  opened,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item?',
}) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text mb="md">{message}</Text>
      <Button color="red" onClick={onConfirm} mr="sm" leftSection={<FontAwesomeIcon icon={faCheck} />}>
        Yes, Delete
      </Button>
      <Button variant="outline" onClick={onClose} leftSection={<FontAwesomeIcon icon={faTimes} />}>
        Cancel
      </Button>
    </Modal>
  );
};

export default DeleteConfirmationModal;
