import { Autocomplete, createStyles, Modal } from '@mantine/core';
import { Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { Form } from './Form';
import { NewPatientAccordion } from './NewPatientAccordion';

const useMantineStyles = createStyles((theme) => ({
  modal: {
    '.mantine-Modal-title': {
      fontSize: 25,
      fontWeight: 600,
    },
  },
}));

export function NewAppointnment() {
  const { classes } = useMantineStyles();
  const isMobile = useMediaQuery("(max-width: 50em)");

  const form = useForm();

  return (
    <Modal
      opened
      centered
      onClose={() => {}}
      title="Novo agendamento em 20/04"
      className={classes.modal}
      fullScreen={isMobile}
      size="80%"
      styles={{
        content: { height: '95%' },
        body: { maxWidth: 1000, margin: 'auto' },
        title: { flex: 1, textAlign: 'center' }
      }}
    >
      <NewPatientAccordion />
      <Form onSubmit={form.onSubmit((values) => console.log(values))} style={{ marginTop: '1rem' }}>
        <Input.Wrapper label="Paciente" required>
          <Autocomplete
            data={[
              { value: 'João Azevedo' },
              { value: 'Jorge Prado' },
              { value: 'Jonas Brother' },
              { value: 'John Wick' },
            ]}
          />
        </Input.Wrapper>
        
      </Form>
    </Modal>
  );
}
