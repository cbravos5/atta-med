import { Flex, FlexProps, Title } from "@mantine/core";

type Props = {
  pageTitle: string;
} & FlexProps;

export function PageContent({ pageTitle, children, ...props }: Props) {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="sm"
      w="fit-content"
      m="0 auto"
      p="lg"
      pl={{ base: 'lg', lg: 300 }}
      color="GrayText"
      {...props}
    >
      <Title order={1} fw={600} size={46} w="100%">
        {pageTitle}
      </Title>
      {children}
    </Flex>
  );
}
