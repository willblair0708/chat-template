import { FC, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { DEFAULT_TEMPERATURE } from '@/utils/app/const';
import HomeContext from '@/pages/api/home/home.context';

interface Props {
  label: string;
  onChangeTemperature: (temperature: number) => void;
}

export const TemperatureSlider: FC<Props> = ({
  label,
  onChangeTemperature,
}) => {
  const {
    state: { conversations },
  } = useContext(HomeContext);
  const lastConversation = conversations[conversations.length - 1];
  const [temperature, setTemperature] = useState(
    lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
  );
  const { t } = useTranslation('chat');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);
    onChangeTemperature(newValue);
  };

  return (
    <div className="flex flex-col space-y-3">
      <label className="mb-2 text-left text-lg font-semibold text-neutral-900 dark:text-neutral-300">
        {label}
      </label>
      <span className="text-sm text-neutral-700 dark:text-neutral-400">
        {t(
          'Higher values will cause more random responses, while lower values like will make the response more focused and deterministic.',
        )}
      </span>
      <div className="text-center text-xl font-bold text-neutral-900 dark:text-neutral-100">
        {temperature.toFixed(1)}
      </div>
      <input
        className="cursor-pointer appearance-none h-2.5 w-full rounded-full outline-none transition duration-500 ease-in-out hover:bg-[#1B2C4D] focus:bg-[#142850]"
        style={{ 
          background: 'linear-gradient(to right, #0A1128 0%, #00909e',
          WebkitAppearance: 'none'
        }}
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        onChange={handleChange}
      />
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00909e;
          cursor: pointer;
          transition: background 0.3s;
        }
        input[type='range']::-webkit-slider-thumb:hover,
        input[type='range']::-webkit-slider-thumb:active {
          background: #007b8a;
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00909e;
          cursor: pointer;
          transition: background 0.3s;
        }
        input[type='range']::-moz-range-thumb:hover,
        input[type='range']::-moz-range-thumb:active {
          background: #007b8a;
        }
      `}</style>
    </div>
);
};