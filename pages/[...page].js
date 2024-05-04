import Headline from "../components/headline";
import Layout from "../components/layout";
import MainSection from "../components/sections/main_section";
import ContentMarkdown from "../components/content_markdown";
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

export default function Page({ data }) {
  const router = useRouter();
  return (
    <Layout>
      <MainSection>
        <Headline title={data.title} subtitle={data.subtitle} />
        <ContentMarkdown
          content={data.content}
          contentDate={data.date}
          related={data.related}
        />
      </MainSection>
    </Layout>
  );
}
