import { Gender } from "@/domain/Models/Gender";
import { Patient } from "@/domain/Models/Patient";
import { createPatient } from "@/main/Registry";
import { Box, Button, Collapse, Group, Input, NumberInput, Select, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { cpf } from "cpf-cnpj-validator";
import { useCallback } from "react";
import { IMaskInput } from "react-imask";
import { Plus } from "tabler-icons-react";
import { Form } from "../components/Form";


type FormValues = Omit<Patient, "id">;

export function NewPatientAccordion() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useDisclosure(false);
  const theme = useMantineTheme();

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      age: 0,
      cpf: "",
      gender: "OTHER",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value) => (!!value ? null : "Campo obrigatório"),
      age: (value) => (!!value ? null : "Idade inválida"),
      cpf: (value) => (cpf.isValid(value?.toString()) ? null : "CPF inválido"),
    },
  });

  const onSubmit = useCallback(async (data: FormValues) => {
    setIsLoading.open();
    try {
      await createPatient.execute(data);
      form.reset();
      close();
      notifications.show({
        title: "Sucesso!",
        message: 'Novo paciente criado',
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
    <Box mx="1rem">
      <Button onClick={toggle} rightIcon={<Plus />} disabled={isLoading}>
        Novo Paciente
      </Button>

      <Collapse in={opened} bg={theme.fn.rgba(theme.colors.primary[0], 0.3)} mt="md" sx={{ borderRadius: 10 }}>
        <Form style={{ gap: "0.5rem" }} onSubmit={form.onSubmit(onSubmit)}>
          <TextInput label="Nome" placeholder="Nome" maxLength={100} required {...form.getInputProps("name")} />

          <NumberInput label="Idade" placeholder="Idade" maxLength={3} required {...form.getInputProps("age")} />

          <Input.Wrapper id="cpf" label="CPF" required error={form.errors.cpf}>
            <Input<any>
              component={IMaskInput}
              mask="000.000.000-00"
              id="cpf"
              placeholder="CPF"
              {...form.getInputProps("cpf")}
            />
          </Input.Wrapper>

          <Select
            label="Sexo"
            placeholder="Sexo"
            defaultValue="other"
            data={[
              { value: "MALE", label: "Masculino" },
              { value: "FEMALE", label: "Feminino" },
              { value: "OTHER", label: "Outro" },
            ]}
            {...form.getInputProps("gender")}
          />

          <Button variant="outline" mt="lg" mx="auto" display="block" type="submit" loading={isLoading}>
            Salvar
          </Button>
        </Form>
      </Collapse>
    </Box>
  );
}
