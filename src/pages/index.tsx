import { login } from "@/main/Registry";
import { Form } from "@/presentation/components/Form";
import { Logo } from "@/presentation/components/Logo";
import { mediaQuery } from "@/presentation/helpers/mediaQuery";
import {
  Box,
  Button,
  Container,
  createStyles,
  Flex,
  PasswordInput,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Router from "next/router";
import { useCallback } from "react";

type FormValues = {
  login: string;
  password: string;
};

const useMantineStyles = createStyles((theme) => ({
  container: {
    height: "100%",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    gap: theme.spacing.lg,

    [mediaQuery(theme.breakpoints.lg)]: {
      flexDirection: "row",
    },
  },

  logoContainer: {
    width: "100%",

    display: "grid",
    placeItems: "center",

    svg: { maxWidth: 200 },

    [mediaQuery(theme.breakpoints.lg)]: {
      height: "100%",
      width: "50%",

      background: theme.colors.support[1],

      svg: { maxWidth: 300 },
    },
  },

  formContainer: {
    width: "100%",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    h1: {
      fontSize: "2rem",
    },

    [mediaQuery(theme.breakpoints.lg)]: {
      height: "100%",

      h1: { fontSize: "2.5rem" },
    },
  },
}));
export default function Login() {
  const { classes, theme } = useMantineStyles();

  const [isLoading, setIsLoading] = useDisclosure(false);

  const form = useForm<FormValues>({
    initialValues: {
      login: "",
      password: "",
    },
    validate: {
      login: (value) => (!!value ? null : "Campo obrigatório"),
      password: (value) => (!!value ? null : "Campo obrigatório"),
    },
  });

  const onSubmit = useCallback(async (data: FormValues) => {
    setIsLoading.open();
    try {
      await login.execute(data);

      Router.push('/dashboard');
    } catch (error: any) {
      notifications.show({
        title: 'Erro!',
        message: error?.message
      })      
    } finally {
      setIsLoading.close();
    }
  }, []);

  return (
    <Flex className={classes.container}>
      <Box component="section" className={classes.logoContainer}>
        <Logo width="100%" height="100%" />
      </Box>
      <Flex className={classes.formContainer}>
        <Title order={1} color={theme.colors.support[2]} ta="center">
          Seja bem-vindo ao <br /> AttaMed!
        </Title>

        <Form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput placeholder="login" withAsterisk size="md" {...form.getInputProps("login")} />

          <PasswordInput
            placeholder="Senha"
            withAsterisk
            size="md"
            styles={{
              visibilityToggle: { svg: { width: 30, height: 30 }, marginRight: 10 },
            }}
            {...form.getInputProps("password")}
          />

          <Button variant="outline" type="submit" loading={isLoading}>
            Acessar
          </Button>
        </Form>
      </Flex>
    </Flex>
  );
}

Login.useLayout = false;