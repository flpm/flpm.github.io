import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import Layout from "../../../components/layout";
import Section from "../../../components/section";
import Link from "next/link";
import { openSans } from "../../../components/fonts";
import { getBookData, getAllIds } from "../../../lib/books";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const data = await getBookData(params.book);
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds("books");
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
      <div className="col-span-12 pt-24"></div>
      <Section columns={2} spaceBefore={1}>
        <div className="flex-grow-0 min-w-fit pt-0 pr-6">
          <div className="float-left pt-0">
            <Image
              alt={`cover for ${data.title} by ${data.authors.join(", ")}`}
              src={`/images/covers/${data.cover_filename}`}
              width={256}
              height={256}
              className=""
            />
          </div>
        </div>
      </Section>

      <Section
        columns={7}
        spaceBefore={0}
        spaceAfter={2}
        className="flex flex-col "
      >
        <div className={`${openSans.className}`}>
          <div className="text-6xl font-semibold">{data.title}</div>
          {data.subtitle == undefined ? null : (
            <div className={`text-5xl font-light pt-2`}>{data.subtitle}</div>
          )}
          <p className="text-2xl pt-2">by {data.authors.join(", ")}</p>
          <p className="text-xl text-gray-400">
            <span className="">
              {data.format} in {data.language}
              {data.narrators == undefined ? null : (
                <span className="">
                  {" "}
                  &#8212; narrated by {data.narrators.join(", ")}
                </span>
              )}{" "}
              &#8212; published by {data.publisher} in{" "}
              {data.date_published.slice(0, 4)}
            </span>
          </p>
          {data.first_edition ? (
            <p className="text-xl pt-8 font-bold">
              <span className="">
                First {data.first_edition_details} edition.
              </span>
            </p>
          ) : null}
          {data.signed ? (
            <p className="text-xl font-bold">
              <span className="">Signed by {data.signature_details}.</span>
            </p>
          ) : null}
        </div>

        <div className="markdown-content text-xl pt-12">
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
      </Section>
    </Layout>
  );
}
