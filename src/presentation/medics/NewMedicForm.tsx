import { Medic } from "@/domain/Models/Medic";
import { Button, Input, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import { IMaskInput } from "react-imask";
import { Form } from "../components/Form";

type FormValues = Omit<Medic, "id">;

export function NewMedicForm() {
  const [isLoading, setIsLoading] = useDisclosure(false);

  const form = useForm<FormValues>({
    validateInputOnBlur: true,
    validate: {
      name: (value) => (!!value ? null : "Campo obrigatório"),
      crm: (value) => (!!value ? null : "Campo obrigatório"),
      specialty: (value) => (!!value ? null : "Campo obrigatório"),
    },
  });

  const onSubmit = useCallback((data: FormValues) => {
    setIsLoading.open();
    console.log(data);

    form.reset();
    setIsLoading.close();
  }, []);

  return (
    <Form style={{ gap: "0.5rem", height: 350 }} onSubmit={form.onSubmit(onSubmit)}>
      <Title order={4}>Novo médico</Title>

      <TextInput label="Nome" placeholder="Nome" maxLength={100} required {...form.getInputProps("name")} />

      <Input.Wrapper id="crm" label="CRM" required error={form.errors.crm}>
        <Input<any>
          component={IMaskInput}
          mask="CRM/{aa}-000000"
          id="crm"
          placeholder="CRM"
          {...form.getInputProps("crm")}
        />
      </Input.Wrapper>

      <Select
        label="Especialidade"
        placeholder="Especialidade"
        data={[
          { value: "Cardiologia", label: "Cardiologia" },
          { value: "Ortopedia", label: "Ortopedia" },
          { value: "Neurologia", label: "Neurologia" },
          { value: "Dermatologia", label: "Dermatologia" },
          { value: "Infectologia", label: "Infectologia" },
          { value: "Pediatria", label: "Pediatria" },
        ]}
        {...form.getInputProps("specialty")}
      />

      <Button variant="outline" mt="lg" mx="auto" display="block" type="submit" disabled={isLoading}>
        Salvar
      </Button>
    </Form>
  );
}
