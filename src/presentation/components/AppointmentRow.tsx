import { createStyles } from "@mantine/core";
import { HTMLProps } from "react";

type Props = {
  isCancelled?: boolean;
} & HTMLProps<HTMLTableRowElement>;

const useMantineStyles = createStyles((theme) => ({
  row: {
    color: theme.colors.secondary[0],

    marginBottom: 5,

    "td:first-of-type": { borderRadius: "5px 0 0 5px" },
    "td:last-of-type": { borderRadius: "0 5px 5px 0" },

    td: { fontSize: "1.2rem !important" },
  },
  active: {
    backgroundColor: theme.fn.rgba(theme.colors.primary[0], 0.8),
  },
  cancelled: {
    backgroundColor: theme.colors.red[6],
  },
}));

export function AppointmentRow({ isCancelled, ...props }: Props) {
  const { classes } = useMantineStyles();

  const colorClass = isCancelled ? classes.cancelled : classes.active;

  return <tr {...props} className={classes.row + " " + colorClass} />;
}
