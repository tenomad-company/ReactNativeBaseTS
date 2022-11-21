import {AlertDialog, Button} from 'native-base';
import React from 'react';

type IModalAlertProps = {
  title: string;
  description: string;
  isOpen?: boolean;
  onClose?: () => void;
};

const ModalAlert = ({
  title,
  description,
  isOpen,
  onClose,
}: IModalAlertProps) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>{description}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="danger" rounded="sm" onPress={onClose}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ModalAlert;
