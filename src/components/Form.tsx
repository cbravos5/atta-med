import { createStyles } from "@mantine/core";
import { HTMLProps } from "react";

const useMantineStyles = createStyles((theme) => ({
  form: {
    '.mantine-Input-input': {
      '&:focus-within, &:focus': {
        borderColor: theme.colors.primary[0],
      },
    }
  }
}))

export function Form(props: HTMLProps<HTMLFormElement>) {
  const { classes } = useMantineStyles();

  return <form className={classes.form} {...props}/>
}