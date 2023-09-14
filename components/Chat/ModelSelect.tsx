import { IconExternalLink } from '@tabler/icons-react';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { OpenAIModel } from '@/types/openai';
import HomeContext from '@/pages/api/home/home.context';
import { motion } from "framer-motion"; // Framer Motion for animations
import { AiOutlineDown } from "react-icons/ai"; // React Icons for modern icons

type ModelSelectProps = {
    className?: string; // Added className prop
};

export const ModelSelect: React.FC<ModelSelectProps> = ({ className }) => {
  const { t } = useTranslation('chat');
  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, {
        key: 'model',
        value: models.find(
          (model) => model.id === e.target.value,
        ) as OpenAIModel,
      });
  };

  return (
    <div className={`flex flex-col ${className}`}> {/* Applied className here */}
      <label className="text-2xl font-bold text-neutral-900 dark:text-neutral-300">
        {t('Model')}
      </label>
      <div className="relative w-full rounded-lg bg-gradient-to-r from-[#000000] to-[#434343] text-neutral-700 dark:text-neutral-400 shadow-md hover:shadow-lg transition-shadow">
      <select
          className="w-full bg-transparent p-3 appearance-none outline-none"
          placeholder={t('Select a model') || ''}
          value={selectedConversation?.model?.id || defaultModelId}
          onChange={handleChange}
      >
          {models.map((model) => (
              <option
                  key={model.id}
                  value={model.id}
                  className="dark:bg-[#343541] dark:text-white"
              >
                  {model.id === defaultModelId
                      ? `Default (${model.name})`
                      : model.name}
              </option>
          ))}
        </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
              <AiOutlineDown className="fill-current h-4 w-4" />
          </div>
      </div>
      <div className="w-full mt-3 text-left text-neutral-700 dark:text-neutral-400 flex items-center">
        {/* Using framer-motion to add a simple hover effect */}
        <motion.a
          href="https://platform.openai.com/account/usage"
          target="_blank"
          className="flex items-center hover:text-[#00909e] transition-colors"
        >
          <IconExternalLink size={18} className={'inline mr-1'} />
          {t('View Account Usage')}
        </motion.a>
      </div>
    </div>
);
};