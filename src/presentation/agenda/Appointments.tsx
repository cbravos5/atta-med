import { Appointment } from "@/domain/Models/Appointment";
import { getAppointments } from "@/main/Registry";
import { addScrollBar } from "@/presentation/helpers/addScrollBar";
import { shortDatParser, timeParser } from "@/presentation/helpers/parsers";
import { useAppointmentStore } from "@/presentation/store/appointment";
import { ActionIcon, Center, createStyles, Loader, Modal, Skeleton, Table } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useCallback, useEffect, useMemo, useState } from "react";
import { X } from "tabler-icons-react";
import { AppointmentRow } from "../components/AppointmentRow";
import { CancelAppointment } from "./CancelAppointment";

const useMantineStyles = createStyles((theme) => ({
  modal: {
    ".mantine-Paper-root": {
      overflowY: "scroll",
      ...addScrollBar(),
    },

    ".mantine-Modal-title": {
      fontSize: 25,
      fontWeight: 600,
    },

    th: {
      fontSize: "1.2rem !important",
      color: theme.colors.support[0] + " !important",
    },
  },

  action: {
    background: theme.colors.secondary[0],
    color: theme.colors.support[0],
    ":hover": {
      background: theme.colors.tertiary[0],
    },
  },
}));

export function Appointments() {
  const { classes } = useMantineStyles();
  const { openDate, closeModal, appointmentsModal } = useAppointmentStore();

  const [isLoading, setIsLoading] = useDisclosure(true);
  const isMobile = useMediaQuery("(max-width: 50em)");

  const [isCancelOpen, setIsCancelOpen] = useDisclosure(false);
  const [appointments, setAppointments] = useState([] as Appointment[]);
  const [selectedAppointment, setSelectedAppointment] = useState(null as Appointment | null);

  const rows = useMemo(
    () =>
      appointments.map((appointment) => (
        <AppointmentRow key={appointment.id}>
          <td>{appointment.patient.name}</td>
          <td>{appointment.patient.age}</td>
          <td>{appointment.patient.gender}</td>
          <td>{timeParser.format(appointment.when)}</td>
          <td>
            <ActionIcon
              className={classes.action}
              onClick={() => {
                setSelectedAppointment(appointment);
                setIsCancelOpen.open();
              }}
            >
              <X />
            </ActionIcon>
          </td>
        </AppointmentRow>
      )),
    [appointments]
  );

  const onGetAppointments = useCallback(async (date: Date) => {
    console.log("salve");
    setIsLoading.open();
    try {
      const response = await getAppointments.execute(date);

      setAppointments(response);
    } catch (error) {
      notifications.show({
        title: "Erro",
        message: "Ocorreu um problema ao buscar pelos agendamentos!",
      });
    } finally {
      setIsLoading.close();
    }
  }, []);

  useEffect(() => {
    if (openDate && appointmentsModal) onGetAppointments(openDate);
  }, [openDate, appointmentsModal]);

  return (
    <>
      <Modal
        opened={appointmentsModal}
        onClose={() => closeModal("appointments")}
        centered
        title={"Agendamentos em " + shortDatParser.format(openDate || undefined)}
        fullScreen={isMobile}
        size="80%"
        styles={{
          content: { height: "95%" },
          body: { maxWidth: 1000, minWidth: 565, margin: "auto" },
          title: { flex: 1, textAlign: "center" },
        }}
        className={classes.modal}
      >
        <Skeleton visible={isLoading}>
          <Table sx={{ borderCollapse: "separate", borderSpacing: "0 5px" }}>
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
        </Skeleton>
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
