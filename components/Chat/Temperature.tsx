import { FC, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { DEFAULT_TEMPERATURE } from '@/utils/app/const';
import HomeContext from '@/pages/api/home/home.context';

interface Props {
  label: string;
  onChangeTemperature: (temperature: number) => void;
}

export const TemperatureSlider: FC<Props> = ({ label, onChangeTemperature }) => {
  const { state: { conversations } } = useContext(HomeContext);
  const lastConversation = conversations[conversations.length - 1];
  const [temperature, setTemperature] = useState(
    lastConversation?.temperature ?? DEFAULT_TEMPERATURE
  );
  
  const { t } = useTranslation('chat');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);
    onChangeTemperature(newValue);
  };

  return (
    <div className="flex flex-col space-y-4 p-4 rounded-lg shadow-lg bg-white dark:bg-[#172949]">
      {/* Label */}
      <label className="text-2xl font-bold text-neutral-900 dark:text-neutral-300">
        {label}
      </label>
      
      {/* Slider Info */}
      <span className="text-base text-neutral-700 dark:text-neutral-400">
        {t('Higher values will cause more random responses, while lower values like will make the response more focused and deterministic.')}
      </span>
      
      {/* Temperature Value */}
      <div className="flex justify-center items-center text-xl text-neutral-900 dark:text-neutral-100 h-10">
        {temperature.toFixed(1)}
      </div>

      {/* Slider Input */}
      <input
        className="cursor-pointer appearance-none h-3 w-full rounded-full outline-none shadow-md transition-all duration-300 hover:shadow-lg"
        style={{ 
          background: 'linear-gradient(to right, #0A1128 0%, #00909e)',
          WebkitAppearance: 'none'
        }}
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        onChange={handleChange}
        title="Adjust the temperature to change the response behavior" // Tool tip for added clarity
      />
      
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px; // Increased size for better grab
          height: 24px;
          border-radius: 50%;
          background: #0E4F62;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        input[type='range']::-webkit-slider-thumb:hover,
        input[type='range']::-webkit-slider-thumb:active {
          background: #007b8a;
          transform: scale(1.1); // subtle increase in size on hover for better UX
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0E4F62;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        input[type='range']::-moz-range-thumb:hover,
        input[type='range']::-moz-range-thumb:active {
          background: #007b8a;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};
