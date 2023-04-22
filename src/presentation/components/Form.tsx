import { createStyles } from "@mantine/core";
import { HTMLProps } from "react";

const useMantineStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    padding: "1rem",

    borderRadius: 10,

    ".mantine-Input-input": {
      background: "#FFFFFFAA",

      borderWidth: 2,
      borderColor: theme.colors.gray[5],

      "&:focus-within, &:focus": {
        borderColor: theme.colors.primary[0],
      },
    },
  },
}));

export function Form(props: HTMLProps<HTMLFormElement>) {
  const { classes } = useMantineStyles();

  return <form className={classes.form} {...props} />;
}
