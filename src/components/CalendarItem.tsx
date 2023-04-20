import { useAppointmentStore } from '@/store/appointment';
import { Box, Button, Card, createStyles, Flex, Text } from '@mantine/core';
import { Eye, Plus } from 'tabler-icons-react';

type Props = {
  date?: Date | null;
};

const useMantineStyles = createStyles((theme) => ({
  button: {
    width: '100%',
    height: '100%',

    borderRadius: 0,

    color: theme.colors.tertiary[0],
    backgroundColor: theme.fn.rgba(theme.colors.support[1], 0.75),

    transition: '0.15s ease-in',

    '&:hover': {
      backgroundColor: theme.colors.support[1],
    },
  },
}));

export function CalendarItem({ date }: Props) {
  const { classes, theme } = useMantineStyles();
  const { setOpenDate } = useAppointmentStore();

  const isEmpty = !date;

  return (
    <Card
      bg="transparent"
      display="flex"
      p={0}
      withBorder
      radius={0}
      ta="center"
      sx={{
        aspectRatio: '8 / 5',
        minHeight: 90,
        flexDirection: 'column',
        backgroundColor: isEmpty ? theme.colors.gray[2] + ' !important' : '',
        borderColor: theme.colors.gray[5] + ' !important'
      }}
    >
      {!isEmpty && (
        <>
          <Box display="grid" h="100%" sx={{ placeItems: 'center' }}>
            <Text component="p" color={theme.colors.tertiary[0]} fz="md">
              {date.getDate()}
            </Text>
          </Box>
          <Flex gap={0} w="100%" h="75%">
            <Button className={classes.button}>
              <Plus size={25} />
            </Button>
            <Button className={classes.button} onClick={() => setOpenDate(date)}>
              <Eye size={25} />
            </Button>
          </Flex>
        </>
      )}
    </Card>
  );
}
