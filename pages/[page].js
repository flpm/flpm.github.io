import Section from "../components/section";
import Layout from "../components/layout";
import { getAllPageIds, getPageData } from "../lib/pages";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import { openSans } from "../components/fonts";
import Date from "../components/date";

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

export default function Page({ data }) {
  return (
    <Layout>
      <Section
        columns={8}
        spaceBefore={1}
        spaceAfter={3}
        className="flex flex-col-reverse"
      >
        <div className="py-[6rem] ">
          <div className={`${openSans.className} text-8xl font-semibold pb-12`}>
            {data.title}
            <div className={`${openSans.className} text-7xl pt-4 font-light`}>
              {data.subtitle}
            </div>
          </div>
          <div className="markdown-content text-2xl">
            <p>
              This page was last updated on <Date dateString={data.date} />.
            </p>
            <ReactMarkdown
              components={{
                a: ({ children, href }) => {
                  return <Link href={href}>{children}</Link>;
                },
                hr: () => (
                  <div className="pb-4 pt-12">
                    <span className="bg-slate-200">Related content:</span>
                  </div>
                ),
              }}
            >
              {data.content}
            </ReactMarkdown>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
