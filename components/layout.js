import Head from "next/head";
import Link from "next/link";

import FrameTop from "./layout_components/frame_top";
import FrameBottom from "./layout_components/frame_bottom";
import FrameContent from "./layout_components/frame_content";

import { lightContentGridColor } from "../lib/grid_view";

export const siteTitle = "flpm.dev | Felipe";

export default function Layout({ title, children, gridClassName }) {
  return (
    <div className="min-w-[800px]">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Felipe Moreno | security + code + data + design"
        />
        <meta name="og:title" content={siteTitle} />\
        <title>{title || siteTitle}</title>
      </Head>
      <div className="flex flex-col h-screen">
        <FrameTop
          siteMenu={[
            ["about", "/about"],
            ["links", "/links"],
            ["reading", "/books"],
            ["projects", "/projects"],
          ]}
          siteName="flpm.dev"
        />
        <FrameContent
          gridClassName={gridClassName}
          leftBar={
            <span>
              developed with{" "}
              <Link className="hover:underline" href="https://nextjs.org/">
                Next.js
              </Link>{" "}
              and{" "}
              <Link className="hover:underline" href="https://tailwindcss.com/">
                Tailwind CSS
              </Link>
            </span>
          }
          rightBar={
            <span>
              designed and built from scratch -{" "}
              <Link className="hover:underline" href="/notes/colophon">
                learn more
              </Link>
            </span>
          }
        >
          <div
            className={`${gridClassName} grid grid-cols-12 gap-[24px] h-full ${lightContentGridColor} p-[24px]`}
          >
            {children}
          </div>
        </FrameContent>
        <FrameBottom
          contactPage={["contact", "/contact"]}
          siteLinks={[
            ["github", "https://github.com/flpm"],
            ["linkedin", "https://www.linkedin.com/in/felipemoreno"],
          ]}
        />
      </div>
    </div>
  );
}
