import {
  Box,
  Button,
  Collapse,
  Group,
  Input,
  NumberInput,
  Select,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';
import { Form } from './Form';

export function NewPatientAccordion() {
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <Button onClick={toggle}>Novo Paciente</Button>

      <Collapse in={opened}>
        <Form>
          <Input.Wrapper label="Nome" required>
            <Input placeholder="Nome" maxLength={100} minLength={3} />
          </Input.Wrapper>

          <Input.Wrapper label="Idade" required>
            <NumberInput placeholder="Idade" maxLength={3} />
          </Input.Wrapper>

          <Input.Wrapper id="cpf" label="CPF" required>
            <Input<any>
              component={IMaskInput}
              mask="000.000.000-00"
              id="cpf"
              placeholder="CPF"
            />
          </Input.Wrapper>

          <Select
            label="Sexo"
            placeholder="Sexo"
            data={[
              { value: 'male', label: 'Masculino' },
              { value: 'female', label: 'Feminino' },
              { value: 'other', label: 'Outro' },
            ]}
          />

          <Button variant="outline" mt="lg" mx="auto" display="block">Salvar</Button>
        </Form>
      </Collapse>
    </Box>
  );
}
