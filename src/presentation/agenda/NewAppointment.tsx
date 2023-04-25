import { useAppointmentStore } from "@/presentation/store/appointment";
import { ActionIcon, Button, createStyles, Modal, Select } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Clock } from "tabler-icons-react";
import { Form } from "../components/Form";
import { NewPatientAccordion } from "./NewPatientAccordion";
import { SearchInput } from "../components/SearchInput";
import { shortDateParser, timeParser } from "../helpers/parsers";
import { createAppointment, getAvailableHours, searchMedics, searchPatients } from "@/main/Registry";
import { Medic } from "@/domain/Models/Medic";
import { notifications } from "@mantine/notifications";
import { Patient } from "@/domain/Models/Patient";
import { GetAvailableHours } from "@/domain/useCases/get-available-hours";

type FormValues = {
  patient: { id: string; name: string };
  medic: { id: string; name: string };
  when: string;
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

  const [availableHours, setAvailableHours] = useState([] as { value: string; label: string }[]);

  const form = useForm<FormValues>({
    initialValues: {
      when: "",
      medic: { id: '', name: '' },
      patient: { id: '', name: '' },
    },
    validateInputOnBlur: true,
    validate: {
      patient: (value) => (!!value.id ? null : "Campo obrigatório"),
      medic: (value) => (!!value.id ? null : "Campo obrigatório"),
      when: (value) => (!!value ? null : "Campo obrigatório"),
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

  const onGetAvailableHours = useCallback(async (props: GetAvailableHours.Props) => {
    setIsLoading.open();
    try {
      const response = await getAvailableHours.execute(props);

      const remmapedResponse = response.availablePeriods.map((date) => ({
        value: new Date(date).toISOString(),
        label: timeParser.format(new Date(date)),
      }));

      setAvailableHours(remmapedResponse);
      form.setFieldValue('when', remmapedResponse[0].value);
    } catch (error) {
    } finally {
      setIsLoading.close();
    }
  }, []);

  const patientsData = useMemo(() => patients.map((patient) => ({ value: patient.name, ...patient })), [patients]);
  const medicsData = useMemo(() => medics.map((medic) => ({ value: medic.name, ...medic })), [medics]);

  const onSubmit = useCallback(async (data: FormValues) => {
    setIsLoading.open();
    try {
      await createAppointment.execute({ when: data.when, medicId: data.medic.id, patientId: data.patient.id });
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
      onClose={() => {
        closeModal("newAppointment");
        form.reset();
      }}
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
          description={form.values.patient.name}
          withAsterisk
          placeholder="Nome ou CPF"
          data={patientsData}
          onSearch={onSearchPatients}
          onItemSubmit={(item) => form.setFieldValue("patient", { id: item.id, name: item.name })}
          error={form.errors.patient}
        />

        <SearchInput
          label="Médico"
          description={form.values.medic.name}
          withAsterisk
          placeholder="Nome ou CRM"
          data={medicsData}
          onSearch={onSearchMedics}
          onItemSubmit={(item) =>{
            form.setFieldValue("medic", { id: item.id, name: item.name });
            openDate && onGetAvailableHours({ medicId:item.id, when: openDate });
          }}
          error={form.errors.medic}
        />

        <Select
          label="Horário"
          description="Selecione um médico para ver a lista de horários disponíveis"
          aria-label="Horário"
          withAsterisk
          data={availableHours}
          disabled={!form.values.medic.id}
          {...form.getInputProps("when")}
        />

        <Button variant="outline" sx={{ alignSelf: "end" }} type="submit" loading={isLoading}>
          Criar
        </Button>
      </Form>
    </Modal>
  );
}
