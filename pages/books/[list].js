import Section from "../../components/section";
import Layout from "../../components/layout";
import Image from "next/image";
import { openSans } from "../../components/fonts";
import { getListData, getAllIds } from "../../lib/books";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const data = await getListData(params.list);
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds("lists");
  return {
    paths,
    fallback: false,
  };
}

export default function Bookshelf({ data }) {
  console.log(data);
  return (
    <Layout>
      <Section
        columns={8}
        spaceBefore={1}
        spaceAfter={3}
        className="flex flex-col"
      >
        <div>
          <div className="pt-[6rem] ">
            <div
              className={`${openSans.className} text-6xl font-semibold pb-12`}
            >
              {data.title}
              <div className={`${openSans.className} text-5xl pt-4 font-light`}>
                {data.subtitle}
              </div>
            </div>
          </div>
          <div className="markdown-content text-xl">
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
          <div className="pt-12">
            {data.sections.map((section) => {
              return (
                <div key={section.title} className="pb-12">
                  {section.title == null ? null : (
                    <div className="pb-6 font-semibold text-2xl">
                      {section.title}
                    </div>
                  )}
                  {section.description == null ? null : (
                    <div className="pb-12 text-xl">{section.description}</div>
                  )}
                  <div>
                    {section.books.map((book) => {
                      return (
                        <div
                          key={book.asin}
                          className={"inline-block flex-col-reverse w-[140px]"}
                        >
                          <Link href={`/books/info/${book.path}`}>
                            <Image
                              alt={`cover for ${
                                book.title
                              } by ${book.authors?.join(", ")}`}
                              src={`/images/covers/${book.cover_filename}`}
                              width={128}
                              height={128}
                              className=""
                            />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </Layout>
  );
}
