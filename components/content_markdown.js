import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Date from "./utils/date";
import Link from "next/link";

const relatedLinkList = (related) => {
  return (
    <div className="pt-12">
      <div className="pb-4">
        <span className="bg-slate-200">Related content:</span>
      </div>
      <ul>
        {related.map((x) => (
          <li key={x.link}>
            <Link key={x.link} href={x.link}>
              {x.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ContentMarkdown({
  content,
  contentDate,
  related = [],
}) {
  return (
    <div className="markdown-content text-xl">
      {contentDate === undefined ? (
        ""
      ) : (
        <p className="text-slate-300">
          Last updated on <Date dateString={contentDate} />.
        </p>
      )}

      <ReactMarkdown
        components={{
          a: ({ children, href }) => {
            return <Link href={href}>{children}</Link>;
          },
        }}
      >
        {content}
      </ReactMarkdown>

      {related.length > 0 && relatedLinkList(related)}
    </div>
  );
}
