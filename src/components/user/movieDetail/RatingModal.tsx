import { Button, Modal, NumberInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconStarFilled } from "@tabler/icons-react";

const RatingModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    //   validate: zodResolver(loginSchema),
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        className="!text-text"
        classNames={{
          header: "!bg-surface",
          content: "md:!min-w-[600px] w-full !min-h-[400px] !bg-surface p-3",
          close: "!text-text hover:!bg-surface-hover",
        }}
        title={<div className="text-xl font-semibold">Review and Rating</div>}
        centered
      >
        <form
          action=""
          onSubmit={form.onSubmit((values) => console.log("review", values))}
        >
          <NumberInput
            label="Rating (1-10)"
            // description="Input description"
            // placeholder="Enter Rating"
            min={1}
            defaultValue={1}
            max={10}
            classNames={{
              input:
                "!bg-transparent !text-text !border-surface-hover focus:!border-primary !px-10 !h-[45px]",
              label: "!mb-2 !text-text",
              control: "!text-text hover:!bg-surface-hover !border-0",
            }}
            leftSection={<IconStarFilled color="var(--color-accent)" />}
          />

          <Textarea
            label={
              <div>
                Review <span className="text-muted">(Optional)</span>
              </div>
            }
            className="mt-5"
            placeholder="Write a review"
            minRows={8}
            autosize
            resize="vertical"
            classNames={{
              input:
                "!bg-transparent !text-text !border-surface-hover focus:!border-primary !p-3",
              label: "!mb-2 !text-text",
            }}
          />

          <div className="mt-10 flex justify-between">
            <Button
              variant="outline"
              className="!border-surface-hover !text-muted !text-sm !h-[40px]"
              size="compact-xs"
              onClick={close}
            >
              Cancel
            </Button>
            <Button size="sm" className="!text-sm !h-[40px]">
              Post
            </Button>
          </div>
        </form>
      </Modal>

      <div
        className="mt-3 text-sm text-center text-accent cursor-pointer"
        onClick={open}
      >
        Rate it
      </div>
    </>
  );
};

export default RatingModal;
