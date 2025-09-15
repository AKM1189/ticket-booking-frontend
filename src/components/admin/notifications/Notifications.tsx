import {
  useReadAllNotiMutation,
  useReadNotiMutation,
} from "@/api/mutation/notiMutation";
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
  Loader,
} from "@mantine/core";
import {
  IconBell,
  IconBellFilled,
  IconBellZ,
  IconCancel,
  IconCheck,
  IconEdit,
  IconLibraryPlus,
  IconTicket,
  IconTrashX,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { socket } from "../bookings/SeatLayoutViewer";
import { useIntersection } from "@mantine/hooks";
import type { PaginationType } from "@/types/PagintationType";

const Notifications = () => {
  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("new");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [newCount, setNewCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const { data, isFetching, isLoading, refetch } = useNotiQuery(
    pagination?.page,
    activeTab,
  );

  const { mutate: readAllNotiMutation } = useReadAllNotiMutation();

  useEffect(() => {
    refetch();
  }, [activeTab, pagination]);

  const readAllNoti = () => {
    readAllNotiMutation();
  };

  useEffect(() => {
    if (opened) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  }, [opened, activeTab]);

  useEffect(() => {
    if (!data) return;
    if (pagination?.page === 1) {
      setNotifications(data?.data);
    } else {
      // if (pagination?.page !== data?.pagination?.page) {
      setNotifications((prev) => [...prev, ...data?.data]);
      // }
    }
    setPagination(data?.pagination);
    // if (data?.pagination?.page > pagination?.page) {
    // } else {
    //   setNotifications(data?.data);
    // }

    if (activeTab === "new") {
      setNewCount(data?.pagination?.total);
    }
  }, [data]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      if (pagination.totalPages > pagination.page) {
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
      }
    }
  }, [entry?.isIntersecting]);

  useEffect(() => {
    const handler = (message: any) => {
      console.log(message);
      refetch();
    };
    socket.off("new notification");
    socket.on("new notification", handler);

    return () => {
      socket.off("new notification", handler); // cleanup
    };
  }, [socket, refetch]);

  return (
    <Popover
      onClose={() => setOpened(false)}
      position="bottom"
      withArrow
      onOpen={() => setOpened(true)}
    >
      <Popover.Target>
        <div className="relative">
          <div
            className={twMerge(
              "p-1 border border-surface-hover rounded-full hover:bg-surface transition-300 cursor-pointer !text-blueGray",
              opened && " bg-surface hover:bg-surface",
            )}
          >
            <IconBell size={20} onClick={() => setOpened((o) => !o)}></IconBell>
          </div>
          {newCount > 0 && (
            <ThemeIcon
              pos={"absolute"}
              top={"-10px"}
              right={"-5px"}
              size={18}
              radius={"xl"}
              color="red"
            >
              <Text className="!text-[10px] !font-semibold">
                {newCount > 99 ? "+99" : newCount}
              </Text>
            </ThemeIcon>
          )}
        </div>
      </Popover.Target>

      <Popover.Dropdown
        style={{
          width: 400,
          minHeight: 450,
          overflowY: "auto",
        }}
        className="noti-dropdown"
      >
        <div className="py-2">
          <Tabs
            value={activeTab}
            defaultValue={"new"}
            onChange={(value) => setActiveTab(value ?? "new")}
          >
            <Tabs.List>
              <div className="flex justify-between items-center w-full px-3">
                <Group>
                  <Tabs.Tab value="new">New</Tabs.Tab>
                  <Tabs.Tab value="read">Read</Tabs.Tab>
                </Group>
                {activeTab === "new" && newCount !== 0 && (
                  <div className="mt-[-3px]">
                    <Text
                      variant="light"
                      size="xs"
                      color="var(--color-muted)"
                      className="!text-sm !p-0 !float-end cursor-pointer"
                      onClick={readAllNoti}
                    >
                      Mark all as read
                    </Text>
                  </div>
                )}
              </div>
            </Tabs.List>

            <Tabs.Panel value={activeTab} className="h-[450px] overflow-scroll">
              {isLoading ? (
                <div className="flex flex-col gap-3 w-full h-[450px] justify-center items-center">
                  <Loader size={"md"} type="dots" />
                </div>
              ) : (
                <div>
                  <NotiList
                    notifications={notifications}
                    activeTab={activeTab}
                    ref={ref}
                    isFetching={isFetching}
                  />
                </div>
              )}
            </Tabs.Panel>
          </Tabs>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Notifications;

const NotiList = ({ notifications, activeTab, ref, isFetching }) => {
  const { mutate: readNotiMutation } = useReadNotiMutation();

  const getNotiIcon = (type: string) => {
    const icon = type?.split("_")[1];
    if (icon === "BOOKING") {
      return <IconTicket />;
    }
    if (icon === "ADDED") return <IconLibraryPlus />;
    if (icon === "UPDATED") return <IconEdit />;
    if (icon === "DELETED") return <IconTrashX />;
    if (icon === "ACTIVATED") return <IconCheck />;
    if (icon === "DEACTIVATED") return <IconCancel />;

    return <IconBell />;
  };

  const readNoti = (id: number) => {
    readNotiMutation({ notiId: id });
  };

  return (
    <div className="flex flex-col h-[450px]">
      {notifications?.length > 0 ? (
        <>
          {notifications?.map((n, index) => (
            <div
              key={n?.id}
              ref={index === notifications.length - 1 ? ref : null}
            >
              <div className="relative border-b border-notiBorder p-3 py-5 flex h-full justify-between items-start">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="p-2 border border-notiBorder bg-surface-hover text-blueGray rounded-full flex">
                      {getNotiIcon(n?.type)}
                    </div>
                  </div>
                  <div className="">
                    <Text size="13px" className="!leading-normal">
                      {n?.message}
                    </Text>
                  </div>
                </div>
                {!n?.read && (
                  <div className="mt-[-10px] cursor-pointer text-muted hover:!text-text">
                    <IconX size={18} onClick={() => readNoti(n?.id)} />
                  </div>
                )}

                <div className="absolute bottom-2 right-2">
                  <Text
                    size="xs"
                    className="text-end"
                    mt={5}
                    c="var(--color-muted)"
                  >
                    {dayjs(n?.createdAt).format("HH:mm MMM DD")}
                  </Text>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-2 p-0.5">
            {isFetching && (
              <div role="status">
                <Loader type="dots" size={"md"} />
              </div>
            )}
          </div>
        </>
      ) : (
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
            No {activeTab} Notifications
          </Text>
        </div>
      )}
    </div>
  );
};
