import ReactMarkdown from 'react-markdown'

interface MarkdownViewerProps {
  content: string
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="p-6 prose prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
} 