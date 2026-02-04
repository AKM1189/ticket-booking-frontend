import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { CastSelectionType, CastType } from "@/types/CastTypes";
import { useAllCastQuery } from "@/api/query/admin/castQuery";

interface CastSelectorProps {
  selectedCasts: CastSelectionType[];
  onCastChange: (casts: CastSelectionType[]) => void;
  label?: string;
  placeholder?: string;
}

const CastSelector = ({
  selectedCasts,
  onCastChange,
  label = "Cast Members",
  placeholder = "Select cast members",
}: CastSelectorProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [casts, setCasts] = useState([]);

  const { data } = useAllCastQuery();

  useEffect(() => {
    setCasts(data?.data);
  }, [data]);

  const filteredCasts =
    casts?.length > 0
      ? casts?.filter(
          (cast: CastType) =>
            cast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cast.role.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  const handleCastSelect = (cast: CastType) => {
    const isSelected = selectedCasts.some(
      (selected) => selected.id === cast.id,
    );

    if (isSelected) {
      onCastChange(
        selectedCasts?.filter((selected) => selected.id !== cast.id),
      );
    } else {
      onCastChange([
        ...selectedCasts,
        {
          id: cast?.id,
          name: cast?.name,
          role: cast?.role,
          imageUrl: cast?.image?.url,
        },
      ]);
    }
  };

  const handleRemoveCast = (castId: number) => {
    onCastChange(selectedCasts?.filter((cast) => cast.id !== castId));
  };
  const inputStyle = {
    input: "dashboard-input max-w-md",
    label: "!mb-2 !text-text",
  };
  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        {label}
      </Text>

      <Button
        variant="outline"
        color="var(--color-surface-hover)"
        leftSection={<IconPlus size={16} />}
        onClick={open}
        className="justify-start dashboard-btn !text-blueGray cast-selector"
        classNames={{
          inner: "text-muted",
        }}
      >
        {selectedCasts.length > 0
          ? `${selectedCasts?.length} cast member(s) selected`
          : placeholder}
      </Button>

      {selectedCasts.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {selectedCasts.map((cast) => (
            <Card
              key={cast.id}
              padding="xs"
              radius="md"
              withBorder
              className="!bg-surface-hover !text-text !border-0"
            >
              <Group gap="xs">
                <Avatar src={cast.imageUrl} size={30} radius="sm" />
                <Stack gap={0} style={{ flex: 1 }}>
                  <Text size="xs" fw={500} lineClamp={1}>
                    {cast.name}
                  </Text>
                  <Text size="xs" c="dimmed" lineClamp={1}>
                    {cast.role}
                  </Text>
                </Stack>
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="var(--color-text)"
                  onClick={() => handleRemoveCast(cast.id)}
                >
                  <IconX size={12} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </div>
      )}

      <Modal
        opened={opened}
        onClose={close}
        title="Select Cast Members"
        size="lg"
        classNames={{
          header: "dashboard-bg",
          content: "dashboard-bg",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        <Stack gap="md" className="">
          <TextInput
            placeholder="Search cast members..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            classNames={inputStyle}
          />

          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing="sm"
            mah={400}
            className="!overflow-y-scroll"
            style={{ overflow: "auto" }}
          >
            {filteredCasts.map((cast: CastType) => {
              const isSelected = selectedCasts.some(
                (selected) => selected.id === cast.id,
              );

              return (
                <Card
                  key={cast.id}
                  padding="sm"
                  radius="md"
                  withBorder
                  className={`cursor-pointer transition-colors duration-200 !min-h-[65px] !text-text ${
                    isSelected
                      ? "!bg-surface-hover !border-surface-hover"
                      : "!bg-surface !border-surface-hover"
                  }`}
                  onClick={() => handleCastSelect(cast)}
                >
                  <Group gap="sm">
                    <Avatar src={cast?.image?.url} size={40} radius="sm" />
                    <Stack gap={0} style={{ flex: 1 }}>
                      <Text size="sm" fw={500} className="!mb-1">
                        {cast.name}
                      </Text>
                      <Badge size="xs" color="var(--color-primary)">
                        {cast.role}
                      </Badge>
                    </Stack>
                    {isSelected && (
                      <Badge circle size="sm" color="var(--color-primary)">
                        <IconCheck size={12} />
                      </Badge>
                    )}
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>

          {filteredCasts.length === 0 && (
            <Text ta="center" c="dimmed" py="xl">
              No cast members found
            </Text>
          )}

          <Group justify="flex-end">
            <Button className="dashboard-btn" onClick={close}>
              Done
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default CastSelector;
