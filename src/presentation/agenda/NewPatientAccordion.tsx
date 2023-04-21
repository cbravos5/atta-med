import { Gender } from "@/domain/Models/Gender";
import { Patient } from "@/domain/Models/Patient";
import { Box, Button, Collapse, Group, Input, NumberInput, Select, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { cpf } from "cpf-cnpj-validator";
import { useCallback } from "react";
import { IMaskInput } from "react-imask";
import { Plus } from "tabler-icons-react";
import { Form } from "./Form";

type Props = {
  onCreatePatient: (value: Patient) => void;
};

type FormValues = {
  name: string;
  age: number;
  cpf: string;
  gender: keyof typeof Gender;
};

export function NewPatientAccordion({ onCreatePatient }: Props) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useDisclosure(false);
  const theme = useMantineTheme();

  const form = useForm<FormValues>({
    validateInputOnBlur: true,
    validate: {
      name: (value) => (!!value ? null : "Campo obrigatório"),
      age: (value) => (!!value ? null : "Campo obrigatório"),
      cpf: (value) => (cpf.isValid(value?.toString()) ? null : "CPF inválido"),
    },
  });

  const onSubmit = useCallback((data: FormValues) => {
    setIsLoading.open();
    console.log(data);
    onCreatePatient({ ...data, id: "3ac97189-0754-4abf-92b5-f78008694acb" });
    form.reset();
    close();
    setIsLoading.close();
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
              { value: "male", label: "Masculino" },
              { value: "female", label: "Feminino" },
              { value: "other", label: "Outro" },
            ]}
            {...form.getInputProps("gender")}
          />

          <Button variant="outline" mt="lg" mx="auto" display="block" type="submit" disabled={isLoading}>
            Salvar
          </Button>
        </Form>
      </Collapse>
    </Box>
  );
}
