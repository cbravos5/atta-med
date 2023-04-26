import { Appointment } from "@/domain/Models/Appointment";
import { Gender } from "@/domain/Models/Gender";
import { cancelAppointment, getAppointments } from "@/main/Registry";
import { addScrollBar } from "@/presentation/helpers/addScrollBar";
import { shortDateParser, timeParser } from "@/presentation/helpers/parsers";
import { useAppointmentStore } from "@/presentation/store/appointment";
import { ActionIcon, Center, createStyles, Loader, Modal, Skeleton, Table, Title } from "@mantine/core";
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
        <AppointmentRow key={appointment.id} isCancelled={appointment.isCancelled}>
          <td>{appointment.patient.name}</td>
          <td>{appointment.patient.age}</td>
          <td>{Gender[appointment.patient.gender]}</td>
          <td>{timeParser.format(new Date(appointment.when))}</td>
          <td>
            {!appointment.isCancelled && (
              <ActionIcon
                className={classes.action}
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setIsCancelOpen.open();
                }}
              >
                <X />
              </ActionIcon>
            )}
          </td>
        </AppointmentRow>
      )),
    [appointments]
  );

  const onGetAppointments = useCallback(async (date: Date) => {
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

  const onCancelAppointment = useCallback(
    async (id: string) => {
      setIsLoading.open();
      try {
        await cancelAppointment.execute(id);

        if (openDate) onGetAppointments(openDate);
      } catch (error) {
        notifications.show({
          title: "Erro",
          message: "Ocorreu um problema ao buscar pelos agendamentos!",
        });
        setIsLoading.close();
      } finally {
        setIsCancelOpen.close();
      }
    },
    [openDate]
  );

  useEffect(() => {
    if (openDate && appointmentsModal) onGetAppointments(openDate);
  }, [openDate, appointmentsModal]);

  return (
    <>
      <Modal
        opened={appointmentsModal}
        onClose={() => closeModal("appointments")}
        centered
        title={"Agendamentos em " + shortDateParser.format(openDate || undefined)}
        fullScreen={isMobile}
        size="80%"
        styles={{
          content: { height: "95%" },
          body: { maxWidth: 1000, minWidth: 565, margin: "auto", height: "100%" },
          title: { flex: 1, textAlign: "center" },
        }}
        className={classes.modal}
      >
        <Skeleton visible={isLoading} h="100%">
          {appointments.length === 0 ? (
            <Center w="100%" h="100%">
              <Title order={3} color="gray" ta="center">
                Não existem agendamentos para esta data
              </Title>
            </Center>
          ) : (
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
          )}
        </Skeleton>
      </Modal>

      <CancelAppointment
        onClose={setIsCancelOpen.close}
        isOpen={isCancelOpen}
        selectedAppointment={selectedAppointment}
        onCancelAppointment={onCancelAppointment}
      />
    </>
  );
}
