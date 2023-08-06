import { FC, memo } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';

// Updated LinkRenderer function to handle relative URLs
const LinkRenderer = (props: any) => {
    let { href } = props;

    // If href doesn't start with "http://" or "https://", prepend "http://"
    if (!href.startsWith("http://") && !href.startsWith("https://")) {
        href = "http://" + href;
    }

    return <a href={href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
};

export const MemoizedReactMarkdown: FC<Options> = memo(
    (props) => <ReactMarkdown {...props} components={{ ...props.components, a: LinkRenderer }} />,
    (prevProps, nextProps) => (
        prevProps.children === nextProps.children
    )
);
