import fs from "fs";
import path from "path";
import matter from "gray-matter";

import ContentMarkdown from "../components/content_markdown";
import Headline from "../components/headline";
import MainSection from "../components/sections/main_section";
import Layout from "../components/layout";

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
      <MainSection>
        <Headline
          title={data.title}
          subtitle={data.subtitle}
          titleSize="8xl"
          subtitleSize="7xl"
        />
        <ContentMarkdown content={data.content} />
      </MainSection>
    </Layout>
  );
}
