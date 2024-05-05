import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import Layout from "../../../components/layout";
import Section from "../../../components/sections/section";
import Link from "next/link";
import { openSans, iADuoItalic } from "../../../components/utils/fonts";
import { getBookData, getAllIds } from "../../../lib/books";
import { useRouter } from "next/router";
import moment from "moment";
import { read } from "gray-matter";
import { de } from "date-fns/locale";

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

function makeDescription(read_status, book_type = "book") {
  let description = "";
  if (read_status == null) return "I have not read this book yet.";
  const start = read_status.start != null;
  const finish = read_status.finish != null;
  const like = read_status.like != null;
  const dislike = read_status.dislike != null;
  const recommend = read_status.recommend != null;
  const multiple = read_status.multiple != null;
  const plan = read_status.plan != null;
  if (start && finish && like && recommend) {
    if (multiple)
      description = "I read this book many times and I strongly recommend it.";
    else description = "I really enjoyed reading this book and I recommend it.";
  } else if (start && like) {
    description = "I enjoyed reading this book.";
  } else if (start && dislike) {
    description =
      "I did not enjoy reading this book and I do not recommend it.";
  } else if (start && !finish) {
    if (plan)
      description =
        "I did not finish reading this book, but I plan to come back to it some day.";
    else if (dislike)
      description =
        "I did not finish reading this book, and I do not plan to come back to it.";
    else description = "I did not finish reading this book.";
  }
  if (description == "") description = "I have not read this book yet.";
  return description;
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
  let durationString = "";
  const parts = data.content.split("---");
  const description = parts[0].replaceAll("\n", "\n\n");
  let note = null;
  if (parts.length > 1) {
    note = parts[1];
  }
  if (data.source === "Audible") {
    const seconds = data.length / 1000;
    const duration = moment.duration(seconds, "seconds");
    durationString = duration.humanize();
  } else {
    durationString = data.length;
  }
  return (
    <Layout>
      <div className="col-span-12 pt-24"></div>
      <Section columns={2} spaceBefore={1}>
        <div className="flex-grow-0 min-w-fit pt-0 pr-6">
          <div className="float-left pt-0">
            <Image
              alt={`cover for ${data.title} by ${
                data.authors == undefined
                  ? "Undefined"
                  : data.authors.join(", ")
              }`}
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
        <div className={`${openSans.className} pl-[15px]`}>
          <div className="text-6xl font-semibold">{data.title}</div>
          {data.subtitle == undefined ? null : (
            <div className={`text-5xl font-light pt-2`}>{data.subtitle}</div>
          )}
          <p className="text-2xl pt-2 pb-2">by {data.authors.join(", ")}</p>
          <p className="text-xl text-gray-400">
            <span className="">
              {data.format} in{" "}
              {data.language == undefined
                ? "unknown language"
                : data.language.join(", ")}
              {data.length == undefined ? null : (
                <span className="">, {durationString}</span>
              )}
              {data.theme != undefined && data.theme != "" ? (
                <span className="">
                  {" "}
                  &#8212; category{" "}
                  <Link
                    className="underline"
                    href={`/books/about_${data.theme.replaceAll(" ", "_")}`}
                  >
                    {data.theme}
                  </Link>
                </span>
              ) : null}
            </span>
          </p>
          <div className="">
            {data.narrators == undefined ? (
              <p className="text-xl text-gray-400">
                <span className="">
                  Published by {data.publisher} in{" "}
                  {data.date_published.slice(0, 4)}
                </span>
              </p>
            ) : (
              <p className="text-xl text-gray-400">
                <span className="">
                  Narrated by {data.narrators.join(", ")} &#8212; published by{" "}
                  {data.publisher} in {data.date_published.slice(0, 4)}
                </span>
              </p>
            )}
          </div>

          {data.first_edition ? (
            <p className="text-xl text-gray-400">
              <span className=""></span>
            </p>
          ) : null}
          {data.signed ? (
            <p className="text-xl text-gray-400">
              {data.first_edition ? "First edition. " : null}
              {data.signed ? `Signed book.` : null}
            </p>
          ) : null}
        </div>
        <div className={`markdown-content text-xl`}>
          <div className="pt-12 pl-[15px]">
            <div className={`markdown-content-part text-xl`}>
              {note != null ? (
                <ReactMarkdown
                  components={{
                    a: ({ children, href }) => {
                      return <Link href={href}>{children}</Link>;
                    },
                  }}
                >
                  {note}
                </ReactMarkdown>
              ) : (
                <p>{makeDescription(data.read_status, data.book_type)}</p>
              )}
            </div>
          </div>

          <div className="pt-12">
            <div
              className={`markdown-content-part pl-[15px] pr-6 py-4 border-l-8 border-l-gray-300 bg-gray-100`}
            >
              <p>Description from the publisher:</p>
              <ReactMarkdown
                components={{
                  a: ({ children, href }) => {
                    return <Link href={href}>{children}</Link>;
                  },
                }}
              >
                {description}
              </ReactMarkdown>
            </div>
          </div>

          {data.related !== undefined &&
            data.related.length > 0 &&
            relatedLinkList(data.related)}
        </div>
      </Section>
    </Layout>
  );
}
