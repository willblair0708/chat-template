import { IconFolderPlus, IconMistOff, IconPlus, IconSearch } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';

import Search from '../Search';

interface Props<T> {
  isOpen: boolean;
  addItemButtonTitle: string;
  side: 'left' | 'right';
  items: T[];
  itemComponent: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  searchTerm: string;
  handleSearchTerm: (searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  handleDrop: (e: any) => void;
}

const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  side,
  items,
  itemComponent,
  folderComponent,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
}: Props<T>) => {
  const { t } = useTranslation('promptbar');

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#0A1128';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  return isOpen ? (
    <div>
      <div
        className={`fixed top-0 ${side}-0 z-40 flex h-full w-[265px] flex-none flex-col space-y-4 bg-gradient-to-r from-[#1B2C4D] to-[#132545] p-4 text-[14px] transition-all duration-500 ease-in-out sm:relative sm:top-0 shadow-xl`}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            className="flex w-[190px] flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-lg border border-white/20 p-3 text-white transform transition-transform duration-500 hover:scale-105 hover:bg-[#00909e] shadow-lg hover:shadow-xl"
            onClick={() => {
              handleCreateItem();
              handleSearchTerm('');
            }}
          >
            <IconPlus size={16} className="transition-all duration-500 hover:text-[#00909e]" />
            {addItemButtonTitle}
          </button>

          <button
            className="ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-lg border border-white/20 p-3 text-sm text-white transform transition-transform duration-500 hover:scale-105 hover:bg-[#00909e] shadow-lg hover:shadow-xl"
            onClick={handleCreateFolder}
          >
            <IconFolderPlus size={16} className="transition-all duration-500 hover:text-[#00909e]" />
          </button>
        </div>

        <div className="relative rounded-lg shadow-lg mb-4">
          <IconSearch size={16} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
          <input
            className="bg-transparent pl-10 pr-4 py-2 rounded-lg w-full text-white placeholder-white/60 focus:outline-none"
            placeholder={t('Search...') || ''}
            value={searchTerm}
            onChange={(e) => handleSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-grow overflow-auto">
          {items?.length > 0 && (
            <div className="flex border-b border-white/20 pb-2">
              {folderComponent}
            </div>
          )}

          {items?.length > 0 ? (
            <div
              className="pt-2"
              onDrop={handleDrop}
              onDragOver={allowDrop}
              onDragEnter={highlightDrop}
              onDragLeave={removeHighlight}
            >
              {itemComponent}
            </div>
          ) : (
            <div className="mt-8 select-none text-center text-white opacity-50">
              <IconMistOff className="mx-auto mb-3" />
              <span className="text-[14px] leading-normal">
                {t('No data.')}
              </span>
            </div>
          )}
        </div>
        {footerComponent}
      </div>

      <CloseSidebarButton onClick={toggleOpen} side={side} />
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};

export default Sidebar;
