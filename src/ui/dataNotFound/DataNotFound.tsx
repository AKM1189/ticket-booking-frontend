import { Text } from "@mantine/core";
import {
  IconDashboard,
  IconMovie,
  IconBuilding,
  IconCalendar,
  IconTags,
  IconUsers,
  IconTicket,
  IconDeviceTv,
  IconUserStar,
  IconError404,
} from "@tabler/icons-react";

const DataNotFound = ({ data, isPending, type }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <IconTicket size={30} />;

      case "movie":
        return <IconMovie size={30} />;

      case "genre":
        return <IconTags size={30} />;

      case "cast":
        return <IconUserStar size={30} />;

      case "schedule":
        return <IconCalendar size={30} />;

      case "screen":
        return <IconDeviceTv size={30} />;

      case "theatre":
        return <IconBuilding size={30} />;

      case "user":
      case "staff":
      case "admin":
        return <IconUsers size={30} />;

      default:
        return <IconError404 />;
    }
  };
  return (
    <div>
      {data?.length === 0 && !isPending && (
        <Text ta="center" c="dimmed" py="100px" size="sm">
          <div className="flex justify-center mb-2">{getIcon(type)}</div>
          No {type} found
        </Text>
      )}
    </div>
  );
};

export default DataNotFound;
