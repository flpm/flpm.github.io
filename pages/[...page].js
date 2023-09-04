import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Layout from "../components/layout";
import Section from "../components/section";
import Link from "next/link";
import Date from "../components/date";
import { openSans } from "../components/fonts";
import { getPageData, getAllPageIds } from "../lib/pages";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const data = await getPageData(params.page);
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllPageIds();
  return {
    paths,
    fallback: false,
  };
}

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

export default function Page({ data }) {
  const router = useRouter();
  return (
    <Layout>
      <Section
        columns={8}
        spaceBefore={1}
        spaceAfter={3}
        className="flex flex-col-reverse"
      >
        <div className="py-[6rem] ">
          <div className={`${openSans.className} text-6xl font-semibold pb-12`}>
            {router.query.page.map((x) => x.replaceAll("_", " ")).join(" / ")}
            <div className={`${openSans.className} text-5xl pt-4 font-light`}>
              {data.subtitle}
            </div>
          </div>
          <div className="markdown-content text-xl">
            <p>
              This page was last updated on <Date dateString={data.date} />.
            </p>
            <ReactMarkdown
              components={{
                a: ({ children, href }) => {
                  return <Link href={href}>{children}</Link>;
                },
              }}
            >
              {data.content}
            </ReactMarkdown>

            {data.related !== undefined &&
              data.related.length > 0 &&
              relatedLinkList(data.related)}
          </div>
        </div>
      </Section>
    </Layout>
  );
}
