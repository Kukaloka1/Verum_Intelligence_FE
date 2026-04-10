import { Fragment, type ReactNode } from "react";
import type { QueryAnswerSection } from "@/types/query";

interface QueryStructuredBodyProps {
  sections: QueryAnswerSection[];
}

type StructuredBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "ordered-list"; items: string[] }
  | { type: "unordered-list"; items: string[] };

function renderInlineRichText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const strongPattern = /\*\*([^*]+)\*\*/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = strongPattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    nodes.push(
      <strong key={`${keyPrefix}-strong-${index}`} className="font-semibold text-foreground">
        {match[1]}
      </strong>
    );

    cursor = match.index + match[0].length;
    index += 1;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes.length > 0 ? nodes : [text];
}

function splitSentencesIntoParagraphs(content: string): string[] {
  const compactContent = content.trim();
  if (compactContent.length <= 500 || compactContent.includes("\n")) {
    return [compactContent];
  }

  const sentences = compactContent.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) ?? [compactContent];
  if (sentences.length < 3) {
    return [compactContent];
  }

  const grouped: string[] = [];
  for (let index = 0; index < sentences.length; index += 2) {
    grouped.push(`${sentences[index]}${sentences[index + 1] ?? ""}`.trim());
  }

  return grouped.filter((entry) => entry.length > 0);
}

function extractInlineNumberedItems(text: string): string[] | null {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length === 0) {
    return null;
  }

  const markerRegex = /(\d+[\.\)])\s+/g;
  const matches = Array.from(normalized.matchAll(markerRegex));
  if (matches.length < 2 || matches[0].index !== 0) {
    return null;
  }

  const items: string[] = [];
  for (let index = 0; index < matches.length; index += 1) {
    const current = matches[index];
    const start = (current.index ?? 0) + current[0].length;
    const end = matches[index + 1]?.index ?? normalized.length;
    const item = normalized.slice(start, end).trim();
    if (item.length > 0) {
      items.push(item);
    }
  }

  return items.length >= 2 ? items : null;
}

