import { createStyles } from "@mantine/core";
import { HTMLProps } from "react";

const useMantineStyles = createStyles((theme) => ({
  row: {
    color: theme.colors.secondary[0],

    backgroundColor: theme.fn.rgba(theme.colors.primary[0], 0.8),

    marginBottom: 5,

    "td:first-of-type": { borderRadius: "5px 0 0 5px" },
    "td:last-of-type": { borderRadius: "0 5px 5px 0" },

    td: { fontSize: "1.2rem !important" },
  },
}));

export function AppointmentRow(props: HTMLProps<HTMLTableRowElement>) {
  const { classes } = useMantineStyles();

  return <tr {...props} className={classes.row} />;
}
