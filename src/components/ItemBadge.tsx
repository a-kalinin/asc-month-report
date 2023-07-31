import { Badge, CloseButton } from '@mantine/core';

type PropsT = {
  name: string,
  onCloseClick: () => void
};

export default function ItemBadge({
  name,
  onCloseClick,
}: PropsT) {
  return (
    <Badge
      data-testid="ItemBadge"
      variant="light"
      color="indigo"
      rightSection={(
        <CloseButton onClick={onCloseClick} />
      )}
      size="xl"
      sx={(theme) => ({
        textTransform: 'none',
        fontWeight: 400,
        paddingRight: theme.spacing.xs,
      })}
    >
      {name}
    </Badge>
  );
}
