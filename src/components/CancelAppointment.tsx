import { Button, Flex, Modal, Title } from "@mantine/core";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCancelAppointment: () => void;
  selectedAppointment: { name: string; age: number; gender: string; time: string; };
}

export function CancelAppointment({ isOpen, onClose, onCancelAppointment, selectedAppointment }: Props) {
  return (
    <Modal opened={isOpen} onClose={onClose} size="md" centered overlayProps={{ zIndex: 201 }}>
      <Title order={4} fw={500} ta="center">
        Tem certeza que deseja cancelar o agendamento de <strong>{selectedAppointment.name}</strong>?

        <Flex mt="lg" gap="lg" justify="center">
          <Button color="red" onClick={onClose}>
            Não
          </Button>
          <Button color="green" onClick={onCancelAppointment}>
            Sim
          </Button>
        </Flex>
      </Title>
    </Modal>
  )
}