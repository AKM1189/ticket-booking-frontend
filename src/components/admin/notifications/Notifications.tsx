import { useNotiQuery } from "@/api/query/admin/notificationQuery";
import { NOTI_TYPE } from "@/constants/notiConstants";
import {
  Popover,
  Button,
  List,
  Text,
  Title,
  Group,
  Tabs,
  Badge,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBell,
  IconBellFilled,
  IconBellZ,
  IconLibraryPlus,
  IconTicket,
  IconTrashX,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const Notifications = () => {
  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("new");
  const [notifications, setNotifications] = useState<any[]>([]);
  const { data, isPending, refetch } = useNotiQuery(1);

  useEffect(() => {
    setNotifications(data?.data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [opened]);

  //   const notifications = [
  //     {
  //       id: 1,
  //       message: "AKM Movie was added to the Movie List by AKM.",
  //       icon: <IconLibraryPlus size={20} />,
  //       time: "Sep 10",
  //     },
  //     {
  //       id: 2,
  //       message: "Movie schedule updated",
  //       icon: <IconTrashX size={20} />,
  //       time: "Sep 10",
  //     },
  //     {
  //       id: 3,
  //       message: "Movie schedule updated",
  //       icon: <IconTrashX size={20} />,
  //       time: "Sep 10",
  //     },
  //     {
  //       id: 4,
  //       message: "AKM Movie was added to the Movie List by AKM.",
  //       icon: <IconLibraryPlus size={20} />,
  //       time: "Sep 10",
  //     },
  //     {
  //       id: 5,
  //       message: "Movie schedule updated",
  //       icon: <IconTrashX size={20} />,
  //       time: "Sep 10",
  //     },
  //     {
  //       id: 6,
  //       message: "Movie schedule updated",
  //       icon: <IconTrashX size={20} />,
  //       time: "Sep 10",
  //     },
  //   ];

  const getNotiIcon = (type: string) => {
    const icon = type?.split("_")[1];
    if (icon === "BOOKING") {
      return <IconTicket />;
    }
    if (icon === "ADDED") return <IconLibraryPlus />;
    if (icon === "UPDATED") return <IconLibraryPlus />;
    if (icon === "DELETED") return <IconTrashX />;
  };

  return (
    <Popover
      //   opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      //   placement="end"
      withArrow
      onOpen={() => setOpened(true)}
      //   trapFocus={false}
      //   transition="pop-top-left"
    >
      <Popover.Target>
        {/* <Button variant="subtle" onClick={() => setOpened((o) => !o)}> */}
        <div
          className={twMerge(
            "p-1 border border-surface-hover rounded-full hover:bg-surface transition-300 cursor-pointer",
            opened && " bg-surface hover:bg-surface",
          )}
        >
          <IconBell size={20} onClick={() => setOpened((o) => !o)}></IconBell>
        </div>

        {/* </Button> */}
      </Popover.Target>

      <Popover.Dropdown
        style={{
          width: 400,
          minHeight: 400,
          overflowY: "auto",
        }}
      >
        <div className="py-2">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <div className="flex justify-between w-full px-3">
                <Group>
                  <Tabs.Tab value="new">New</Tabs.Tab>
                  <Tabs.Tab value="read">Read</Tabs.Tab>
                </Group>
                {activeTab === "new" && (
                  <div className="mt-[-3px]">
                    <Button
                      variant="light"
                      size="xs"
                      color="var(--color-muted)"
                      className="!w-[140px] !h-[30px] !text-sm !p-0 !float-end"
                    >
                      Mark all as read
                    </Button>
                  </div>
                )}
              </div>
            </Tabs.List>

            <Tabs.Panel value="new" className="max-h-[450px] overflow-scroll">
              <div className="flex flex-col h-[450px]">
                {notifications?.length > 0 &&
                  notifications?.map((n) => (
                    <div
                      key={n?.id}
                      className="border-b border-notiBorder p-3 py-5 flex justify-between items-start"
                    >
                      <div className="flex gap-5">
                        <div>
                          <div className="p-2 border border-notiBorder bg-notiBorder rounded-full flex">
                            {getNotiIcon(n?.type)}
                          </div>
                        </div>
                        <div>
                          <Text size="13px" className="!leading-normal">
                            {n?.message}
                          </Text>
                          <Text
                            size="xs"
                            className="float-end"
                            mt={5}
                            color="var(--color-muted)"
                          >
                            {dayjs(n?.createdAt).format("HH:mm MMM DD")}
                          </Text>
                        </div>
                      </div>
                      <div className="mt-[-10px] cursor-pointer text-muted hover:!text-text">
                        <IconX
                          size={18}
                          onClick={() => console.log("close noti", n?.id)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="read" className="max-h-[450px] overflow-scroll">
              <div className="flex flex-col gap-3 w-full h-[450px] justify-center items-center">
                <ThemeIcon
                  radius={"xl"}
                  variant="light"
                  size={50}
                  color="var(--color-muted)"
                >
                  <IconBellZ size={30} />
                </ThemeIcon>
                <Text size="sm" color="var(--color-muted)">
                  No Read Notifications
                </Text>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Notifications;
