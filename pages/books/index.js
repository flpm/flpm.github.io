import Section from "../../components/sections/section";
import Layout from "../../components/layout";
import { openSans } from "../../components/utils/fonts";
import { getAllBooks } from "../../lib/books";

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
        <div className="pt-[6rem] pb-12">
          <div className={`${openSans.className} text-6xl font-semibold pb-12`}>
            My Personal Bookshelf
            <div className={`${openSans.className} text-5xl pt-4 font-light`}>
              A catalog of the books and audiobooks I own
            </div>
          </div>
          <div className="markdown-content text-xl">
            <p>
              In 2022, I decided to start a new personal project to catalog my
              books and audiobooks. Collecting and processing the data was a
              technical challenge, but I am now able to explore my library in
              ways I could not by just looking at the books on the shelf.
            </p>
            <p>
              If you are interested in taking a look around, the best way to
              explore is using the <Link href="/books/timeline">timeline</Link>,
              but you can also:
              <ul className="pt-4">
                <li>
                  check the <Link href="/books/recent">recent additions</Link>
                </li>{" "}
                <li>
                  look at my list of{" "}
                  <Link href="/books/signed">signed books</Link>
                </li>
                <li>
                  {" "}
                  see which books I own{" "}
                  <Link href="/books/multiple_formats">
                    in multiple formats
                  </Link>
                </li>
                <li>
                  search the indexes:{" "}
                  <Link href="/books/languages">by languages</Link>
                  {", "}
                  <Link href="/books/authors">by authors</Link> and{" "}
                  <Link href="/books/subjects">by subjects</Link>.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
