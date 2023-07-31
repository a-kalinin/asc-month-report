import { Flex, Paper } from '@mantine/core';

import ItemBadge from './ItemBadge';

type PropsT = {
  onBadgeClose: (name: string) => void,
  values: string[],
};

export default function Badges({
  values,
  onBadgeClose,
}: PropsT) {
  if (!values.length) {
    return null;
  }
  return (
    <Paper
      mt="md"
      shadow="sm"
      p="md"
      bg="gray.0"
      data-testid="Badges"
    >
      <Flex gap="sm" wrap="wrap">
        {values.map((el) => (
          <ItemBadge
            key={el}
            name={el}
            onCloseClick={() => onBadgeClose(el)}
          />
        ))}
      </Flex>
    </Paper>
  );
}
