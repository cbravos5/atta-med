import { Appointment } from "@/domain/Models/Appointment";
import { Gender } from "@/domain/Models/Gender";
import { createStyles, Table } from "@mantine/core";
import { AppointmentRow } from "../components/AppointmentRow";
import { timeParser } from "../helpers/parsers";

type Props = {
  appointments: Appointment[];
}

const useMantineStyles = createStyles((theme) => ({
  header: {
    th: {
      fontSize: "1.2rem !important",
      color: theme.colors.support[0] + " !important",
    },
  },
}));

export function AppointmentsTable({ appointments }: Props) {
  const { classes } = useMantineStyles();
  const rows = appointments.map((appointment) => (
    <AppointmentRow key={appointment.id} isCancelled={appointment.isCancelled}>
      <td>{appointment.patient.name}</td>
      <td>{appointment.patient.age}</td>
      <td>{Gender[appointment.patient.gender]}</td>
      <td>{timeParser.format(new Date(appointment.when))}</td>
    </AppointmentRow>
  ));

  return (
    <Table sx={{ borderCollapse: "separate", borderSpacing: "0 5px" }}>
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
