import { IconCheck, IconClipboard, IconDownload } from '@tabler/icons-react';
import { FC, memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTranslation } from 'next-i18next';
import { generateRandomString, programmingLanguages } from '@/utils/app/codeblock';

interface Props {
  language: string;
  value: string;
}

const ActionButton: FC<{ 
  onClick: () => void; 
  isDone: boolean; 
  doneIcon: JSX.Element; 
  defaultIcon: JSX.Element; 
  doneText: string; 
  defaultText: string;
}> = ({ onClick, isDone, doneIcon, defaultIcon, doneText, defaultText }) => {
  const title = isDone ? (doneText as string) : (defaultText as string);
  const icon = isDone ? doneIcon : defaultIcon;
  
  return (
    <button
      className="flex gap-1.5 items-center rounded bg-none p-1 text-xs text-white transform transition-transform duration-500 hover:scale-105"
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {icon}
      {title}
    </button>
  );
};

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { t } = useTranslation('markdown');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(
      3,
      true,
    )}${fileExtension}`;
    const fileName = window.prompt(
      t('Enter file name') || '',
      suggestedFileName,
    );

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="codeblock relative font-sans text-[16px]">
      <div className="flex items-center justify-between py-1.5 px-4">
        <span className="text-xs lowercase text-white">{language}</span>

        <div className="flex items-center space-x-2">
          <ActionButton
            onClick={copyToClipboard}
            isDone={isCopied}
            doneIcon={<IconCheck size={18} />}
            defaultIcon={<IconClipboard size={18} />}
            doneText={t('Copied!')}
            defaultText={t('Copy code')}
          />
          <ActionButton
            onClick={downloadAsFile}
            isDone={false}
            doneIcon={<></>}
            defaultIcon={<IconDownload size={18} />}
            doneText={""}
            defaultText={t('Download code')}
          />
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={nightOwl}
        customStyle={{ margin: 0 }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';
