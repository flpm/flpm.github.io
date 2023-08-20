import Link from "next/link";

export default function TextLink({ href, className, children }) {
  return (
    <Link
      href={href}
      className={`underline decoration-2 decoration-slate-950 hover:bg-slate-950 hover:text-white focus:bg-slate-950 focus:text-white ${className}`}
    >
      {children}
    </Link>
  );
}
