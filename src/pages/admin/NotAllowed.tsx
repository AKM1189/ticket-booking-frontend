import { IconLockCog } from "@tabler/icons-react";

const NotAllowed = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[500px] text-muted gap-5">
      <IconLockCog size={50} />
      <p>You don't have permisson to access this menu.</p>
    </div>
  );
};

export default NotAllowed;
