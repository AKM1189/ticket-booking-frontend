import type { TabType } from "@/types/MovieTypes";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface CustomTabs {
  tabs: TabType[];
  activeTab: TabType | null;
  setActiveTab: (tab: TabType) => void;
}

type UnderlineStyleType = {
  left: number | undefined;
  width: number | undefined;
};
const CustomTabs = ({ tabs, activeTab, setActiveTab }: CustomTabs) => {
  const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyleType>({
    left: undefined,
    width: undefined,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeEl = containerRef.current?.querySelector(
      `[data-id="${activeTab?.id}"]`,
    );
    if (activeEl) {
      const el = activeEl as HTMLElement;
      setUnderlineStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="mt-10 min-h-[500px]" ref={containerRef}>
      <div className="relative flex gap-10 items-center">
        {tabs.map((item: TabType) => (
          <div
            key={item.id}
            data-id={item.id}
            className={twMerge(
              "py-2 cursor-pointer font-semibold",
              activeTab?.id === item.id && "text-accent",
            )}
            onClick={() => setActiveTab(item)}
          >
            {item.label}
          </div>
        ))}
        <span
          className="absolute bottom-0 h-[2px] bg-accent transition-all duration-300"
          style={{
            left: underlineStyle?.left,
            width: underlineStyle?.width,
          }}
        />
      </div>

      <div className="mt-10">{activeTab?.component}</div>
    </div>
  );
};

export default CustomTabs;