function parseStructuredBlocks(content: string): StructuredBodyBlock[] {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (normalized.length === 0) {
    return [];
  }

  const lines = normalized.split("\n");
  const blocks: StructuredBodyBlock[] = [];
  const paragraphLines: string[] = [];
  let listType: "ordered-list" | "unordered-list" | null = null;
  const listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", text: paragraphLines.join("\n").trim() });
      paragraphLines.length = 0;
    }
  };

  const flushList = () => {
    if (listType && listItems.length > 0) {
      blocks.push({ type: listType, items: [...listItems] });
      listItems.length = 0;
      listType = null;
    } else {
      listType = null;
    }
  };

  const detectLineListType = (line: string): "ordered-list" | "unordered-list" | null => {
    if (/^\d+[\.\)]\s+/.test(line)) {
      return "ordered-list";
    }
    if (/^[-•*]\s+/.test(line)) {
      return "unordered-list";
    }
    return null;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (line.length === 0) {
      if (listType) {
        let nextNonEmptyIndex = index + 1;
        while (nextNonEmptyIndex < lines.length && lines[nextNonEmptyIndex].trim().length === 0) {
          nextNonEmptyIndex += 1;
        }
        if (nextNonEmptyIndex < lines.length) {
          const nextType = detectLineListType(lines[nextNonEmptyIndex].trim());
          if (nextType === listType) {
            continue;
          }
        }
        flushList();
      } else {
        flushParagraph();
      }
      continue;
    }

    const orderedMatch = line.match(/^\d+[\.\)]\s+(.+)$/);
    const unorderedMatch = line.match(/^[-•*]\s+(.+)$/);

    if (orderedMatch || unorderedMatch) {
      const nextListType = orderedMatch ? "ordered-list" : "unordered-list";
      const itemText = (orderedMatch?.[1] ?? unorderedMatch?.[1] ?? "").trim();

      flushParagraph();
      if (listType && listType !== nextListType) {
        flushList();
      }
      if (!listType) {
        listType = nextListType;
      }
      if (itemText.length > 0) {
        listItems.push(itemText);
      }
      continue;
    }

    if (listType) {
      flushList();
    }
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export function QueryStructuredBody({ sections }: QueryStructuredBodyProps) {
  return (
    <section className="space-y-5">
      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        Structured Analysis
      </div>

      <div className="space-y-8 md:relative md:space-y-10 md:before:absolute md:before:left-[13px] md:before:top-3 md:before:h-[calc(100%-28px)] md:before:w-px md:before:bg-border/30">
        {sections.map((section, index) => (
          <article key={`${section.sectionTitle}-${index}`} className="group relative pl-0 md:pl-12">
            <div className="mb-3 flex items-center justify-start md:absolute md:left-0 md:top-2 md:mb-0 md:flex md:items-center md:justify-center">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border/45 bg-background text-[10px] font-semibold text-muted transition-colors group-hover:border-accent/30 group-hover:text-foreground md:ring-4 md:ring-background">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="rounded-2xl border border-border/25 bg-background/30 p-4 md:p-5">
              <div className="flex flex-col gap-4">
                <h4 className="pr-2 text-base font-semibold tracking-tight text-foreground md:text-[1.05rem]">
                  {section.sectionTitle}
                </h4>

                <div className="border-t border-border/18 pt-4">
                  <div className="max-h-[520px] overflow-y-auto pr-2 md:max-h-[640px]">
                    <div className="flex max-w-none flex-col gap-4 text-[15px] leading-8 text-foreground/92">
                      {parseStructuredBlocks(section.content).map((block, blockIndex) => {
                        if (block.type === "ordered-list" || block.type === "unordered-list") {
                          const ListTag = block.type === "ordered-list" ? "ol" : "ul";
                          return (
                            <ListTag
                              key={`${section.sectionTitle}-${index}-list-${blockIndex}`}
                              className={
                                block.type === "ordered-list"
                                  ? "list-decimal space-y-2 pl-6 marker:font-semibold marker:text-foreground/65"
                                  : "list-disc space-y-2 pl-6 marker:text-foreground/65"
                              }
                            >
                              {block.items.map((item, itemIndex) => (
                                <li
                                  key={`${section.sectionTitle}-${index}-li-${blockIndex}-${itemIndex}`}
                                >
                                  {renderInlineRichText(
                                    item,
                                    `${section.sectionTitle}-${index}-li-${blockIndex}-${itemIndex}`
                                  )}
                                </li>
                              ))}
                            </ListTag>
                          );
                        }

                        const inlineNumberedItems = extractInlineNumberedItems(block.text);
                        if (inlineNumberedItems) {
                          return (
                            <ol
                              key={`${section.sectionTitle}-${index}-inline-ordered-${blockIndex}`}
                              className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-foreground/65"
                            >
                              {inlineNumberedItems.map((item, itemIndex) => (
                                <li
                                  key={`${section.sectionTitle}-${index}-inline-li-${blockIndex}-${itemIndex}`}
                                >
                                  {renderInlineRichText(
                                    item,
                                    `${section.sectionTitle}-${index}-inline-li-${blockIndex}-${itemIndex}`
                                  )}
                                </li>
                              ))}
                            </ol>
                          );
                        }

                        return (
                          <div
                            key={`${section.sectionTitle}-${index}-paragraph-${blockIndex}`}
                            className="space-y-3 break-words"
                          >
                            {splitSentencesIntoParagraphs(block.text).map((paragraph, paragraphIndex) => {
                              const lines = paragraph
                                .split("\n")
                                .map((line) => line.trim())
                                .filter((line) => line.length > 0);

                              return (
                                <p
                                  key={`${section.sectionTitle}-${index}-p-${blockIndex}-${paragraphIndex}`}
                                  className="whitespace-pre-line"
                                >
                                  {lines.map((line, lineIndex) => (
                                    <Fragment
                                      key={`${section.sectionTitle}-${index}-line-${blockIndex}-${paragraphIndex}-${lineIndex}`}
                                    >
                                      {renderInlineRichText(
                                        line,
                                        `${section.sectionTitle}-${index}-line-${blockIndex}-${paragraphIndex}-${lineIndex}`
                                      )}
                                      {lineIndex < lines.length - 1 ? <br /> : null}
                                    </Fragment>
                                  ))}
                                </p>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
