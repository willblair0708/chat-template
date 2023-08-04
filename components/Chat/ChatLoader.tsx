import { IconRobot } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="group border-b border-[#0099cc]/10 bg-[#D0E1F9] text-[#27496d] dark:border-[#27496d]/50 dark:bg-[#142850] dark:text-[#80ccff]"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[40px] items-end">
          <IconRobot size={30} className="animate-pulse animate-spin transform hover:scale-125 transition transform duration-500 ease-in-out text-white" />
        </div>
        <span className="animate-pulse cursor-default mt-1">▍</span>
      </div>
    </div>
  );
};
