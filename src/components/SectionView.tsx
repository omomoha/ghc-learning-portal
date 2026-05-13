import type { Section } from "@/content/types";
import { CodeBlock } from "./CodeBlock";

// Strip a single leading emoji + space from a heading string.
const EMOJI_RE = /^[\p{Extended_Pictographic}️⃣‍]+\s*/u;
function stripEmoji(s: string) {
  return s.replace(EMOJI_RE, "");
}

export function SectionView({ section }: { section: Section }) {
  return (
    <section className="content-section">
      <h3>{stripEmoji(section.title)}</h3>
      {section.content && (
        // Section content is trusted course HTML authored alongside this app.
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: section.content }} />
      )}
      {section.codeBlocks?.map((cb, i) => <CodeBlock key={i} block={cb} />)}
      {section.image && (
        <figure className="code-image">
          <img
            src={`/images/${section.image}`}
            alt={`Diagram for: ${stripEmoji(section.title)}`}
            loading="lazy"
          />
        </figure>
      )}
    </section>
  );
}
