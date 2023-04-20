import { addScrollBar } from '@/helpers/addScrollBar';
import { useAppointmentStore } from '@/store/appointment';
import { ActionIcon, createStyles, Modal, Table, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { X } from 'tabler-icons-react';
import { CancelAppointment } from './CancelAppointment';

const elements = [
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '09:30',
  },
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '10:30',
  },
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '11:30',
  },
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '12:30',
  },
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '13:30',
  },
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '14:30',
  },
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '15:30',
  },
  {
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '16:30',
  },
];

const useMantineStyles = createStyles((theme) => ({
  modal: {
    '.mantine-Paper-root': {
      flex: 1,
      maxWidth: 1000,
      maxHeight: 500,

      overflowY: 'scroll',
      ...addScrollBar(),
    },

    'h3, th': {
      color: theme.colors.support[0] + ' !important',
    },

    'td, th': { fontSize: '1.2rem !important' },
  },

  row: {
    color: theme.colors.secondary[0],

    backgroundColor: theme.colors.primary[0],

    marginBottom: 5,

    'td:first-child': { borderRadius: '5px 0 0 5px' },
    'td:last-child': { borderRadius: '0 5px 5px 0' },
  },

  action: {
    background: theme.colors.secondary[0],
    color: theme.colors.support[0],
    ':hover': {
      background: theme.colors.tertiary[0],
    },
  },
}));

const fullDateParser = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'medium',
});

export function Appointments() {
  const { classes } = useMantineStyles();
  const { openDate, setOpenDate } = useAppointmentStore();

  const [isCancelOpen, setIsCancelOpen] = useDisclosure(false);
  const [selectedAppointment, setSelectedAppointment] = useState({
    name: 'João da Silva de Jesus',
    age: 24,
    gender: 'Masculino',
    time: '09:30',
  });

  const rows = elements.map((element) => (
    <tr key={element.name} className={classes.row}>
      <td>{element.name}</td>
      <td>{element.age}</td>
      <td>{element.gender}</td>
      <td>{element.time}</td>
      <td>
        <ActionIcon
          className={classes.action}
          onClick={() =>{
            setSelectedAppointment({
              name: 'João da Silva de Jesus',
              age: 24,
              gender: 'Masculino',
              time: '09:30',
            });
            setIsCancelOpen.open()
          }
            
          }
        >
          <X />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={!!openDate}
        onClose={() => setOpenDate(null)}
        centered
        className={classes.modal}
      >
        <Title order={3} ta="center">
          Agendamentos em {fullDateParser.format(openDate || undefined)}
        </Title>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Sexo</th>
              <th>Horário</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Modal>

      <CancelAppointment
        onClose={setIsCancelOpen.close}
        isOpen={isCancelOpen}
        selectedAppointment={selectedAppointment}
        onCancelAppointment={setIsCancelOpen.close}
      />
    </>
  );
}
