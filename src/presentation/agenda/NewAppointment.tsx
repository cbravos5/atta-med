import { useAppointmentStore } from "@/presentation/store/appointment";
import { ActionIcon, Button, createStyles, Modal } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useCallback, useMemo, useRef, useState } from "react";
import { Clock } from "tabler-icons-react";
import { Form } from "../components/Form";
import { NewPatientAccordion } from "./NewPatientAccordion";
import { SearchInput } from "../components/SearchInput";
import { shortDateParser } from "../helpers/parsers";
import { createAppointment, searchMedics, searchPatients } from "@/main/Registry";
import { Medic } from "@/domain/Models/Medic";
import { notifications } from "@mantine/notifications";
import { Patient } from "@/domain/Models/Patient";

type FormValues = {
  patient: string;
  medic: string;
  hour: string;
};

const useMantineStyles = createStyles((theme) => ({
  modal: {
    ".mantine-Modal-title": {
      fontSize: 25,
      fontWeight: 600,
    },
  },
}));

export function NewAppointment() {
  const { classes } = useMantineStyles();
  const { openDate, closeModal, newAppointmentModal } = useAppointmentStore();
  const isMobile = useMediaQuery("(max-width: 50em)");

  const [isLoading, setIsLoading] = useDisclosure(false);

  const [patients, setPatients] = useState([] as Patient[]);
  const [medics, setMedics] = useState([] as Medic[]);

  const hourInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    initialValues: {
      hour: "",
      medic: "",
      patient: "",
    },
    validateInputOnBlur: true,
    validate: {
      patient: (value) => (!!value ? null : "Campo obrigatório"),
      medic: (value) => (!!value ? null : "Campo obrigatório"),
      hour: (value) => (!!value ? null : "Campo obrigatório"),
    },
  });

  const onSearchPatients = useCallback(async (searchValue: string) => {
    try {
      const response = await searchPatients.execute(searchValue);
      setPatients(response);
    } catch (error) {
      notifications.show({
        title: "Erro!",
        message: "Occorreu um problema ao realizar a pesquisa",
      });
    }
  }, []);

  const onSearchMedics = useCallback(async (searchValue: string) => {
    try {
      const response = await searchMedics.execute(searchValue);
      setMedics(response);
    } catch (error) {
      notifications.show({
        title: "Erro!",
        message: "Occorreu um problema ao realizar a pesquisa",
      });
    }
  }, []);

  const patientsData = useMemo(() => patients.map((patient) => ({ value: patient.name, ...patient })), [patients]);
  const medicsData = useMemo(() => medics.map((medic) => ({ value: medic.name, ...medic })), [medics]);

  const onSubmit = useCallback(async (data: FormValues) => {
    setIsLoading.open();
    try {
      await createAppointment.execute(data);
      form.reset();
      closeModal("newAppointment");
      notifications.show({
        title: "Sucesso!",
        message: "Novo agendamento criado",
      });
    } catch (error: any) {
      notifications.show({
        title: "Erro!",
        message: error?.message,
      });
    } finally {
      setIsLoading.close();
    }
  }, []);

  return (
    <Modal
      opened={newAppointmentModal}
      centered
      onClose={() => closeModal("newAppointment")}
      title={"Novo agendamento em " + shortDateParser.format(openDate || undefined)}
      className={classes.modal}
      fullScreen={isMobile}
      size="80%"
      styles={{
        content: { height: "95%" },
        body: { maxWidth: 1000, margin: "auto" },
        title: { flex: 1, textAlign: "center" },
      }}
    >
      <NewPatientAccordion />
      <Form onSubmit={form.onSubmit(onSubmit)} style={{ marginTop: "1.5rem" }}>
        <SearchInput
          label="Paciente"
          withAsterisk
          placeholder="Nome ou CPF"
          data={patientsData}
          onSearch={onSearchPatients}
          onItemSubmit={(item) => form.setFieldValue("patient", item.id)}
          error={form.errors.patient}
        />

        <SearchInput
          label="Médico"
          withAsterisk
          placeholder="Nome ou CRM"
          data={medicsData}
          onSearch={onSearchMedics}
          onItemSubmit={(item) => form.setFieldValue("medic", item.id)}
          error={form.errors.medic}
        />

        <TimeInput
          label="Horário"
          aria-label="Horário"
          ref={hourInputRef}
          withAsterisk
          rightSection={
            <ActionIcon onClick={() => hourInputRef.current?.showPicker()}>
              <Clock size="1rem" />
            </ActionIcon>
          }
          {...form.getInputProps("hour")}
        />

        <Button variant="outline" sx={{ alignSelf: "end" }} type="submit" loading={isLoading}>
          Criar
        </Button>
      </Form>
    </Modal>
  );
}
