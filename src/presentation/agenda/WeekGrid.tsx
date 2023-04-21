import { createStyles, Flex } from "@mantine/core";
import { Eye, Plus } from "tabler-icons-react";
import { CalendarItem } from "./CalendarItem";

type Props = {
  days: Date[];
};

const useMantineStyles = createStyles((theme) => ({
  container: {
    width: 1000,

    borderWidth: "0 4px",
    borderColor: theme.colors.primary[0],
    borderStyle: "solid",
  },

  item: {
    flexDirection: "column",
    width: "100%",
    height: "100%",

    "&:not(:last-child)": {
      borderRight: "4px solid",
      borderColor: theme.colors.primary[0],
    },
  },

  button: {
    width: "100%",
    height: "25%",

    borderRadius: 0,

    borderWidth: "2px 0",
    borderStyle: "solid",
    borderColor: theme.colors.primary[0],

    color: theme.colors.tertiary[0],
    backgroundColor: theme.fn.rgba(theme.colors.support[1], 0.75),

    transition: "0.15s ease-in",

    "&:hover": {
      backgroundColor: theme.colors.support[1],
    },
  },
}));

export function WeekGrid({ days }: Props) {
  const { classes, theme } = useMantineStyles();

  return (
    <Flex className={classes.container}>
      {days.map((day, i) => (
        <CalendarItem date={day} />
      ))}
    </Flex>
  );
}
