import { shortDatParser } from "@/presentation/helpers/parsers";
import { useAppointmentStore } from "@/presentation/store/appointment";
import { ActionIcon, Button, createStyles, Modal } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useCallback, useRef, useState } from "react";
import { Clock } from "tabler-icons-react";
import { Form } from "../components/Form";
import { NewPatientAccordion } from "./NewPatientAccordion";
import { SearchInput } from "../components/SearchInput";

type FormValues = {
  patient: string;
  medic: string;
  time: string;
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

  const [patients, setPatients] = useState([] as { value: string; id: string }[]);
  const [medics, setMedics] = useState([] as { value: string; id: string }[]);

  const timeInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    validateInputOnBlur: true,
    validate: {
      patient: (value) => (!!value ? null : "Campo obrigatório"),
      medic: (value) => (!!value ? null : "Campo obrigatório"),
      time: (value) => (!!value ? null : "Campo obrigatório"),
    },
  });

  const onSearchPatients = useCallback((searchValue: string) => {
    setPatients([
      { value: "João Azevedo", id: "90367753-c018-417c-a970-f3724797a4aa" },
      { value: "Jorge Prado", id: "90367753-c018-417c-a970-f3724797a4ba" },
      { value: "Jonas Brother", id: "90367753-c018-417c-a970-f3724797a4ca" },
      { value: "John Wick", id: "90367753-c018-417c-a970-f3724797a4da" },
    ]);
  }, []);

  const onSearchMedics = useCallback((searchValue: string) => {
    setMedics([
      { value: "João Azevedo", id: "90367753-c018-417c-a970-f3724797a4aa" },
      { value: "Jorge Prado", id: "90367753-c018-417c-a970-f3724797a4ba" },
      { value: "Jonas Brother", id: "90367753-c018-417c-a970-f3724797a4ca" },
      { value: "John Wick", id: "90367753-c018-417c-a970-f3724797a4da" },
    ]);
  }, []);

  const onSubmit = useCallback((data: FormValues) => {
    setIsLoading.open();
    console.log(data);
    form.reset();
    closeModal("newAppointment");
    setIsLoading.close();
  }, []);

  return (
    <Modal
      opened={newAppointmentModal}
      centered
      onClose={() => closeModal("newAppointment")}
      title={"Novo agendamento em " + shortDatParser.format(openDate || undefined)}
      className={classes.modal}
      fullScreen={isMobile}
      size="80%"
      styles={{
        content: { height: "95%" },
        body: { maxWidth: 1000, margin: "auto" },
        title: { flex: 1, textAlign: "center" },
      }}
    >
      <NewPatientAccordion onCreatePatient={() => {}} />
      <Form onSubmit={form.onSubmit((values) => console.log(values))} style={{ marginTop: "1.5rem" }}>
        <SearchInput
          label="Paciente"
          required
          placeholder="Nome ou CPF"
          data={patients}
          onSearch={onSearchPatients}
          onItemSubmit={(item) => form.setFieldValue("patient", item.id)}
          error={form.errors.patient}
        />

        <SearchInput
          label="Médico"
          required
          placeholder="Nome ou CRM"
          data={medics}
          onSearch={onSearchMedics}
          onItemSubmit={(item) => form.setFieldValue("medic", item.id)}
          error={form.errors.medic}
        />

        <TimeInput
          label="Horário"
          aria-label="Horário"
          ref={timeInputRef}
          required
          rightSection={
            <ActionIcon onClick={() => timeInputRef.current?.showPicker()}>
              <Clock size="1rem" />
            </ActionIcon>
          }
          {...form.getInputProps("time")}
        />

        <Button variant="outline" sx={{ alignSelf: "end" }} type="submit" disabled={isLoading}>
          Criar
        </Button>
      </Form>
    </Modal>
  );
}
