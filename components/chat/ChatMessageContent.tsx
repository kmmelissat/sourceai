type Block =
  | { type: "heading"; level: number; content: string }
  | { type: "paragraph"; content: string }
  | { type: "ordered-list"; items: string[] }
  | { type: "unordered-list"; items: string[] }
  | { type: "code"; content: string };

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded-md bg-bg-base px-1.5 py-0.5 font-mono text-[0.9em] text-primary"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function parseBlocks(content: string): Block[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      blocks.push({ type: "code", content: codeLines.join("\n") });
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        content: headingMatch[2],
      });
      i += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, "").trim());
        i += 1;
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, "").trim());
        i += 1;
      }
      blocks.push({ type: "unordered-list", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !/^(#{1,3})\s+/.test(lines[i].trim()) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i])
    ) {
      paragraphLines.push(lines[i].trim());
      i += 1;
    }

    blocks.push({
      type: "paragraph",
      content: paragraphLines.join(" "),
    });
  }

  return blocks;
}

export function ChatMessageContent({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-3 text-sm leading-7 text-text-secondary">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const sizeClass =
            block.level === 1
              ? "text-base"
              : block.level === 2
                ? "text-[15px]"
                : "text-sm";

          return (
            <h3
              key={index}
              className={`${sizeClass} font-semibold tracking-tight text-text-primary`}
            >
              {renderInline(block.content)}
            </h3>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol
              key={index}
              className="list-decimal space-y-2 pl-5 marker:text-text-muted"
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul
              key={index}
              className="list-disc space-y-2 pl-5 marker:text-text-muted"
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={index}
              className="overflow-x-auto rounded-2xl border border-border bg-bg-base px-4 py-3 text-[13px] leading-6 text-text-primary"
            >
              <code>{block.content}</code>
            </pre>
          );
        }

        return (
          <p key={index} className="whitespace-pre-wrap">
            {renderInline(block.content)}
          </p>
        );
      })}
    </div>
  );
}
