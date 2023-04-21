import { addScrollBar } from '@/helpers/addScrollBar';
import { shortDatParser } from '@/helpers/parsers';
import { useAppointmentStore } from '@/store/appointment';
import { ActionIcon, createStyles, Modal, Table } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useId, useState } from 'react';
import { X } from 'tabler-icons-react';
import { AppointmentRow } from './AppointmentRow';
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
  header: {
    'th': {
      fontSize: '1.2rem !important',
      color: theme.colors.support[0] + ' !important',
    }
  }
}));

export function AppointmentsTable() {
  const { classes } = useMantineStyles();

  const id = useId();

  const rows = elements.map((element) => (
    <AppointmentRow key={element.name + id}>
      <td>{element.name}</td>
      <td>{element.age}</td>
      <td>{element.gender}</td>
      <td>{element.time}</td>
    </AppointmentRow>
  ));

  return (
      <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
        <thead className={classes.header}>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>Horário</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
  );
}
