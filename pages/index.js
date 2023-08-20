import Section from "../components/section";
import Layout from "../components/layout";
import { openSans } from "../components/fonts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";

export async function getStaticProps() {
  const dataDirectory = path.join(process.cwd(), "data");
  const fullPath = path.join(dataDirectory, `index.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    props: {
      data: {
        id: "index",
        ...matterResult.data,
        content: matterResult.content,
      },
    },
  };
}

export default function Home({ data }) {
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
            <ReactMarkdown
              components={{
                a: ({ children, href }) => {
                  return <Link href={href}>{children}</Link>;
                },
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
