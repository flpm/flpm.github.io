import Section from "../../components/section";
import Layout from "../../components/layout";
import Image from "next/image";
import { openSans } from "../../components/fonts";
import { getAllBooks } from "../../lib/books";
import path from "path";
import matter from "gray-matter";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";

export async function getStaticProps() {
  const data = await getAllBooks();
  return {
    props: {
      data,
    },
  };
}

export default function Bookshelf({ data }) {
  // console.log(data);
  return (
    <Layout>
      <Section
        columns={8}
        spaceBefore={1}
        spaceAfter={3}
        className="flex flex-col"
      >
        <div className="py-[6rem] ">
          <div className={`${openSans.className} text-6xl font-semibold pb-12`}>
            Personal Bookshelf
            <div className={`${openSans.className} text-5xl pt-4 font-light`}>
              A catalogue of my books and audiobooks
            </div>
          </div>
          <div className="markdown-content text-xl">
            <p>
              You can browse through the indexes:{" "}
              <Link href="/books/languages">by languages</Link>
              {", "}
              <Link href="/books/authors">by authors</Link> and{" "}
              <Link href="/books/subjects">by subjects</Link>.
              <br />
              You can also check the{" "}
              <Link href="/books/recent">most recent additions</Link> to the
              bookshelf.
            </p>
          </div>
        </div>
        <div>
          {data.map((book) => {
            return (
              <div
                key={book.asin}
                className={"inline-block flex-col-reverse w-[140px]"}
              >
                <Link href={`/books/info/${book.path}`}>
                  <Image
                    alt={`cover for ${book.title} by ${book.authors?.join(
                      ", "
                    )}`}
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
      </Section>
    </Layout>
  );
}
