import {
  IconCheck,
  IconMessage,
  IconPencil,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import {
  DragEvent,
  KeyboardEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Conversation } from '@/types/chat';

import HomeContext from '@/pages/api/home/home.context';

import SidebarActionButton from '@/components/Buttons/SidebarActionButton';
import ChatbarContext from '@/components/Chatbar/Chatbar.context';

interface Props {
  conversation: Conversation;
}

export const ConversationComponent = ({ conversation }: Props) => {
  const {
    state: { selectedConversation, messageIsStreaming },
    handleSelectConversation,
    handleUpdateConversation,
  } = useContext(HomeContext);

  const { handleDeleteConversation } = useContext(ChatbarContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      selectedConversation && handleRename(selectedConversation);
    }
  };

  const handleDragStart = (
    e: DragEvent<HTMLButtonElement>,
    conversation: Conversation,
  ) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('conversation', JSON.stringify(conversation));
    }
  };

  const handleRename = (conversation: Conversation) => {
    if (renameValue.trim().length > 0) {
      handleUpdateConversation(conversation, {
        key: 'name',
        value: renameValue,
      });
      setRenameValue('');
      setIsRenaming(false);
    }
  };

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (isDeleting) {
      handleDeleteConversation(conversation);
    } else if (isRenaming) {
      handleRename(conversation);
    }
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleOpenRenameModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
    selectedConversation && setRenameValue(selectedConversation.name);
  };
  const handleOpenDeleteModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  return (
    <div className="relative flex items-center">
      {isRenaming && selectedConversation?.id === conversation.id ? (
        <div className="flex w-full items-center gap-3 rounded-lg bg-[#485563] p-3 transition-all duration-200 ease-in-out">
          <IconMessage size={18} className="text-white hover:animate-pulse" />
          <input
            className="mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100"
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            autoFocus
          />
        </div>
      ) : (
        <button
          className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 ease-in-out hover:bg-[#485563] ${
            messageIsStreaming ? 'disabled:cursor-not-allowed' : ''
          } ${
            selectedConversation?.id === conversation.id
              ? 'bg-[#485563]'
              : ''
          }`}
          onClick={() => handleSelectConversation(conversation)}
          disabled={messageIsStreaming}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, conversation)}
        >
          <IconMessage size={18} className="text-white hover:animate-pulse" />
          <div
            className={`relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] leading-3 text-white ${
              selectedConversation?.id === conversation.id ? 'pr-12' : 'pr-1'
            }`}
          >
            {conversation.name}
          </div>
        </button>
      )}

      {(isDeleting || isRenaming) &&
        selectedConversation?.id === conversation.id && (
          <div className="absolute right-1 z-10 flex text-white">
            <SidebarActionButton handleClick={handleConfirm}>
              <IconCheck size={18} className="text-white transform transition-transform duration-200 hover:scale-110" />
            </SidebarActionButton>
            <SidebarActionButton handleClick={handleCancel}>
              <IconX size={18} className="text-white transform transition-transform duration-200 hover:scale-110" />
            </SidebarActionButton>
          </div>
        )}

      {selectedConversation?.id === conversation.id &&
        !isDeleting &&
        !isRenaming && (
          <div className="absolute right-1 z-10 flex text-white">
            <SidebarActionButton handleClick={handleOpenRenameModal}>
              <IconPencil size={18} className="text-white transform transition-transform duration-200 hover:scale-110" />
            </SidebarActionButton>
            <SidebarActionButton handleClick={handleOpenDeleteModal}>
              <IconTrash size={18} className="text-white transform transition-transform duration-200 hover:scale-110" />
            </SidebarActionButton>
          </div>
        )}
    </div>
  );
};