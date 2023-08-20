import Link from "next/link";
import { useRouter } from "next/router";

export default function SectionLink({ href, className, children }) {
  const router = useRouter();
  return (
    <div
      className={`hover:bg-slate-950 hover:text-white inline-block px-[8px] pb-[4px] ${className} ${
        router.pathname === href ? "bg-slate-950 text-white" : ""
      }`}
    >
      <Link href={href}>{children}</Link>
    </div>
  );
}
