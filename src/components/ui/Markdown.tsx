import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// Configure DOMPurify to force safe link attributes on all sanitized output
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if ('target' in node) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

interface MarkdownProps {
  content: string;
  className?: string;
}

// Security note: content is sanitized by DOMPurify (isomorphic) before rendering.
// All links get target/_blank rel enforcement via afterSanitizeAttributes hook.
export function Markdown({ content, className = '' }: MarkdownProps) {
  const raw = marked.parse(content, { async: false }) as string;
  // nosec: content is DOMPurify-sanitized below before being set
  const html = DOMPurify.sanitize(raw, {
    ADD_ATTR: ['target', 'rel'],
  });

  return (
    <div
      className={['prose-editorial', className].filter(Boolean).join(' ')}
      // nosec: content is DOMPurify-sanitized above before being set
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
