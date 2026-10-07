import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMessageProps {
  content: string;
  isAi?: boolean;
}

// Helper to check if a block of text is primarily Arabic
const isPrimarilyArabic = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
  const arabicMatches = text.match(arabicRegex) || [];
  const latinMatches = text.match(/[a-zA-Z]/g) || [];
  return arabicMatches.length > 0 && arabicMatches.length >= latinMatches.length;
};

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, isAi = true }) => {
  return (
    <div className={`prose prose-sm max-w-none break-words min-w-0 ${isAi ? 'text-slate-800' : 'text-white'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0B2A6F] mt-3.5 mb-2 pb-1 border-b border-sky-100/80 leading-snug" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#0B2A6F] mt-3 mb-1.5 leading-snug" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#0B2A6F] mt-2.5 mb-1 leading-snug" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xs sm:text-sm font-bold text-[#123F9A] mt-2 mb-1 leading-snug" {...props} />
          ),
          p: ({ node, children, ...props }) => {
            const rawText = String(children || '');
            const arabicBlock = isPrimarilyArabic(rawText);
            
            return (
              <p
                className={`my-1.5 text-xs sm:text-sm leading-relaxed ${
                  arabicBlock ? 'font-arabic text-base sm:text-lg text-right dir-rtl leading-loose font-medium my-2 text-[#0B1F44]' : ''
                } ${isAi ? 'text-slate-700' : 'text-white/95'}`}
                dir={arabicBlock ? 'rtl' : 'auto'}
                {...props}
              >
                {children}
              </p>
            );
          },
          strong: ({ node, ...props }) => (
            <strong className={`font-extrabold ${isAi ? 'text-[#0B2A6F]' : 'text-white font-black'}`} {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className={`italic ${isAi ? 'text-slate-700' : 'text-blue-100'}`} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 my-2 space-y-1 text-xs sm:text-sm" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 my-2 space-y-1 text-xs sm:text-sm" {...props} />
          ),
          li: ({ node, children, ...props }) => {
            const rawText = String(children || '');
            const arabicLine = isPrimarilyArabic(rawText);
            return (
              <li
                className={`leading-relaxed ${arabicLine ? 'font-arabic text-sm sm:text-base' : ''} ${
                  isAi ? 'text-slate-700' : 'text-white'
                }`}
                {...props}
              >
                {children}
              </li>
            );
          },
          blockquote: ({ node, children, ...props }) => {
            const rawText = String(children || '');
            const arabicQuote = isPrimarilyArabic(rawText);
            return (
              <blockquote
                className={`border-l-3 sm:border-l-4 border-[#1677FF] bg-[#F0F7FF] rounded-r-xl px-3 sm:px-4 py-2 sm:py-2.5 my-2.5 text-xs sm:text-sm text-slate-800 ${
                  arabicQuote ? 'font-arabic text-base sm:text-lg text-right dir-rtl leading-loose font-semibold' : 'italic'
                }`}
                dir={arabicQuote ? 'rtl' : 'auto'}
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-blue-50/90 text-[#0B2A6F] border border-blue-200/60 font-mono text-[11px] sm:text-xs font-semibold"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <div className="my-2.5 overflow-x-auto rounded-xl bg-slate-900 text-slate-100 p-3 sm:p-4 text-xs font-mono border border-slate-800 shadow-inner">
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            );
          },
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3 rounded-xl border border-sky-200 shadow-2xs">
              <table className="min-w-full divide-y divide-sky-200 text-xs sm:text-sm text-left" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-[#F0F7FF] text-[#0B2A6F] font-bold" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-sky-200" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-3 py-2 border-b border-sky-100 text-slate-700" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-3 border-sky-100" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
